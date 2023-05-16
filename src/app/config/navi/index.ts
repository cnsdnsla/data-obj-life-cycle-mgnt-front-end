interface Navigation {
  name: string;
  icon: string;
  link: string;
  subNavitions?: Navigation[];
}

export const navigations: Navigation[] = [
  {
    name: "General",
    icon: "Icon",
    link: "Link",
  },
];
