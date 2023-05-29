'use client';
import useSettingsNav, { SETTINGS_NAVIGATIONS } from '../hooks/useSettingsNav';

const SettingsPage = () => {
  const {redirectDefaultRoutePath} = useSettingsNav();
  redirectDefaultRoutePath()
};
export default SettingsPage;
