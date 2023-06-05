'use client';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import React from 'react';
import UserAuthorizationPage from './user.page';

const AuthorizationPage = () => {
  return (
    <div className="w-[80rem] h-full overflow-auto">
      <Tabs>
        <TabsHeader className="w-[32rem]">
          <Tab value={'tab1'}>
            <div>User</div>
          </Tab>
          <Tab value={'tab2'}>
            <div>Group</div>
          </Tab>
          <Tab value={'tab3'}>
            <div>Role</div>
          </Tab>
          <Tab value={'tab4'}>
            <div>Permission</div>
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value={'tab1'}>
            <div>
              <UserAuthorizationPage />
            </div>
          </TabPanel>
          <TabPanel value={'tab2'}>
            <div>Group Body</div>
          </TabPanel>
          <TabPanel value={'tab3'}>
            <div>Role Body</div>
          </TabPanel>
          <TabPanel value={'tab4'}>
            <div>Permission Body</div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
};
export default AuthorizationPage;
