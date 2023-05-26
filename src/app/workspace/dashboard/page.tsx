'use client';
import Sidebar from '@/components/sidebar';
import { SETTINGS_NAVIGATIONS } from '@/consts';
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
