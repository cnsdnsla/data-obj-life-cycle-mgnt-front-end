'use client';
import { SETTINGS_NAVIGATIONS } from '@/app/settings/hooks/useSettingsNav';
import Sidebar from '@/components/sidebar';
import ContentLayout from '@/layouts/main/main.layout';

const DashboardPage = () => {
  return (
    <div className="flex flex-nowrap">
      <Sidebar navigations={SETTINGS_NAVIGATIONS} />
      <ContentLayout
        title="Dashboard"
        routePaths={[
          {
            path: '/workspace',
            name: 'Workspace',
          },
          {
            path: '/workspace/data-mgnt',
            name: 'Data Management',
          },
        ]}
      />
    </div>
  );
};
export default DashboardPage;
