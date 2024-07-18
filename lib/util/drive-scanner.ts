/*
 * Copyright 2016 balena.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as sdk from 'etcher-sdk';
import type { Adapter } from 'etcher-sdk/build/scanner/adapters';
import {
	BlockDeviceAdapter,
	UsbbootDeviceAdapter,
} from 'etcher-sdk/build/scanner/adapters';
import { geteuid, platform } from 'process';

const adapters: Adapter[] = [
	new BlockDeviceAdapter({
		includeSystemDrives: () => true,
		includeVirtualDrives: () =>
			process.env.ETCHER_INCLUDE_VIRTUAL_DRIVES !== 'undefined',
	}),
];

// Can't use permissions.isElevated() here as it returns a promise and we need to set
// module.exports = scanner right now.
if (platform !== 'linux' || (geteuid && geteuid() === 0)) {
	adapters.push(new UsbbootDeviceAdapter());
}

if (platform === 'win32') {
	const {
		DriverlessDeviceAdapter: driverless,
	} = require('etcher-sdk/build/scanner/adapters/driverless');
	adapters.push(new driverless());
}

export const scanner = new sdk.scanner.Scanner(adapters);
