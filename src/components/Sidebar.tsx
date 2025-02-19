import PendekarAsideLogo from '../assets/img/dashboard-pendekar.svg';
import { NavLink } from '@solidjs/router';

export default function Sidebar() {
  return (
    <aside
      id='logo-sidebar'
      class='fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full bg-white pt-4 transition-transform dark:bg-gray-800 sm:translate-x-0'
      aria-label='Sidebar'
    >
      <div class='h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800'>
        <NavLink href={'/'}>
          <img
            src={PendekarAsideLogo}
            alt={'Pendekar Logo'}
            class='mx-auto w-20'
          />
        </NavLink>
        <hr class='mb-10 mt-4 border-[#E7EDF3]' />
        <ul class='space-y-6 font-poppins text-xl font-medium'>
          <li>
            <NavLink
              href={'/dashboard'}
              activeClass={'text-white bg-cornflower-blue'}
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M1.71429 0.291016C1.25963 0.291016 0.823594 0.470745 0.502103 0.790665C0.180612 1.11059 0 1.54449 0 1.99693L0 12.2324C0 12.6848 0.180612 13.1187 0.502103 13.4386C0.823594 13.7586 1.25963 13.9383 1.71429 13.9383H8.57143C9.02608 13.9383 9.46212 13.7586 9.78361 13.4386C10.1051 13.1187 10.2857 12.6848 10.2857 12.2324V1.99693C10.2857 1.54449 10.1051 1.11059 9.78361 0.790665C9.46212 0.470745 9.02608 0.291016 8.57143 0.291016L1.71429 0.291016ZM13.7143 1.99693C13.7143 1.54449 13.8949 1.11059 14.2164 0.790665C14.5379 0.470745 14.9739 0.291016 15.4286 0.291016L22.2857 0.291016C22.7404 0.291016 23.1764 0.470745 23.4979 0.790665C23.8194 1.11059 24 1.54449 24 1.99693V5.4258C24 5.87824 23.8194 6.31214 23.4979 6.63206C23.1764 6.95198 22.7404 7.13171 22.2857 7.13171H15.4286C14.9739 7.13171 14.5379 6.95198 14.2164 6.63206C13.8949 6.31214 13.7143 5.87824 13.7143 5.4258V1.99693ZM13.7143 12.2324C13.7143 11.7799 13.8949 11.346 14.2164 11.0261C14.5379 10.7062 14.9739 10.5265 15.4286 10.5265H22.2857C22.7404 10.5265 23.1764 10.7062 23.4979 11.0261C23.8194 11.346 24 11.7799 24 12.2324V22.4678C24 22.9203 23.8194 23.3542 23.4979 23.6741C23.1764 23.994 22.7404 24.1737 22.2857 24.1737H15.4286C14.9739 24.1737 14.5379 23.994 14.2164 23.6741C13.8949 23.3542 13.7143 22.9203 13.7143 22.4678V12.2324ZM0 19.039C0 18.5865 0.180612 18.1526 0.502103 17.8327C0.823594 17.5128 1.25963 17.3331 1.71429 17.3331H8.57143C9.02608 17.3331 9.46212 17.5128 9.78361 17.8327C10.1051 18.1526 10.2857 18.5865 10.2857 19.039V22.4678C10.2857 22.9203 10.1051 23.3542 9.78361 23.6741C9.46212 23.994 9.02608 24.1737 8.57143 24.1737H1.71429C1.25963 24.1737 0.823594 23.994 0.502103 23.6741C0.180612 23.3542 0 22.9203 0 22.4678V19.039Z'
                />
              </svg>
              <span class='ms-3'>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/events'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M16.7995 0.513672C17.5579 0.513692 18.2898 0.75848 18.8551 1.20124C19.4205 1.644 19.7796 2.25366 19.8639 2.91367H21.6016C22.2035 2.91369 22.7834 3.11188 23.2262 3.46889C23.669 3.8259 23.9423 4.31563 23.9918 4.84087L24 5.01367V8.61367C24.0001 9.60984 23.5648 10.5683 22.7835 11.2923C22.0021 12.0164 20.934 12.4513 19.7981 12.5077L19.5103 12.5149C19.0535 13.7617 18.2016 14.8692 17.0536 15.7084C15.9057 16.5476 14.5091 17.0839 13.0265 17.2549V19.1137H15.429C16.5664 19.1139 17.6607 19.4952 18.4873 20.1793C19.314 20.8634 19.8104 21.7985 19.8748 22.7929L19.8831 23.0137V23.6137C19.883 23.8313 19.7929 24.0416 19.6293 24.2055C19.4658 24.3695 19.2399 24.476 18.9936 24.5053L18.8552 24.5137H5.14481C4.89619 24.514 4.65589 24.4353 4.46841 24.2923C4.28093 24.1494 4.15898 23.9517 4.12517 23.7361L4.11695 23.6137V23.0137C4.11685 22.0177 4.55194 21.0594 5.33299 20.3354C6.11405 19.6113 7.18187 19.1764 8.3175 19.1197L8.57104 19.1137H10.9694V17.2549C9.48727 17.0835 8.09124 16.547 6.94385 15.7078C5.79645 14.8686 4.94491 13.7614 4.48835 12.5149L4.45409 12.5137C3.27279 12.5137 2.13988 12.1028 1.30457 11.3714C0.469269 10.64 0 9.64802 0 8.61367V5.01367C0 3.85447 1.07446 2.91367 2.39836 2.91367H4.13614C4.22044 2.25345 4.57977 1.64362 5.14538 1.20084C5.711 0.758053 6.4432 0.513397 7.20192 0.513672H16.7995ZM15.429 20.9137H8.57104C8.02958 20.9134 7.50396 21.0736 7.0797 21.3682C6.65544 21.6628 6.3575 22.0744 6.23435 22.5361L6.19598 22.7137H17.8013C17.724 22.2452 17.4682 21.8133 17.0754 21.4881C16.6826 21.1629 16.1758 20.9635 15.6373 20.9221L15.4303 20.9137H15.429ZM16.7995 2.31367H7.20055C6.92794 2.31367 6.6665 2.40849 6.47374 2.57728C6.28097 2.74606 6.17268 2.97498 6.17268 3.21367V10.4113C6.19614 11.7508 6.82034 13.0285 7.91049 13.9685C9.00065 14.9085 10.4693 15.4354 11.9993 15.4354C13.5293 15.4354 14.998 14.9085 16.0881 13.9685C17.1783 13.0285 17.8025 11.7508 17.8259 10.4113V3.21367C17.8259 2.97498 17.7177 2.74606 17.5249 2.57728C17.3321 2.40849 17.0721 2.31367 16.7995 2.31367ZM21.6016 4.71367H19.8831V10.6933C20.4188 10.6263 20.913 10.4027 21.2852 10.0587C21.6574 9.71465 21.8858 9.27053 21.9333 8.79847L21.9429 8.61367V5.01367C21.9428 4.94608 21.9166 4.88051 21.8686 4.82759C21.8206 4.77466 21.7535 4.73748 21.6784 4.72207L21.6016 4.71367ZM4.11695 4.71367H2.39836C2.30749 4.71367 2.22034 4.74528 2.15609 4.80154C2.09183 4.8578 2.05573 4.93411 2.05573 5.01367V8.61367C2.05566 9.11974 2.26429 9.60881 2.64326 9.99091C3.02223 10.373 3.54604 10.6224 4.11832 10.6933L4.11695 4.71367Z' />
              </svg>
              <span class='ms-3'>Event</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/scholarships'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M5.242 14.2827L0 10.0137L12 0.513672L24 10.0137L18.758 14.2827C17.548 11.7627 14.978 10.0137 12 10.0137C9.023 10.0137 6.452 11.7617 5.242 14.2827ZM12 10.5137C10.1435 10.5137 8.36301 11.2512 7.05025 12.5639C5.7375 13.8767 5 15.6572 5 17.5137C5 19.3702 5.7375 21.1507 7.05025 22.4634C8.36301 23.7762 10.1435 24.5137 12 24.5137C13.8565 24.5137 15.637 23.7762 16.9497 22.4634C18.2625 21.1507 19 19.3702 19 17.5137C19 15.6572 18.2625 13.8767 16.9497 12.5639C15.637 11.2512 13.8565 10.5137 12 10.5137Z' />
              </svg>
              <span class='ms-3 flex-1 whitespace-nowrap'>Beasiswa</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/jobs'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M9.6 0.513672H14.4C15.0365 0.513672 15.647 0.779836 16.0971 1.25361C16.5471 1.72739 16.8 2.36997 16.8 3.03999V5.5663H21.6C22.2365 5.5663 22.847 5.83247 23.2971 6.30624C23.7471 6.78002 24 7.4226 24 8.09262V21.9874C24 22.6574 23.7471 23.3 23.2971 23.7737C22.847 24.2475 22.2365 24.5137 21.6 24.5137H2.4C1.76348 24.5137 1.15303 24.2475 0.702944 23.7737C0.252856 23.3 0 22.6574 0 21.9874V8.09262C0 6.69051 1.068 5.5663 2.4 5.5663H7.2V3.03999C7.2 1.63788 8.268 0.513672 9.6 0.513672ZM14.4 5.5663V3.03999H9.6V5.5663H14.4Z' />
              </svg>
              <span class='ms-3 flex-1 whitespace-nowrap'>Lowongan Kerja</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/bookmark'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M0 4.02048C0 3.09041 0.474106 2.19844 1.31802 1.54079C2.16193 0.883138 3.30653 0.513672 4.5 0.513672H19.5C20.6935 0.513672 21.8381 0.883138 22.682 1.54079C23.5259 2.19844 24 3.09041 24 4.02048V22.7562C24 24.1823 21.93 25.0122 20.442 24.1834L12 19.4843L3.558 24.1834C2.0685 25.0134 0 24.1834 0 22.7573V4.02048Z' />
              </svg>
              <span class='ms-3 flex-1 whitespace-nowrap'>Bookmark</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/profile'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M12 2.91367C10.3209 2.91336 8.67111 3.35346 7.21526 4.19002C5.75942 5.02659 4.54845 6.23037 3.70323 7.68121C2.85801 9.13205 2.4081 10.7792 2.39841 12.4583C2.38872 14.1373 2.81959 15.7896 3.64801 17.2501C4.20794 16.5224 4.92772 15.9332 5.75171 15.528C6.5757 15.1229 7.48181 14.9127 8.4 14.9137H15.6C16.5182 14.9127 17.4243 15.1229 18.2483 15.528C19.0723 15.9332 19.7921 16.5224 20.352 17.2501C21.1804 15.7896 21.6113 14.1373 21.6016 12.4583C21.5919 10.7792 21.142 9.13205 20.2968 7.68121C19.4516 6.23037 18.2406 5.02659 16.7847 4.19002C15.3289 3.35346 13.6791 2.91336 12 2.91367ZM21.5316 19.8049C23.136 17.7132 24.0039 15.1498 24 12.5137C24 5.88607 18.6276 0.513672 12 0.513672C5.37241 0.513672 1.35039e-05 5.88607 1.35039e-05 12.5137C-0.00394822 15.1498 0.863899 17.7133 2.46841 19.8049L2.46241 19.8265L2.88841 20.3221C4.01387 21.6379 5.41127 22.694 6.98428 23.4176C8.5573 24.1413 10.2685 24.5152 12 24.5137C14.4328 24.5181 16.8089 23.7791 18.81 22.3957C19.6631 21.8062 20.4367 21.1093 21.1116 20.3221L21.5376 19.8265L21.5316 19.8049ZM12 5.31367C11.0452 5.31367 10.1295 5.69295 9.45442 6.36808C8.77929 7.04321 8.4 7.95889 8.4 8.91366C8.4 9.86844 8.77929 10.7841 9.45442 11.4592C10.1295 12.1344 11.0452 12.5137 12 12.5137C12.9548 12.5137 13.8705 12.1344 14.5456 11.4592C15.2207 10.7841 15.6 9.86844 15.6 8.91366C15.6 7.95889 15.2207 7.04321 14.5456 6.36808C13.8705 5.69295 12.9548 5.31367 12 5.31367Z'
                />
              </svg>
              <span class='ms-3 flex-1 whitespace-nowrap'>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              href={'/history'}
              activeClass={
                'text-white bg-cornflower-blue hover:text-white hover:bg-primary'
              }
              inactiveClass={
                'text-light-steel-blue hover:text-white hover:bg-primary'
              }
              class='group flex items-center rounded-lg px-4 py-2 transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
            >
              <svg
                width='30'
                height='30'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12q0-2.925-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.712 3.513t-1.925 2.85q-1.213 1.212-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z' />
              </svg>
              {/* <svg
                width='24'
                height='25'
                viewBox='0 0 24 25'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
              >
                <path d='M9.6 0.513672H14.4C15.0365 0.513672 15.647 0.779836 16.0971 1.25361C16.5471 1.72739 16.8 2.36997 16.8 3.03999V5.5663H21.6C22.2365 5.5663 22.847 5.83247 23.2971 6.30624C23.7471 6.78002 24 7.4226 24 8.09262V21.9874C24 22.6574 23.7471 23.3 23.2971 23.7737C22.847 24.2475 22.2365 24.5137 21.6 24.5137H2.4C1.76348 24.5137 1.15303 24.2475 0.702944 23.7737C0.252856 23.3 0 22.6574 0 21.9874V8.09262C0 6.69051 1.068 5.5663 2.4 5.5663H7.2V3.03999C7.2 1.63788 8.268 0.513672 9.6 0.513672ZM14.4 5.5663V3.03999H9.6V5.5663H14.4Z' />
              </svg> */}
              <span class='ms-3 flex-1 whitespace-nowrap'>History</span>
            </NavLink>
          </li>
          <li>
            <button
              class='group flex w-full items-center rounded-lg px-4 py-2 text-light-steel-blue transition duration-150 hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-700'
              onClick={() => {
                const modal = document.getElementById('signout_modal') as
                  | HTMLInputElement
                  | null
                  | any;
                modal!.showModal();
              }}
            >
              <svg
                class='h-6 w-6 dark:text-gray-400 dark:group-hover:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 16 16'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3'
                />
              </svg>
              <span class='ms-3 whitespace-nowrap'>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
