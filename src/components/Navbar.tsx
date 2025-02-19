import { createEffect } from 'solid-js';
import User from '../assets/img/user.svg'
import { createSignal } from 'solid-js';
import { getProfile } from '@/functions/Profile';
import { ENDPOINT_URL } from '@/config/config';

export default function Navbar({ title }: { title: string }) {
  const handleNight = () => {
    const doc = document.querySelector('html');
    const mode = doc?.getAttribute('data-theme')
    if(mode === 'light'){
      doc?.setAttribute('data-theme', 'dark')
    }else{
      doc?.setAttribute('data-theme', 'light')
    }
    
  }

  const [image, setImage] = createSignal<any>()

  createEffect(async()=>{
    const user = await getProfile()
    if(user[0].foto_profile){
      setImage(`${ENDPOINT_URL}/images/${user[0].foto_profile}`)
    }
  },[])

  return (
    <div class='navbars fixed z-[100] ml-64 flex h-28 w-[85vw] items-center justify-between bg-base-200 p-8'>
      <p class='ml-4 text-3xl font-bold capitalize tracking-tight text-blue-900'>
        {title}
      </p>

      <div class='mr-6 flex h-full items-center gap-4 rounded-full bg-white p-4 py-[2rem] shadow'>
        <div class='flex h-10 w-60 items-center gap-2 rounded-3xl border-none bg-violet-50 px-4 text-left text-black outline-none'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path
                fill='#2B3674'
                d='m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z'
              />
            </svg>
          </div>

          <input
            type='text'
            placeholder='Search'
            class='bg-transparent outline-none'
          />
        </div>

        <button>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <g fill='none' stroke='#A3AED0' stroke-width='2'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M6 19v-9a6 6 0 0 1 6-6v0a6 6 0 0 1 6 6v9M6 19h12M6 19H4m14 0h2m-9 3h2'
              />
              <circle cx='12' cy='3' r='1' />
            </g>
          </svg>
        </button>

        <button onClick={()=>{handleNight()}}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path
              fill='#A3AED0'
              d='M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6A9.996 9.996 0 0 1 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.66 9.38-9.98Z'
            />
          </svg>
        </button>

        <button class=' inline-flex h-10 w-10 items-center justify-center'>
          <img class='rounded-full aspect-square' src={image() ? image() : User}/>
        </button>
      </div>

      {/* <div class='h-16 w-96'>
          <div class='fixed right-[16px] top-[31px] h-16 w-96 rounded-3xl bg-white shadow'>
            <div class='relative h-10 w-52'>
              <input
                type='text'
                placeholder='Search'
                class='absolute left-2 top-2 h-10 w-60 rounded-3xl border-none bg-violet-50 p-2 py-1 text-left text-black outline-none'
              />
            </div>
            <div class='absolute left-[275px] top-[18px] h-6 w-6'>
              <div class='absolute left-[12px] top-[3px] h-1.5 w-1.5 rounded-full bg-sky-500'></div>
            </div>
            <div class='absolute left-[320px] top-[10px] inline-flex h-10 w-10 items-center justify-center'>
              <div class='inline-flex shrink grow basis-0 items-center justify-center self-stretch rounded-full bg-gradient-to-t from-orange-200 to-red-200 px-1.5 pt-1.5'>
                <div class='relative h-9 w-7'>
                  <div class='absolute left-[0.23px] top-[6.89px] h-7 w-7'></div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </div>
  );
}
