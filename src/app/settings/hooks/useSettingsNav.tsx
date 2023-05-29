'use client';

import { Navigation } from '@/types';
import {
  ArrowPathRoundedSquareIcon,
  Cog6ToothIcon,
  ListBulletIcon,
  RectangleGroupIcon,
  ShareIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/solid';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import useWorkspace, { TempWorkspace } from './useWorkspace';

const SETTINGS_ROUTE_PREFIX = '/settings';

export enum SettingsNavIdEnum {
  GENERAL = 'general',
  AUTH = 'auth',
  WORKITEM = 'workitem',
  ENUM = 'enum',
  RELATION = 'relation',
  WORKFLOW = 'workflow',
}

export const SETTINGS_NAVIGATIONS: Navigation[] = [
  {
    id: SettingsNavIdEnum.GENERAL,
    name: 'General',
    routePath: `${SETTINGS_ROUTE_PREFIX}/general`,
    description: '워크스페이스 ID, 이름, 설명, 기간 설정',
    icon: <Cog6ToothIcon />,
  },
  {
    id: SettingsNavIdEnum.AUTH,
    name: 'Authorization',
    routePath: `${SETTINGS_ROUTE_PREFIX}/authorization`,
    description: '',
    icon: <ShieldCheckIcon />,
  },
  {
    id: SettingsNavIdEnum.WORKITEM,
    name: 'WorkItem',
    routePath: `${SETTINGS_ROUTE_PREFIX}/workitem`,
    description: '',
    icon: <RectangleGroupIcon />,
  },
  {
    id: SettingsNavIdEnum.ENUM,
    name: 'Enum',
    routePath: `${SETTINGS_ROUTE_PREFIX}/enum`,
    description: '',
    icon: <ListBulletIcon />,
  },
  {
    id: SettingsNavIdEnum.RELATION,
    name: 'Relation',
    routePath: `${SETTINGS_ROUTE_PREFIX}/relation`,
    description: '',
    icon: <ShareIcon />,
  },
  {
    id: SettingsNavIdEnum.WORKFLOW,
    name: 'Workflow',
    routePath: `${SETTINGS_ROUTE_PREFIX}/workflow`,
    description: '',
    icon: <ArrowPathRoundedSquareIcon />,
  },
];

export const WORKSPACE_PATH_PARAMS_KEY = 'workspacePath';

export type SettingsNavParams = {
  [WORKSPACE_PATH_PARAMS_KEY]: string;
};

const useSettingNav = () => {
  const { getWorkspacePath } = useWorkspace();
  const searchParams = useSearchParams();
  const currRoutePath = usePathname();

  const currWorkspacePath = searchParams.get(WORKSPACE_PATH_PARAMS_KEY) || '';

  let currNavigation = null;
  let targetWorkspace = null;

  currNavigation = SETTINGS_NAVIGATIONS.find((navigation) => {
    return navigation.routePath === currRoutePath;
  });

  if (currWorkspacePath) {
    const workspaceIdArr = currWorkspacePath.split('/');
    const workspace = TEMP_findOneWorkspace(workspaceIdArr);
    targetWorkspace = workspace;
  }

  const generateSettingsPath = (settingsNavId: SettingsNavIdEnum | undefined, workspace: TempWorkspace) => {
    let path = '';
    const targetSettingsNav = SETTINGS_NAVIGATIONS.find((navigation) => {
      return navigation.id === settingsNavId;
    });

    if (!targetSettingsNav) {
      path = SETTINGS_ROUTE_PREFIX;
    } else {
      path += targetSettingsNav.routePath;
    }

    const workspacePath = getWorkspacePath(workspace);
    path += `?${WORKSPACE_PATH_PARAMS_KEY}=${workspacePath}`;

    return path;
  };

  const redirectDefaultRoutePath = ()=>{
    redirect(SETTINGS_NAVIGATIONS[0].routePath);
  }

  return {
    currNavigation,
    targetWorkspace,
    currRoutePath,
    currWorkspacePath,
    generateSettingsPath,
    redirectDefaultRoutePath
  };
};

const TEMP_findOneWorkspace = (workspaceIdArr: string[]) => {
  let targetWorkspace = null;
  let workspaceArr = tempWorkspaceArr;
  for (const workspaceId of workspaceIdArr) {
    const workspace: any | undefined = workspaceArr.find((workSpace) => {
      return workSpace.id === workspaceId;
    });
    if (workspace) {
      workspace['parent'] = targetWorkspace;
      targetWorkspace = workspace;
      workspaceArr = targetWorkspace?.subWorkspaces ? targetWorkspace?.subWorkspaces : [];
      workspace['subWorkspaces'] = undefined;
    }
  }
  return targetWorkspace;
};

export default useSettingNav;

const tempWorkspaceArr = [
  {
    id: 'vehicle-data-mgnt',
    name: 'Vehicle Data Management',
  },
  {
    id: 'audit',
    name: 'Standard Audit',
    subWorkspaces: [
      {
        id: 'iso26262',
        name: 'ISO-26262',
      },
      {
        id: 'aspice',
        name: 'A-SPICE',
        subWorkspaces: [
          {
            id: '3.0',
            name: 'A-SPICE 3.0',
          },
          {
            id: '3.1',
            name: 'A-SPICE 3.1',
          },
          {
            id: '3.2',
            name: 'A-SPICE 3.2',
          },
        ],
      },
    ],
  },
];
