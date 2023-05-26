'use client';
import Sidebar from '@/components/sidebar';
import useSettingNav, { SETTINGS_NAVIGATIONS, SettingsNavIdEnum } from '../hooks/useSettingsNav';
import { Breadcrumbs, Typography } from '@material-tailwind/react';
import useWorkspace, { TempWorkspace } from '../hooks/useWorkspace';
import { Navigation } from '@/types';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const { currNavigation, currRoutePath, currWorkspacePath, generateSettingsPath } = useSettingNav();
  const { getWorkspacePath, getWorkspace } = useWorkspace();
  const workspace = getWorkspace(currWorkspacePath);

  const sortedWorkspaceArr: TempWorkspace[] = [];
  let targetWorkspace: TempWorkspace = workspace;
  while (targetWorkspace) {
    sortedWorkspaceArr.push(targetWorkspace);
    targetWorkspace = targetWorkspace.parent;
  }
  sortedWorkspaceArr.reverse();

  const settingNavs = SETTINGS_NAVIGATIONS.map((navigation) => {
    const routePath = generateSettingsPath(navigation.id as SettingsNavIdEnum, workspace);
    return { ...navigation, routePath: routePath } as Navigation;
  });

  return (
    <div className="flex flex-nowrap w-full">
      <Sidebar navigations={settingNavs} />
      <div className="p-4 h-[calc(100vh)] w-full bg-white">
        <div className="h-full w-2/3 m-auto">
          <div>
            {/* <Breadcrumbs separator=">" className="bg-transparent px-0"> */}
            <Breadcrumbs separator=">" className="px-0 bg-transparent">
              <a className="opacity-60">Workspace</a>
              {sortedWorkspaceArr.map((workspace, index) => {
                if (sortedWorkspaceArr.length - 1 === index) {
                  return (
                    <a
                      href={generateSettingsPath(
                        currNavigation?.id ? (currNavigation.id as SettingsNavIdEnum) : undefined,
                        workspace
                      )}
                      key={`link_${workspace.id}`}
                    >
                      {workspace.name}
                    </a>
                  );
                } else {
                  // console.log(generateSettingsPath(undefined, workspace))
                  return (
                    <a
                      href={generateSettingsPath(
                        currNavigation?.id ? (currNavigation.id as SettingsNavIdEnum) : undefined,
                        workspace
                      )}
                      key={`link_${workspace.id}`}
                      className="opacity-60"
                    >
                      {workspace.name}
                    </a>
                  );
                }
              })}
            </Breadcrumbs>
          </div>
          <div>
            <Typography variant="h2">{currNavigation?.name}</Typography>
          </div>
          <div></div>
          {children}
        </div>
      </div>
    </div>
  );
};
export default SettingsLayout;
