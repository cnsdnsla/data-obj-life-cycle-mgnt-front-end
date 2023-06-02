import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Accordion, AccordionBody, AccordionHeader, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

export type TreeNode = {
  key: string;
  label: React.ReactElement | string;
  open?: boolean;
  subTreeData?: TreeNode[];
};

export type TreeViewProps = {
  tree: TreeNode[];
};
const TreeView = (props: TreeViewProps) => {
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [treeNodeOpen, setTreeNodeOpen] = useState<Map<string, boolean>>(new Map());

  const initTreeNodeOpen = (treeNodes: TreeNode[]) => {
    treeNodes.forEach((treeNode) => {
      if (treeNode.subTreeData && treeNode.subTreeData.length > 0) {
        initTreeNodeOpen(treeNode.subTreeData);
        setTreeNodeOpen((prev) => {
          return new Map(prev).set(treeNode.key, treeNode.open ? true : false);
        });
      } else {
        setTreeNodeOpen((prev) => {
          return new Map(prev).set(treeNode.key, true);
        });
      }
    });
  };

  const toggleOpen = (key: string) => {
    if (treeNodeOpen.has(key)) {
      setTreeNodeOpen((prev) => {
        return new Map(prev).set(key, !prev.get(key));
      });
    }
  };

  const renderTreeNodes = (tree: TreeNode[], treeLevel = 0) => {
    return tree.map((treeNode) => {
      return (
        <Accordion
          key={treeNode.key}
          open={treeNodeOpen.get(treeNode.key) ? true : false}
          className={treeLevel > 0 ? `ml-5` : ''}
        >
          <AccordionHeader className="border-b-0 p-1 cursor-default">
            <div className="flex items-center gap-1 font-nomal text-base">
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-4 w-4 cursor-pointer transition-transform ${
                  treeNodeOpen.get(treeNode.key) ? '' : 'rotate-180'
                }`}
                onClick={() => {
                  if (treeNode.subTreeData && treeNode.subTreeData.length > 0) {
                    toggleOpen(treeNode.key);
                  }
                }}
              />
              {typeof treeNode.label === 'string' ? (
                <Typography color="blue-gray" className="mr-auto font-normal">
                  {treeNode.label}
                </Typography>
              ) : (
                treeNode.label
              )}
            </div>
          </AccordionHeader>
          {treeNode.subTreeData && treeNode.subTreeData.length > 0 && (
            <AccordionBody className="py-0">{renderTreeNodes(treeNode.subTreeData, treeLevel + 1)}</AccordionBody>
          )}
        </Accordion>
      );
    });
  };

  useEffect(() => {
    initTreeNodeOpen(props.tree);
    setTree(() => {
      return props.tree;
    });
  }, []);
  return (
    <>
      <div className="w-full">{renderTreeNodes(tree)}</div>
    </>
  );
};

export default TreeView;
