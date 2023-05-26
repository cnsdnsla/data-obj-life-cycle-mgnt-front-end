import { SETTINGS_NAVIGATIONS } from '../navs';

export const getNavigation = (pathName: string) => {
  const targetNavigation = SETTINGS_NAVIGATIONS.find((navigation) => {
    return navigation.routePath === pathName;
  });
  return targetNavigation;
};
