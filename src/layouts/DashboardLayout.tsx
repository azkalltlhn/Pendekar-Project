import SignoutModal from '@/components/modals/SignoutModal.tsx';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useNavigate } from '@solidjs/router';
import { createEffect, createSignal, JSXElement } from 'solid-js';

export default function DashboardLayout({
  children,
  name,
}: {
  children: JSXElement;
  name: string;
}) {

  const [sessionCookies, setSessionCookies] = createSignal(document.cookie)
  const navigate = useNavigate()

  createEffect(()=>{
    setSessionCookies(document.cookie)
    if(!sessionCookies()){
      navigate('/signin')
    }
  }, [sessionCookies()])

  return (
    <>
      <Navbar title={name} />
      <Sidebar />

      <main>
        <section class='bg-base-200 p-4 pt-28 sm:ml-64'>
          <div class='rounded-lg p-4'>{children}</div>
        </section>
      </main>

      <SignoutModal />
    </>
  );
}
