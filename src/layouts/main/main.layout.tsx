'use client';
import { Breadcrumbs, Typography } from '@material-tailwind/react';

type Props = {
  title: string;
  routePaths: {
    name: string;
    path: string;
  }[];
};

const MainLayout = (props: Props) => {
  const { title, routePaths } = props;
  return (
    <div className="p-5 w-full">
      <div>
        <Breadcrumbs separator=">" className="bg-transparent	">
          {routePaths.map((routePath, index) => {
            return (
              <a href={routePath.path} key={index} className={routePaths.length - 1 > index ? 'opacity-60' : ''}>
                {routePath.name}
              </a>
            );
          })}
        </Breadcrumbs>
      </div>
      <div>
        <Typography variant="h2">{title}</Typography>
      </div>
      <div>여기에 컨텐츠를 넣으면 된다 이말임!!</div>
    </div>
  );
};

export default MainLayout;
