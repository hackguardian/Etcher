/*
 * Copyright 2019 balena.io
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

import * as React from 'react';
import { Flex } from 'rendition';
import { StepNameButton } from '../../styled-components';

import UserDataSvg from '../../../assets/userdata.svg';

interface UDSetterProps {
	disabled: boolean;
}

export const UDSetter = ({ disabled }: UDSetterProps) => {
	return (
		<Flex flexDirection="column" alignItems="center">
			<UserDataSvg
				className={disabled ? 'disabled' : ''}
				width="40px"
				style={{
					marginBottom: 30,
				}}
			/>

			<StepNameButton className="button button-primary" disabled={disabled}>
				Set user-data
			</StepNameButton>
		</Flex>
	);
};
