'use client';
import React from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Navigation } from '@/types';
export type SidebarProps = {
  navigations: Navigation[];
};
const Sidebar = (props: SidebarProps) => {
  const generateMenuItemBody = (navigation: Navigation) => {
    return (
      <>
        <ListItemPrefix className="h-5 w-5 text-blue-gray-700">{navigation.icon}</ListItemPrefix>
        <Typography color="blue-gray" className="mr-auto font-normal">
          {navigation.name}
        </Typography>
      </>
    );
  };

  const generateSingleMenuItem = (navigation: Navigation) => {
    return (
      <a href={navigation.routePath} key={`link_${navigation.id}`}>
        <ListItem key={navigation.id}>{generateMenuItemBody(navigation)}</ListItem>
      </a>
    );
  };

  const generateAccordianMenuItem = (navigation: Navigation) => {
    return (
      <Accordion
        open={true}
        icon={<ChevronDownIcon strokeWidth={2.5} className={`mx-auto h-4 w-4 transition-transform`} />}
      >
        <ListItem className="p-0" key={navigation.id}>
          <AccordionHeader className="border-b-0 p-3">{generateMenuItemBody(navigation)}</AccordionHeader>
        </ListItem>
        <AccordionBody className="py-1">
          <List className="p-0 pl-5">
            {navigation.subNavitions?.map((subNavition) => {
              return generateSingleMenuItem(subNavition);
            })}
          </List>
        </AccordionBody>
      </Accordion>
    );
  };

  const generateMenuItem = (navigation: Navigation) => {
    return navigation.subNavitions && navigation.subNavitions.length > 0
      ? generateAccordianMenuItem(navigation)
      : generateSingleMenuItem(navigation);
  };

  const { navigations } = props;
  return (
    <div className="h-[calc(100vh)] w-full max-w-[16rem] p-2 overflow-y-auto bg-white">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <nav>
        <List>
          {navigations.map((navigation) => {
            return generateMenuItem(navigation);
          })}
        </List>
      </nav>
    </div>
  );
};

export default Sidebar;
