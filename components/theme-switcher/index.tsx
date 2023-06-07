import React from 'react';

import { useTheme as useNextTheme } from 'next-themes';
import { Switch, useTheme } from '@nextui-org/react';

import { SunIcon, MoonIcon } from '../icons';

const ThemeSwitcher = () => {
	const { setTheme } = useNextTheme();
	const { isDark } = useTheme();
	return (
		<Switch
			checked={isDark}
			onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
			size='lg'
			iconOn={<SunIcon />}
			iconOff={<MoonIcon />}
		/>
	);
};

export default ThemeSwitcher;
