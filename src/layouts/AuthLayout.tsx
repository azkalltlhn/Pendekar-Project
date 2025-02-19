import AuthNav from '@/components/AuthNav';
import { useNavigate } from '@solidjs/router';
import { JSXElement, createEffect, createSignal } from 'solid-js';

export default function AuthLayout({ children }: { children: JSXElement }) {
  const [sessionCookies, setSessionCookies] = createSignal(document.cookie);
  const navigate = useNavigate();

  createEffect(() => {
    setSessionCookies(document.cookie);
    if (sessionCookies()) {
      navigate('/');
    }
  }, [sessionCookies()]);
  return (
    <>
      <AuthNav />
      <main>{children}</main>
    </>
  );
}
