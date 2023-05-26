const useWorkspace = () => {
  const getWorkspacePath = (workspace: TempWorkspace) => {
    let workspacePath = '';
    let currWorkspace = workspace;
    while (true) {
      workspacePath = `${currWorkspace.id}/${workspacePath}`;
      currWorkspace = currWorkspace.parent;
      if (!currWorkspace) {
        break;
      }
    }
    return workspacePath;
  };

  const getWorkspace = (workspacePath: string) => {
    const workspaceIdArr = workspacePath.split('/');
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
      }
    }
    return targetWorkspace;
  };

  return { getWorkspacePath, getWorkspace };
};

export default useWorkspace;

//Temp codes

export type TempWorkspace = {
  id: string;
  name: string;
  parent: TempWorkspace;
};

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
