'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const hideNavbarRoutes = ['/admin', '/login'];

  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
}
