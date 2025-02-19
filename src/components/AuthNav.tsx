import { NavLink } from '@solidjs/router';

export default function AuthNav() {
  return (
    <div class='nav fixed top-0 z-20 flex w-[50%] justify-start bg-transparent opacity-90'>
      <div class='mx-auto flex w-full flex-row justify-between py-4'>
        <div class='ml-4 flex flex-row items-center justify-center gap-4'>
          <a
            href='/'
            class='ml-4 flex flex-row items-center justify-center gap-4'
          >
            <img
              class='business-education'
              src='src/assets/img/business-education-logo-2.png'
            />
            <div class='vertical-line'></div>
            <div class='flex flex-col justify-center gap-1'>
              <div class='text-wrapper-1'>PENDEKAR</div>
              <div class='text-wrapper-2'>
                Pojok Education
                <br />
                Career Scholarship
              </div>
            </div>
          </a>
          <div class='text-wrapper flex flex-row items-center justify-center gap-12 px-4'>
            <p>
              <NavLink href={'/#tentangKami'}>Tentang Kami</NavLink>
            </p>
            <p>
              <NavLink href={'/#program'}>Program</NavLink>
            </p>
            <p>
              <NavLink href={'/#testimoni'}>Testimoni</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
