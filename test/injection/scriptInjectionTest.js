const { Builder, By } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const browserData = require('../../src/js/data.js');
const expect = require('chai').expect;
const express = require('express');
const path = require('path');
const moment = require('moment-timezone');
const app = express();
const http = require('http');
const WebSocket = require('ws');

const wsServer = http.createServer();
const wss = new WebSocket.Server({ server: wsServer });

const screenResolutions = [
    "1366x768",
    "1440x900",
    "1600x900",
    "1920x1080",
    "2560x1440",
    "2560x1600"
];

const wait = async (sec) => {
	return new Promise(resolve => setTimeout(resolve, sec));
}

const loopScreenResolutions = (options) => {
	options.forEach(function(u, i) {
		it(`should use screen size: [${options[i]}]`, async () => {
			await driver.executeScript(`
				var el = document.querySelector('select[name="screenSize"]');
				el.value = "${options[i]}";
				el.dispatchEvent(new Event('change'));
			`);

			await wait(SLEEP_TIME);
			await driver.get(LOCALSERVER);
			let screenRes = await driver.executeScript(`
				return window.screen.width + "x" + window.screen.height;
			`);

			expect(screenRes).to.equal(options[i]);
		});
	});
}

const loopTimezones = (options) => {
	let curTime = new Date();
	let tz = options[Math.floor(Math.random() * options.length)];
	let offset = curTime.getTimezoneOffset();

	if (offset != moment.tz.zone(tz.zone).utcOffset(curTime.getTime())) {
		it(`should use timezone: ${tz.zone}`, async () => {
			await driver.executeScript(`
				var el = document.querySelector('select[name="timeZone"]');
				el.value = "${tz.zone}";
				el.dispatchEvent(new Event('change'));
			`);

			await wait(SLEEP_TIME);
			await driver.get(LOCALSERVER);
			await wait(SLEEP_TIME);

			let spoofedOffset = await driver.executeScript(`
				return document.querySelector('#offset').innerText;
			`);

			expect(spoofedOffset).to.not.equal(offset);
		});
	};
}

const selectOption = async (selector) => {
	await driver.findElement(By.id('menu_options')).click()
	await driver.executeScript(`document.querySelector('${selector}').click()`);
	let isChecked = await driver.executeScript(`return document.querySelector('${selector}').checked`);
	expect(isChecked).to.equal(true);

	await wait(SLEEP_TIME);
}

