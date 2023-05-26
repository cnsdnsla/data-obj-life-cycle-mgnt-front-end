import { redirect } from 'next/navigation';
import { SETTINGS_NAVIGATIONS } from '../hooks/useSettingsNav';

const SettingsPage = () => {
  redirect(SETTINGS_NAVIGATIONS[0].routePath);
};
export default SettingsPage;
