import { A } from '@solidjs/router';

export default function GuestSidebar() {
  return (
    <div class='nav fixed top-0 z-20 flex w-full justify-start opacity-90'>
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
              <a href='#tentangKami' class='hover:text-blue-400'>
                Tentang Kami
              </a>
            </p>
            <p>
              <a href='#program' class='hover:text-blue-400'>
                Program
              </a>
            </p>
            <p>
              <a href='#testimoni' class='hover:text-blue-400'>
                Testimoni
              </a>
            </p>
          </div>
        </div>
        <div class='mr-4 flex flex-row items-center justify-center gap-6'>
          <div class='search flex items-center justify-between px-4 text-black'>
            <input
              // ref={inputRef}
              // value={searchTerm()}
              // onInput={handleInputChange}
              // onKeyPress={handleKeyPress}
              id='searchInput'
              type='text'
              placeholder='Search Anything'
              class='bg-transparent focus:outline-none'
            />
            <button>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z'
                />
              </svg>
            </button>
          </div>
          {/* <A href='/signin'>
            <button class='button-login flex-cols flex items-center justify-center gap-2 px-4'>
              <div class='text-lg text-white'>Login</div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='white'
                  d='m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z'
                />
              </svg>
            </button>
          </A> */}
          {!document.cookie ? (
            <A href='/signin'>
              <button class='button-login flex-cols flex items-center justify-center gap-2 px-4'>
                <div class='text-lg text-white'>Login</div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='white'
                    d='m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z'
                  />
                </svg>
              </button>
            </A>
          ) : (
            <A href='/dashboard'>
              <button class='button-login flex-cols flex items-center justify-center gap-2 px-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='white'
                    d='m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z'
                  />
                </svg>
              </button>
            </A>
          )}

          {/* <a href=""></a> */}
        </div>
      </div>
    </div>
  );
}
