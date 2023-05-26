'use client';
import MainLayout from '@/layouts/main/main.layout';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

const AuthorizationPage = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  return <div>Hello</div>;
};
export default AuthorizationPage;
