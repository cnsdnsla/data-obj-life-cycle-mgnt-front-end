export type Navigation = {
  id: string;
  name: string;
  icon: React.ReactNode;
  routePath: string;
  description: string;
  subNavitions?: Navigation[];
};
