import GuestSidebar from '@/components/GuestSidebar';
import { JSXElement } from 'solid-js';

export default function GuestLayout({ children }: { children: JSXElement }) {
  return (
    <>
      <GuestSidebar />
      <main>{children}</main>
    </>
  );
}
