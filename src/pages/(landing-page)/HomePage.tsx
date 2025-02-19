import { NavLink, useNavigate } from '@solidjs/router';
import EventPosterExample1 from '@/assets/img/event-poster-example-1.png';
import EventPosterExample2 from '@/assets/img/event-poster-example-2.png';
import EventPosterExample3 from '@/assets/img/transformasi_media.jpg';
import BeasiswaExample1 from '@/assets/img//poster-beasiswa-1.jpg';
import BeasiswaExample2 from '@/assets/img//poster-beasiswa-2.jpg';
import BeasiswaExample3 from '@/assets/img//poster-beasiswa-3.webp';
import { createEffect, createSignal } from 'solid-js';
import { getAllEvents } from '@/functions/Event';
import { getAllBeasiswa } from '@/functions/Scholarship';
import { getAllJobs } from '@/functions/Jobs';

export default function HomePage() {
  const navigate = useNavigate();
  const [active, setActive] = createSignal('event')

  createEffect(async()=>{

  }, [])

  const handleItemClick = () => {
    if (!document.cookie) {
      navigate('/signin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleChange = (type: any) =>{
    switch(type){
      case 'event' : {
        document.getElementById('event')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-violet-700')
        document.getElementById('beasiswa')?.classList.add('border-white')
        document.getElementById('lowongan')?.classList.add('border-white')
        setActive(type)
      } break;
      case 'beasiswa' : {
        document.getElementById('beasiswa')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-white')
        document.getElementById('beasiswa')?.classList.add('border-emerald-600')
        document.getElementById('lowongan')?.classList.add('border-white')
        setActive(type)
      } break;
      case 'lowongan' : {
        document.getElementById('lowongan')?.classList.remove('border-white')
        document.getElementById('event')?.classList.add('border-white')
        document.getElementById('beasiswa')?.classList.add('border-white')
        document.getElementById('lowongan')?.classList.add('border-red-600')
        setActive(type)
      } break;
    }
  }

  return (
    <div class='overflow-x-hidden'>
      <div class='bg-white'>
        <div class='flex flex-row'>
          <div class='pendekar flex flex-col items-start justify-center pb-4 pl-8'>
            <div class='flex flex-row justify-between'>
              <div class='flex flex-col'>
                <div class='pendekar1 flex flex-row items-center gap-8'>
                  Kita adalah <div class='horizontalLine w-[300px]'></div>
                </div>
                <div class='pendekar2'>Pendekar</div>
                <div class='pendekar3'>
                  #BeAWinner meraih <br />
                  <div class='flex flex-row items-center gap-8'>
                    masa depan <div class='horizontalLine w-[200px]'></div>
                  </div>
                </div>
                <div class='pendekar4'>
                  Mulai bangun masa depanmu dan mari mengubah dunia bersama
                </div>
              </div>
              <div>
                <img
                  src='src/assets/img/supermen.gif'
                  class='absolute left-0 ml-[60%] mt-40 h-[400px] w-[500px]'
                />
              </div>
            </div>
          </div>
        </div>
        <div class='containerWinner m-16 mb-24 mt-48 flex h-[250px]'>
          <svg
            class='z-10 ml-8 mt-16'
            width='175'
            height='175'
            viewBox='0 0 175 175'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M132.781 81.1426C135.817 78.6406 153.344 67.7988 162.942 58.666C170.434 51.5293 173.332 32.8945 161.807 23.8301C146.822 12.0586 132.44 24.418 132.44 24.418C132.44 24.418 131.182 17.4316 122.432 13.3301C111.412 8.16211 97.4532 6.23438 84.6153 6.39844C72.1739 6.54883 60.7169 8.05273 50.545 13.043C41.4396 17.5137 40.8927 23.8848 40.8927 23.8848C40.8927 23.8848 28.9435 12.4687 14.3009 21.7383C-0.328008 31.0215 3.86926 49.6152 10.9103 57.4219C20.0841 67.5937 31.1036 72.7754 36.1075 76.5215C41.0978 80.2676 45.8829 83.8359 45.8829 87.0488C45.8829 90.2617 44.4611 90.9727 43.9142 90.7949C43.381 90.6172 42.4376 87.4863 39.9904 88.8262C36.6544 90.6719 37.6661 98.1094 44.6251 98.8203C51.3653 99.5176 52.6505 92.3945 52.6505 92.3945L53.7169 85.4355L64.7775 93.1055L76.9044 103.1L76.549 111.658C76.549 111.658 76.0157 118.262 72.8028 123.977C69.59 129.691 64.422 135.393 64.422 135.393L64.2579 140.561L109.225 139.494L107.803 134.504C107.803 134.504 102.006 128.133 98.5196 121.297C96.0314 116.402 95.6349 111.467 95.6349 111.467L95.5255 99.1895L118.863 84.8887C118.863 84.8887 121.365 86.8574 121.01 87.5684C120.654 88.2793 120.572 95.5664 126.178 98.2734C131.715 100.953 136.172 97.5625 135.639 92.9141C135.106 88.2793 132.248 89.8789 131.359 90.5898C130.471 91.3008 128.502 91.4785 127.969 88.7988C127.422 86.1465 129.746 83.6445 132.781 81.1426ZM17.8966 55.9043L12.5509 39.6348L19.0177 31.1719L26.2638 29.0527C26.2638 29.0527 35.5196 35.957 35.8478 36.5176C36.1759 37.0781 41.754 48.5488 41.754 48.5488L49.1095 75.1816L17.8966 55.9043ZM122.979 77.3008C123.088 76.7402 129.883 48.7676 129.883 48.7676C129.883 48.4394 134.668 46.2109 134.668 45.7598C134.668 45.3086 143.363 31.1582 143.363 31.1582L157.856 31.7188L160.863 46.0879L153.617 58.0098C153.631 58.0234 122.869 77.8477 122.979 77.3008Z'
              fill='#FEC417'
            />
            <path
              d='M163.953 41.8906C162.887 29.1484 150.281 26.0996 145.1 27.9453C139.918 29.791 136.555 33.25 135.406 38.1719C134.477 42.1504 133.547 44.8027 132.481 45.2129C131.305 45.6504 130.225 45.4727 130.225 45.4727C130.225 45.4727 130.033 36.8594 130.088 33.3867C130.225 26.2227 132.412 24.3906 132.412 24.3906C132.412 24.3906 131.947 21.9707 131.018 20.6309C130.088 19.3047 128.365 17.582 128.365 17.582C128.365 17.582 128.762 21.0273 127.039 21.834C125.317 22.6406 123.457 21.4375 123.457 21.4375L125.18 28.6016C125.18 28.6016 122.391 64.3125 122.131 65.1055C121.871 65.8984 111.385 84.082 111.385 84.082C111.385 84.082 105.274 89.7969 102.362 91.123C99.4357 92.4492 96.9201 95.9082 85.6408 96.0312C74.3615 96.168 64.6681 87.2676 64.6681 87.2676L54.9748 77.9707L47.8107 56.8613L46.7443 35.3555L47.1955 27.5352L47.5099 24.2676L47.0041 22.6133C47.0041 22.6133 46.0744 23.543 44.3517 23.1465C42.6291 22.75 41.9592 20.4941 41.9592 20.4941C41.9592 20.4941 41.2892 21.5605 41.1662 22.0938C41.0295 22.627 40.8927 23.8574 40.8927 23.8574C40.8927 23.8574 42.7521 25.8125 43.1486 28.6016C43.5451 31.3906 43.0119 42.9434 41.0295 42.6699C39.0334 42.4102 39.6896 32.7168 32.1291 28.998C25.5802 25.7715 15.8049 26.7422 11.8127 34.8359C7.83415 42.9297 10.7463 52.4863 23.2287 61.3867C35.7111 70.2871 49.0002 77.7656 51.1056 84.9023C53.6213 93.3926 47.9201 98.4375 47.9201 98.4375C47.9201 98.4375 52.0627 97.8633 54.0998 93.4199C54.756 91.9844 55.0021 89.8926 55.0978 88.6484C59.8146 94.8008 66.09 100.01 74.4025 102.525C77.547 103.605 81.0881 104.152 86.0099 104.152C86.7209 104.152 87.4181 104.125 88.1154 104.098C93.8713 103.893 98.7931 102.812 103.565 100.447C110.004 97.4668 114.994 92.9141 118.85 87.7461C118.74 88.9766 119.492 92.0391 120.928 94.459C123.444 98.7109 127.695 98.9707 127.695 98.9707C127.695 98.9707 121.858 95.5254 123.047 87.2949C124.236 79.0644 129.678 76.1387 137.908 70.834C146.166 65.5156 165.006 54.6328 163.953 41.8906ZM29.0802 59.9512C25.3752 57.3398 18.881 53.8535 16.2013 48.5352C12.633 41.4395 15.5314 32.8672 22.3127 31.8145C36.3947 29.5996 36.6545 47.0859 37.5842 49.2051C38.5138 51.3242 41.1662 51.4609 41.1662 51.4609C41.1662 51.4609 41.2619 52.6367 41.6447 54.9062C41.6584 54.9746 41.672 55.0293 41.672 55.0977L41.7131 55.3027C41.9728 56.8477 42.342 58.7754 42.8615 60.9766L42.9025 61.1406C43.1896 62.3848 43.4904 63.5605 43.8049 64.6406C44.4338 66.9102 45.1994 69.3574 46.1427 71.873C44.7756 70.9434 36.9416 65.5156 29.0802 59.9512ZM156.653 50.1211C153.713 54.8789 147.766 58.4199 143.377 61.4004C137.717 65.2422 129.295 71.0117 126.916 72.625C127.463 71.1758 127.942 69.7402 128.379 68.332C129.09 66.4727 129.842 64.2031 130.361 61.7559C131.729 55.3301 131.961 49.7109 131.961 49.7109C131.961 49.7109 134.75 50.5039 136.473 48.6445C138.195 46.7852 138.838 41.0156 140.451 38.2949C142.967 34.043 148.012 29.668 155.586 34.9727C159.961 38.0488 160.125 44.4883 156.653 50.1211ZM82.7424 108.432L90.467 108.336C90.467 108.336 90.672 116.771 91.8888 123.061C93.1056 129.363 94.7326 136.363 94.7326 136.363C94.7326 136.363 78.9963 141.641 79.092 135.953C79.1877 130.266 81.5256 119.191 81.5256 119.191C81.5256 119.191 82.9474 105.998 82.7424 108.432Z'
              fill='#FFA828'
            />
            <path
              d='M69.7812 20.7676C69.7812 20.7676 78.3809 19.7969 86.3789 19.9199C94.377 20.043 102.607 21.6152 102.607 21.6152C102.607 21.6152 102.129 48.3848 100.666 63.4102C99.2168 78.4355 93.5293 89.6875 92.0117 92.873C90.5488 95.9629 89.4824 97.6172 89.4824 97.6172L81.7715 96.7148L68.4414 69.9453L69.7812 20.7676Z'
              fill='#FFA828'
            />
            <path
              d='M59.4865 24.7734C59.4865 24.7734 61.9064 23.5566 65.4201 22.2305C68.6056 21.0273 71.4767 20.6582 71.4767 20.6582C71.4767 20.6582 71.5588 38.4043 71.8459 51.0644C72.092 61.8516 76.0842 79.5293 78.0256 84.2598C79.967 88.9902 83.467 96.209 83.467 96.209C83.467 96.209 76.426 95.1973 72.092 89.7012C69.8088 86.8027 59.131 64.3809 58.7619 49.6016C58.3928 34.8223 59.842 24.4043 59.4865 24.7734Z'
              fill='#FFEFAB'
            />
            <path
              d='M55.4804 26.8242C55.2343 27.5488 53.3066 42.8203 56.328 56.9844C59.3495 71.1484 63.8202 80.8418 66.7734 84.6836C69.3984 88.0879 71.1073 89.7012 72.078 89.7012C73.0488 89.7012 68.0859 77.957 65.7753 68.7422C63.4784 59.541 62.2616 48.5078 62.0155 43.0664C61.7695 37.6113 61.537 23.5566 61.537 23.5566C61.537 23.5566 58.871 24.7734 58.2695 25.1289C57.6679 25.498 55.4804 26.8242 55.4804 26.8242Z'
              fill='#FFFCFD'
            />
            <path
              d='M72.9258 135.365C72.9258 135.365 78.1348 126.889 79.2285 120.463C80.3223 114.037 80.9238 108.35 80.9238 108.35L84.1504 108.486C84.1504 108.486 83.8359 117.797 83.4668 124.1C83.0977 130.402 82.0176 136.582 82.0176 136.582L72.9258 135.365Z'
              fill='#FFEFAB'
            />
            <path
              d='M76.9317 103.1C76.9317 103.1 79.3516 100.734 86.0098 100.734C92.668 100.734 95.5254 103.291 95.5254 103.291L95.7032 111.508C95.7032 111.508 91.2735 110.127 85.8868 110.059C81.4024 110.004 76.5762 111.672 76.5762 111.672L76.9317 103.1ZM47.8516 21.4922C48.9727 20.4531 59.7188 12.3867 85.1622 12.168C112.533 11.9219 122.801 19.8516 123.443 20.2891C124.168 20.7676 125.016 22.9551 124.66 23.9258C124.291 24.8965 123.566 25.2519 121.516 24.4043C119.451 23.5566 109.279 16.1328 84.8067 16.8984C61.3047 17.623 51.3379 24.7734 50.2852 25.375C49.4375 25.8535 47.8653 25.9766 47.1407 25.0059C46.4024 24.0488 47.127 22.1758 47.8516 21.4922ZM124.66 27.1934C121.516 27.4394 123.689 52.7598 117.031 68.6191C109.895 85.5859 100.789 90.4258 101.158 91.3965C101.527 92.3672 110.441 89.6738 116.061 81.7031C121.27 74.3203 124.414 67.7715 125.877 59.0488C127.313 50.3262 128.16 26.9199 124.66 27.1934ZM47.1817 30.0918C46.3887 30.0508 47.1954 42.6836 45.9102 48.2344C45.418 50.3672 44.2149 50.8047 44.0918 51.2832C43.9688 51.7617 46.7305 68.0176 51.3653 75.1543C55.8496 82.0586 64.6954 90.6582 66.1446 89.209C67.5938 87.7598 59.7188 82.9062 54.4004 72.3652C51.3379 66.3223 48.2207 57.2168 48.0977 46.7988C48.0157 39.9082 48.877 30.1875 47.1817 30.0918Z'
              fill='#D1701C'
            />
            <path
              d='M118.631 154.096L118.617 134.559H55.9043C56.0957 134.559 55.9453 150.445 55.918 154.164H47.0039V168.314H126.643V154.164L118.631 154.096Z'
              fill='#865C50'
            />
            <path
              d='M76.002 144.826C74.457 144.758 72.6797 145.072 72.6113 146.986C72.543 148.9 72.543 154.438 72.543 155.49C72.543 156.543 73.4043 157.459 75.5645 157.527C77.7246 157.596 98 157.527 99.4219 157.527C100.844 157.527 101.582 156.297 101.637 155.066C101.705 153.836 101.568 148.654 101.568 147.246C101.568 144.908 99.4766 144.908 98.0547 144.908C96.5234 144.881 76.002 144.826 76.002 144.826Z'
              fill='#FCC219'
            />
          </svg>

          <div class='winner1 -ml-12 mt-24 h-min rounded-lg bg-[#E2E2E2] py-2 pl-12 pr-4'>
            <div class='winner2 absolute -mt-8 h-fit rounded-xl bg-[#20448D] px-2'>
              PENDEKAR #BeAWinner
            </div>
            #1 to Develop your Career
          </div>
          <div class='mx-auto -mr-96 mt-6 h-[252px] w-[500px] self-center drop-shadow-lg'>
            <img
              class='mx-auto w-[400px] -rotate-[20deg]'
              src='src/assets/img/analisis.png'
              alt=''
            />
          </div>
          <div class='mx-auto mt-6 h-[252px] w-[500px] self-center drop-shadow-lg'>
            <img
              class='mx-auto w-[400px] -rotate-[20deg]'
              src='src/assets/img/page.png'
              alt=''
            />
          </div>
        </div>
      </div>
      <div id='tentangKami' class='pt-18 flex flex-col bg-[#EFF6FE] p-4'>
        <div class='judul1 flex justify-center'>
          Website #1 Mahasiswa & Fresh Graduate
        </div>
        <div class='flex flex-row flex-wrap items-center justify-center gap-6 p-12  '>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/Pengguna.png' alt='' />
              <div class='text1'>Pengguna</div>
            </div>
            <br />
            <div class='text2'>
              5.000.000+ pengguna sudah bergabung menjadi bagian PENDEKAR.
            </div>
          </div>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/Event.png' alt='' />
              <div class='text1'>Event</div>
            </div>
            <br />
            <div class='text2'>
              Daftar ke 2,000+ event pilihan (webinar, lomba, volunteering,
              dsb). Kamu bisa upload dan promosi event juga, lho!
            </div>
          </div>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/Beasiswa.png' alt='' />
              <div class='text1'>Beasiswa</div>
            </div>
            <br />
            <div class='text2'>
              1000+ info beasiswa dengan berbagai benefit untuk menunjang
              berbagai kegiatanmu!
            </div>
          </div>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/Lowongan.png' alt='' />
              <div class='text1'>Lowongan Kerja</div>
            </div>
            <br />
            <div class='text2'>
              Siapkan masa depanmu dengan ikut lowongan kerja dari aplikasi
              PENDEKAR
            </div>
          </div>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/User Friendly.png' alt='' />
              <div class='text1'>User Friendly</div>
            </div>
            <br />
            <div class='text2'>
              Dengan mendengar suara dari beberapa user kami, kami berusaha
              memahami keinginan user kami.
            </div>
          </div>
          <div class='rectangle1 gap-3 p-4'>
            <div class='flex items-center gap-2 pt-4'>
              <img src='src/assets/img/Dashboard Activity.png' alt='' />
              <div class='text1'>Dashboard Activity</div>
            </div>
            <br />
            <div class='text2'>
              Terdapat dashboard yang dapat digunakan untuk menunjang melihat
              aktifitas kamu di website PENDEKAR ini, lho!
            </div>
          </div>
        </div>
      </div>
      <div id='program' class='judul2 pt-18 flex justify-center px-4 py-8'>
        Siap Mengikuti Beragam Challenge Ini?
      </div>
      <div class='subjudul2_1 flex justify-center p-2'>
        Kamu akan ditantang untuk menunjukkan semangat mengasah ilmu dan masa
        depan sesuai minat kamu
      </div>

      <div class='mx-auto flex w-[90%] justify-around py-6'>
        <button onClick={()=>{handleChange('event')}} id='event'  class='flex w-96 items-center justify-center rounded-3xl border-2 border-violet-700 bg-white p-2 drop-shadow-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 16 16'
          >
            <path
              fill='#8A59F1'
              fill-rule='evenodd'
              d='M14.5 2H9l-.35.15l-.65.64l-.65-.64L7 2H1.5l-.5.5v10l.5.5h5.29l.86.85h.7l.86-.85h5.29l.5-.5v-10zm-7 10.32l-.18-.17L7 12H2V3h4.79l.74.74zM14 12H9l-.35.15l-.14.13V3.7l.7-.7H14zM6 5H3v1h3zm0 4H3v1h3zM3 7h3v1H3zm10-2h-3v1h3zm-3 2h3v1h-3zm0 2h3v1h-3z'
              clip-rule='evenodd'
            />
          </svg>
          <p class='px-6'>Event</p>
        </button>
        <button onClick={()=>{handleChange('beasiswa')}} id='beasiswa'  class='flex w-96 items-center justify-center rounded-3xl border-2 bg-white p-2 drop-shadow-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 24 24'
          >
            <path
              fill='#03A631'
              d='M4 11.333L0 9l12-7l12 7v8.5h-2v-7.333l-2 1.166v6.678l-.223.275A9.983 9.983 0 0 1 12 22a9.983 9.983 0 0 1-7.777-3.714L4 18.011zM6 12.5v4.792A7.979 7.979 0 0 0 12 20a7.978 7.978 0 0 0 6-2.708V12.5L12 16zM3.97 9L12 13.685L20.03 9L12 4.315z'
            />
          </svg>
          <p class='px-6'>Beasiswa</p>
        </button>
        <button onClick={()=>{handleChange('lowongan')}} id='lowongan'  class='flex w-96 items-center justify-center rounded-3xl border-2 bg-white p-2 drop-shadow-lg'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='40'
            height='40'
            viewBox='0 0 512 512'
          >
            <path
              fill='#F15959'
              d='M336 288H176v-32H16v196a12 12 0 0 0 12 12h456a12 12 0 0 0 12-12V256H336Zm160-164a12 12 0 0 0-12-12H384V56a8 8 0 0 0-8-8H136a8 8 0 0 0-8 8v56H28a12 12 0 0 0-12 12v100h480Zm-152-12H168V88h176Z'
            />
          </svg>
          <p class='px-6'>Lowongan Kerja</p>
        </button>
      </div>

      <div class='carousel flex w-full gap-6'>
        {
          active() === 'event' ?

          <>
          <div id='item1' class='carousel-item m-6 w-[90%] px-24'>
          <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
            <div class='flex h-80 w-full gap-5'>
              <div class='flex h-80 w-64 items-center'>
                <div class=''>
                  <img
                    src={EventPosterExample1}
                    alt={'Event Poster'}
                    class='w-full  h-[300px] object-cover'
                  />
                </div>
              </div>
              <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                  Open Registration: Geo Tourism International Conference (GTIC)
                  2023 By Politeknik Pariwisata Medan
                </h1>
                <div class='flex w-full items-center justify-between'>
                  <h2 class='rounded-full bg-success px-6 py-2 font-poppins text-2xl'>
                    Webinar
                  </h2>
                  <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                  <p class='font-poppins text-2xl text-primary'>
                    #MajuPerekonomian
                  </p>
                </div>
                <div>
                  <button
                    class='btn btn-primary mr-8 w-full rounded-full text-xl'
                    onClick={() => handleItemClick()}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div id='item2' class='carousel-item m-6 w-[90%] px-24'>
            <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
              <div class='flex h-80 w-full gap-5'>
                <div class='flex h-80 w-64 items-center'>
                  <div class=''>
                    <img
                      src={EventPosterExample2}
                      alt={'Event Poster'}
                      class='w-full h-[300px] object-cover'
                    />
                  </div>
                </div>
                <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                  <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                    WEBINAR: Seni Menguasai Penulisan Artikel Ilmiah: Publikasi Bereputasi
                  </h1>
                  <div class='flex w-full items-center justify-between'>
                    <h2 class='rounded-full bg-success px-6 py-2 font-poppins text-2xl'>
                      Webinar
                    </h2>
                    <span class='block h-5 border-r border-[#E7EDF3]'></span>
                    <p class='font-poppins text-2xl text-primary'>
                      #SeniIndonesia
                    </p>
                  </div>
                  <div>
                    <button
                      class='btn btn-primary mr-8 w-full rounded-full text-xl'
                      onClick={() => handleItemClick()}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id='item3' class='carousel-item m-6 w-[90%] px-24'>
            <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
              <div class='flex h-80 w-full gap-5'>
                <div class='flex h-80 w-64 items-center'>
                  <div class=''>
                    <img
                      src={EventPosterExample3}
                      alt={'Event Poster'}
                      class='w-full h-[300px] object-cover'
                    />
                  </div>
                </div>
                <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                  <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                    📸WEBINAR JURNALISTIK NASIONAL 2023📸
                  </h1>
                  <div class='flex w-full items-center justify-between'>
                    <h2 class='rounded-full bg-success px-6 py-2 font-poppins text-2xl'>
                      Webinar
                    </h2>
                    <span class='block h-5 border-r border-[#E7EDF3]'></span>
                    <p class='font-poppins text-2xl text-primary'>
                      #Lpmgsunsri
                    </p>
                  </div>
                  <div>
                    <button
                      class='btn btn-primary mr-8 w-full rounded-full text-xl'
                      onClick={() => handleItemClick()}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>

          :

          active() === 'beasiswa' ?

          <>
          <div id='item1' class='carousel-item m-6 w-[90%] px-24'>
          <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
            <div class='flex h-80 w-full gap-5'>
              <div class='flex h-80 w-64 items-center'>
                <div class=''>
                  <img
                    src={BeasiswaExample1}
                    alt={'Event Poster'}
                    class='w-full  h-[300px] object-cover'
                  />
                </div>
              </div>
              <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                    BRILiaN Scholarship Program (BSP) 2023 DIBUKA✨
                </h1>
                <div class='flex w-full items-center justify-between'>
                  <h2 class='rounded-full bg-blue-400 px-6 py-2 font-poppins text-2xl'>
                    Beasiswa
                  </h2>
                  <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                  <p class='font-poppins text-2xl text-primary'>
                    #BeasiswaBRI
                  </p>
                </div>
                <div>
                  <button
                    class='btn btn-primary mr-8 w-full rounded-full text-xl'
                    onClick={() => handleItemClick()}
                  >
                    Daftar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div id='item2' class='carousel-item m-6 w-[90%] px-24'>
            <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
              <div class='flex h-80 w-full gap-5'>
                <div class='flex h-80 w-64 items-center'>
                  <div class=''>
                    <img
                      src={BeasiswaExample2}
                      alt={'Event Poster'}
                      class='w-full h-[300px] object-cover'
                    />
                  </div>
                </div>
                <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                  <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                    BEASISWA TELKOM UNIVERSITY X MASUKKAMPUS
                  </h1>
                  <div class='flex w-full items-center justify-between'>
                    <h2 class='rounded-full bg-blue-400 px-6 py-2 font-poppins text-2xl'>
                      Beasiswa
                    </h2>
                    <span class='block h-5 border-r border-[#E7EDF3]'></span>
                    <p class='font-poppins text-2xl text-primary'>
                      #telkomuniversity
                    </p>
                  </div>
                  <div>
                    <button
                      class='btn btn-primary mr-8 w-full rounded-full text-xl'
                      onClick={() => handleItemClick()}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id='item3' class='carousel-item m-6 w-[90%] px-24'>
            <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
              <div class='flex h-80 w-full gap-5'>
                <div class='flex h-80 w-64 items-center'>
                  <div class=''>
                    <img
                      src={BeasiswaExample3}
                      alt={'Event Poster'}
                      class='w-full h-[300px] object-cover'
                    />
                  </div>
                </div>
                <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                  <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                    Beasiswa Transformasi Digital Magister Multi disiplin Smart System (Smart-X) ITB 2023
                  </h1>
                  <div class='flex w-full items-center justify-between'>
                    <h2 class='rounded-full bg-blue-400 px-6 py-2 font-poppins text-2xl'>
                      Beasiswa
                    </h2>
                    <span class='block h-5 border-r border-[#E7EDF3]'></span>
                    <p class='font-poppins text-2xl text-primary'>
                     #beasiswas2kominfo
                    </p>
                  </div>
                  <div>
                    <button
                      class='btn btn-primary mr-8 w-full rounded-full text-xl'
                      onClick={() => handleItemClick()}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>

          :

          active() === 'lowongan' ? 

          <>
            <div id={`item1`} class='carousel-item m-6 w-[90%] px-24'>
                <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        Digistar Internship DDB Telkom is NOW Open for Batch MAGENTA November 2023
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-red-400 px-6 py-2 font-poppins text-2xl'>
                          Loker
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          PT Telkom Indonesia
                        </p>
                      </div>
                      <div>
                      <button
                        class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        onClick={() => handleItemClick()}
                      >
                        Daftar Sekarang
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div id={`item2`} class='carousel-item m-6 w-[90%] px-24'>
                <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        Business Analyst at Prudential
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-red-400 px-6 py-2 font-poppins text-2xl'>
                          Loker
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          Prudential Indonesia (PT Prudential Life Assurance)
                        </p>
                      </div>
                      <div>
                      <button
                        class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        onClick={() => handleItemClick()}
                      >
                        Daftar Sekarang
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div id={`item3`} class='carousel-item m-6 w-[90%] px-24'>
                <div class=' rounded-2xl bg-white p-6 drop-shadow-xl w-full'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex w-full flex-col justify-evenly px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        ✨Technical Writer Intern at Bluebird Group ✨
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-red-400 px-6 py-2 font-poppins text-2xl'>
                          Loker
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          Bluebird Group
                        </p>
                      </div>
                      <div>
                      <button
                        class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        onClick={() => handleItemClick()}
                      >
                        Daftar Sekarang
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </>

          :

          ''

        }
        
      </div>
      <div class='flex w-full justify-center gap-2 py-2 pb-6'>
        <NavLink
          href='#item1'
          class='h-5 w-5 rounded-full bg-primary'
        ></NavLink>
        <NavLink
          href='#item2'
          class='h-5 w-5 rounded-full bg-primary'
        ></NavLink>
        <NavLink
          href='#item3'
          class='h-5 w-5 rounded-full bg-primary'
        ></NavLink>
      </div>
      <div
        id='testimoni'
        class='testimoni-rectangle flex flex-col items-center justify-center bg-[#0082FF] p-8 pt-16'
      >
        <div class='judul3 mb-20'>
          Apa Kata Mereka Tentang PENDEKAR #BeAWinner
        </div>

        <div class='flex flex-row flex-wrap items-center justify-center gap-4'>
          <div class='kataMereka m-8 p-8 '>
            <img src='src/assets/img/pp.png' class='-mt-22 pp ml-[31%]' />
            <div class='text3 mt-10 text-center'>
              “BSC merupakan program anti-mainstream. Tidak hanya memberi dana,
              program ini mampu mengembangkan jejaring penerima beasiswa lewat
              kegiatan diskusi dan grup virtual. Sangat bersyukur bisa menjadi
              penerima dan saya merekomendasikan program ini ke seluruh pelajar
              Indonesia!”
            </div>
            <div class='horizontalLine1 mx-auto my-4 w-[150px]'></div>
            <div class='flex flex-col items-center justify-center'>
              <div class='text4'>Bae Suci Istiqomah</div>
              <div class='text5'>UPN Veteran Jakarta</div>
              <div class='text5'>Awardee BSC 2021</div>
            </div>
          </div>
          <div class='kataMereka m-8 p-8 '>
            <img src='src/assets/img/pp.png' class='-mt-22 pp ml-[33%]' />
            <div class='text3 mt-10 text-center'>
              “BSC merupakan program anti-mainstream. Tidak hanya memberi dana,
              program ini mampu mengembangkan jejaring penerima beasiswa lewat
              kegiatan diskusi dan grup virtual. Sangat bersyukur bisa menjadi
              penerima dan saya merekomendasikan program ini ke seluruh pelajar
              Indonesia!”
            </div>
            <div class='horizontalLine1 mx-auto my-4 w-[150px]'></div>
            <div class='flex flex-col items-center justify-center'>
              <div class='text4'>Bae Suci Istiqomah</div>
              <div class='text5'>UPN Veteran Jakarta</div>
              <div class='text5'>Awardee BSC 2021</div>
            </div>
          </div>
          <div class='kataMereka m-8 p-8 '>
            <img src='src/assets/img/pp.png' class='-mt-22 pp ml-[33%]' />
            <div class='text3 mt-10 text-center'>
              “BSC merupakan program anti-mainstream. Tidak hanya memberi dana,
              program ini mampu mengembangkan jejaring penerima beasiswa lewat
              kegiatan diskusi dan grup virtual. Sangat bersyukur bisa menjadi
              penerima dan saya merekomendasikan program ini ke seluruh pelajar
              Indonesia!”
            </div>
            <div class='horizontalLine1 mx-auto my-4 w-[150px]'></div>
            <div class='flex flex-col items-center justify-center'>
              <div class='text4'>Bae Suci Istiqomah</div>
              <div class='text5'>UPN Veteran Jakarta</div>
              <div class='text5'>Awardee BSC 2021</div>
            </div>
          </div>
        </div>
      </div>
      <div class='flex h-fit flex-col justify-around gap-12 bg-black p-6'>
        <div class='flex flex-row justify-around gap-12 p-4'>
          <div class='ml-4 flex flex-row items-center justify-center gap-8'>
            <img
              class='business-education-footer'
              src='src/assets/img/business-education-logo-2.png'
            />
            <div class='vertical-line2'></div>
            <div class='flex flex-col justify-center gap-1'>
              <div class='text-wrapper-3'>PENDEKAR</div>
              <div class='text-wrapper-4'>
                Pojok Education
                <br />
                Career Scholarship
              </div>
            </div>
          </div>
          <div class='flex flex-col items-start justify-center'>
            <div class='text6'>Contact Us</div>
            <div class='text7'>Monday-Sunday @ 08.00–22.00</div>
            <div class='text7 flex flex-row items-center gap-2'>
              <i class='fab fa-instagram cursor-pointer text-lg text-white'></i>
              @pendekar.id
            </div>
            <div class='text7 flex flex-row items-center gap-2'>
              <i class='fas fa-envelope  cursor-pointer text-lg text-white'></i>
              pendekar@gmail.com
            </div>
            <div class='text7 flex flex-row items-center gap-2'>
              <i class='fab fa-whatsapp cursor-pointer text-lg text-white'></i>
              +62 211-0512-1021
            </div>
          </div>
          <div class='flex flex-col items-start justify-center'>
            <div class='text6'>Office</div>
            <div class='text7'>Jl. Tamanhas No.119, RT.5/RW.4,</div>
            <div class='text7'>Jagakarsa, Kec. Jagakarsa, Kota</div>
            <div class='text7'>Jakarta Selatan, Daerah Khusus</div>
            <div class='text7'>Ibukota Jakarta 12620</div>
          </div>
        </div>
        <div class='flex-end flex justify-end'>copyright © 2023</div>
      </div>
    </div>
  );
}