describe('Script Injection', () => {
	before(async () => {
		extPath = path.join(__dirname, '../{3579f63b-d8ee-424f-bbb6-6d0ce3285e6a}.xpi');
		EXTENSION_URI = "";
		LOCALSERVER = "http://localhost:3000";
		SLEEP_TIME = 750; // need to increase sleep time because of failing tests

		driver = await new Builder()
			.forBrowser('firefox')
			.setFirefoxOptions(
				new firefox.Options()
				.setBinary('firefox-developer-edition')
				.addExtensions(extPath)
				.setPreference('xpinstall.signatures.required', false)
				.headless())
			.build();

	    await driver.get('about:debugging');

		EXTENSION_URI = await driver.executeScript(`
			return Array
			.from(document.querySelectorAll('.addon-target-container'))
			.filter(e => e.dataset.addonId == "{3579f63b-d8ee-424f-bbb6-6d0ce3285e6a}")[0]
			.querySelector('.manifest-url').href.replace('manifest.json', 'popup.html');`
		);

		app.set('view engine', 'ejs')
		app.set('views', __dirname);
		app.use(express.static(__dirname));
		app.get('/', (req, res) => res.render('index'));

		server = app.listen(3000);
		cors_server = app.listen(3001);
		wsServer.listen(3002);
	});

	beforeEach(async () => {
		await driver.get(EXTENSION_URI);
		await wait(SLEEP_TIME);
	});

	after(async () => {
	    await driver.quit();
		server.close();
		cors_server.close();
		wsServer.close(() => wss.close());
	});

	it('should enable script injection', async () => {
		await selectOption('input[name="enableScriptInjection"]');
	});

	it('should disable websockets - block all', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="webSockets"]');
			el.value = "allow_all";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		
		await driver.get(LOCALSERVER);
		await wait(SLEEP_TIME * 2);
		let socketStatus = await driver.executeScript(`
			return document.querySelector('#websocket').innerHTML;
		`);

		expect(socketStatus).to.equal("OPEN");

		await driver.get(EXTENSION_URI);
		await driver.executeScript(`
			var el = document.querySelector('select[name="webSockets"]');
			el.value = "block_all";
			el.dispatchEvent(new Event('change'));
		`);
		await driver.get(LOCALSERVER);
		await wait(SLEEP_TIME * 2);
		socketStatus = await driver.executeScript(`
			return document.querySelector('#websocket').innerHTML;
		`);

		expect(socketStatus).to.equal("");
	});

	it('should limit tab history', async () => {
		await driver.get(LOCALSERVER);
		
		await wait(SLEEP_TIME);
		for (var i = 0; i < 5; i++) {
			await driver.executeScript(`
				document.querySelector('#link').click()
			`);
			await wait(SLEEP_TIME);
		}

		let tabHistory = await driver.executeScript(`
			return window.history.length;
		`);

		expect(tabHistory >= 5).to.be.true;

		await driver.get(EXTENSION_URI);
		selectOption('input[name="limitHistory"]');

		await wait(SLEEP_TIME);
		await driver.get(LOCALSERVER);
		tabHistory = await driver.executeScript(`
			return window.history.length;
		`);

		expect(tabHistory).to.equal(2);
	});

	it('should protect window name', async () => {
		await driver.get(LOCALSERVER);
		let curTab = await driver.getWindowHandle();

		await driver.executeScript(`
			document.querySelector('#link2').click();
		`);

		let tabs = await driver.getAllWindowHandles();

		await driver.switchTo().window(tabs[tabs.length - 1])
		let winName = await driver.executeScript(`
			return window.name;
		`);
		await driver.close();

		tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[tabs.length - 1])
		
		await driver.get(EXTENSION_URI);
		await selectOption('input[name="protectWinName"]');

		await driver.get(LOCALSERVER);
		await driver.executeScript(`
			document.querySelector('#link2').click();
		`);

		tabs = await driver.getAllWindowHandles();

		await driver.switchTo().window(tabs[tabs.length - 1])
		await wait(SLEEP_TIME);
		let protectedWinName = await driver.executeScript(`
			return window.name;
		`);
		await driver.close();

		tabs = await driver.getAllWindowHandles();
		await driver.switchTo().window(tabs[tabs.length - 1])

		expect(protectedWinName).to.not.equal(winName);
	});

	it('should spoof audio context', async () => {
		await driver.get(LOCALSERVER);
		await wait(3000);

		let audioFP = await driver.executeScript(`
			return [
				document.querySelector('#pxi_result').innerHTML,
				document.querySelector('#pxi_full_buffer_result').innerHTML,
				document.querySelector('#cc_result').innerHTML,
				document.querySelector('#hybrid_result').innerHTML
			];
		`);

		await driver.get(EXTENSION_URI);
		await selectOption('input[name="spoofAudioContext"]');

		await driver.get(LOCALSERVER);
		await wait(3000);

		let spoofedAudioFP = await driver.executeScript(`
			return [
				document.querySelector('#pxi_result').innerHTML,
				document.querySelector('#pxi_full_buffer_result').innerHTML,
				document.querySelector('#cc_result').innerHTML,
				document.querySelector('#hybrid_result').innerHTML
			];
		`);

		for (var i = 0; i < 4; i++) {
			expect(audioFP[i]).to.not.eql(spoofedAudioFP[i]);
		}
	})

	it('should spoof client rects', async () => {
		await driver.get(LOCALSERVER);
		let boundingClientRect = await driver.executeScript(`
			return document.querySelector('#client_rect').getBoundingClientRect();
		`);

		await driver.get(EXTENSION_URI);
		await selectOption('input[name="spoofClientRects"]');

		await driver.get(LOCALSERVER);
		let spoofedBoundingClientRect = await driver.executeScript(`
			return document.querySelector('#client_rect').getBoundingClientRect();
		`);

		expect(spoofedBoundingClientRect).to.not.eql(boundingClientRect);
	})

	loopScreenResolutions(screenResolutions);

	loopTimezones(browserData.chameleonTimezones);

	it('should enable first party isolation', async () => {
		await selectOption('input[name="firstPartyIsolate"]')
	})

	it('should enable resist fingerprinting', async () => {
		await selectOption('input[name="resistFingerprinting"]')
	})

	it('should toggle tracking protection mode - private browsing', async () => {
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="trackingProtectionMode"]').value == "private_browsing" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle tracking protection mode - on', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="trackingProtectionMode"]');
			el.value = "always";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="trackingProtectionMode"]').value == "always" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle tracking protection mode - off', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="trackingProtectionMode"]');
			el.value = "never";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="trackingProtectionMode"]').value == "never" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle webrtc option - default', async () => {
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="webRTCIPHandlingPolicy"]').value == "default" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle webrtc option - default public & private', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="webRTCIPHandlingPolicy"]');
			el.value = "default_public_and_private_interfaces";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="webRTCIPHandlingPolicy"]').value == "default_public_and_private_interfaces" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle webrtc option - public interface only', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="webRTCIPHandlingPolicy"]');
			el.value = "default_public_interface_only";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="webRTCIPHandlingPolicy"]').value == "default_public_interface_only" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle webrtc option - default non-proxied udp', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="webRTCIPHandlingPolicy"]');
			el.value = "disable_non_proxied_udp";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="webRTCIPHandlingPolicy"]').value == "disable_non_proxied_udp" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle cookie option - allow all', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="cookieConfig"]');
			el.value = "allow_all";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="cookieConfig"]').value == "allow_all" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle cookie option - reject all', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="cookieConfig"]');
			el.value = "reject_all";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="cookieConfig"]').value == "reject_all" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle cookie option - reject third party', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="cookieConfig"]');
			el.value = "reject_third_party";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="cookieConfig"]').value == "reject_third_party" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle cookie option - allow visited', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="cookieConfig"]');
			el.value = "allow_visited";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="cookieConfig"]').value == "allow_visited" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})

	it('should toggle cookie option - reject trackers', async () => {
		await driver.executeScript(`
			var el = document.querySelector('select[name="cookieConfig"]');
			el.value = "reject_trackers";
			el.dispatchEvent(new Event('change'));
		`);
		await wait(SLEEP_TIME);
		await driver.get(EXTENSION_URI);

		await wait(SLEEP_TIME);
		let matchOption = await driver.executeScript(`
			return document.querySelector('select[name="cookieConfig"]').value == "reject_trackers" ? true : false;
		`);
		expect(matchOption).to.be.true;
	})
});