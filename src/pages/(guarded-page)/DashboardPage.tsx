import { Component, createEffect, createSignal, onCleanup } from 'solid-js';
import { A, NavLink } from '@solidjs/router';
import { getProfile } from '@/functions/Profile';
import Fire from '@/assets/img/noto_fire.png';
import Header from '@/assets/img/background-header-2.png';
import { getAllEvents } from '@/functions/Event';
import { getAllBeasiswa } from '@/functions/Scholarship';
import { getAllJobs } from '@/functions/Jobs';

const DashboardPage: Component = () => {
  const [nama, setNama] = createSignal<any>('');
  const [event, setEvent] = createSignal<any>([]);
  const [beasiswa, setBeasiswa] = createSignal<any>([]);
  const [lowongan, setLowongan] = createSignal<any>([]);

  createEffect(async () => {
    const userData = await getProfile();
    setNama(userData[0].nama);

    const eventData = await getAllEvents();
    setEvent(
      eventData
        .reverse()
        .sort(() => 0.5 - Math.random())
        .reverse()
        .slice(0, 3),
    );

    const eventBeasiswa = await getAllBeasiswa();
    setBeasiswa(
      eventBeasiswa
        .reverse()
        .sort(() => 0.5 - Math.random())
        .reverse()
        .slice(0, 3),
    );

    const lowonganData = await getAllJobs();
    setLowongan(
      lowonganData
        .reverse()
        .sort(() => 0.5 - Math.random())
        .reverse()
        .slice(0, 3),
    );
  }, []);
  return (
    <div class='w-full'>
      <div
        class='dashboard-atas flex h-[140px] justify-between p-3 pt-8'
        style={{ 'background-image': `url(${Header})` }}
      >
        <div class='flex flex-col'>
          <div class='nama-user'>Hai, {nama()}!</div>
          <div class='kata-kata'>Summary Activity</div>
        </div>
      </div>

      <div class='relative mx-auto -mt-6 mb-6 flex w-[82%] flex-col items-center justify-center rounded-3xl bg-white p-1 shadow-xl'>
        <div class='calon-penerus'>Calon Penerus Masa Depan</div>
        <div class='jangan-menyerah'>Jangan menyerah! Hal besar menantimu</div>
        <img class='absolute right-10' src={Fire} />
      </div>

      <div class='dashboard-bawah mt-4'>
        <div class='mt-2 flex'>
          <div class='rekomendasi-PENDEKAR'>Rekomendasi Event Pendekar </div>
          <img class='api' src={Fire} />
        </div>

        <div class='carousel flex w-full gap-6'>
          {event().map((value: any) => {
            return (
              <div
                id={`event-${value.id_event}`}
                class='carousel-item m-6 w-full'
              >
                <div class=' w-full rounded-2xl bg-white p-6 drop-shadow-xl'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex h-80 w-64 items-center'>
                      <div class=''>
                        <img
                          src={value.poster_event}
                          alt={'Event Poster'}
                          class='h-[300px] w-full object-cover'
                        />
                      </div>
                    </div>
                    <div class='flex w-full flex-col justify-between px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        {value.judul_event}
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-success px-6 py-2 font-poppins text-2xl'>
                          {value.bidang_event}
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          {value.hastag_event}
                        </p>
                      </div>
                      <div>
                        <NavLink
                          href={`/events/category/${value.bidang_event.toLowerCase()}/${
                            value.id_event
                          }`}
                          class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        >
                          Lihat Kegiatan
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class='flex w-full justify-center gap-2 py-2 pb-6'>
          {event().map((value: any) => {
            return (
              <NavLink
                href={`#event-${value.id_event}`}
                class='h-5 w-5 rounded-full bg-primary'
              ></NavLink>
            );
          })}
        </div>
      </div>

      <div class='dashboard-bawah mt-4'>
        <div class='mt-2 flex'>
          <div class='rekomendasi-PENDEKAR'>Rekomendasi Beasiswa Pendekar </div>
          <img class='api' src={Fire} />
        </div>

        <div class='carousel flex w-full gap-6'>
          {beasiswa().map((value: any) => {
            return (
              <div
                id={`beasiswa-${value.id_beasiswa}`}
                class='carousel-item m-6 w-full'
              >
                <div class=' w-full rounded-2xl bg-white p-6 drop-shadow-xl'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex h-80 w-64 items-center'>
                      <div class=''>
                        <img
                          src={value.poster_beasiswa}
                          alt={'Event Poster'}
                          class='h-[300px] w-full object-cover'
                        />
                      </div>
                    </div>
                    <div class='flex w-full flex-col justify-between px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        {value.judul_beasiswa}
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-blue-400 px-6 py-2 font-poppins text-2xl'>
                          Beasiswa
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          {value.hastag_beasiswa}
                        </p>
                      </div>
                      <div>
                        <NavLink
                          href={`/scholarships-detail/${value.id_beasiswa}`}
                          class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        >
                          Lihat Kegiatan
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class='flex w-full justify-center gap-2 py-2 pb-6'>
          {beasiswa().map((value: any) => {
            return (
              <NavLink
                href={`#beasiswa-${value.id_beasiswa}`}
                class='h-5 w-5 rounded-full bg-primary'
              ></NavLink>
            );
          })}
        </div>
      </div>

      <div class='dashboard-bawah mt-4'>
        <div class='mt-2 flex'>
          <div class='rekomendasi-PENDEKAR'>
            Rekomendasi Lowongan Kerja Pendekar{' '}
          </div>
          <img class='api' src={Fire} />
        </div>

        <div class='carousel flex w-full gap-6'>
          {lowongan().map((value: any) => {
            return (
              <div
                id={`loker-${value.id_lowongan}`}
                class='carousel-item m-6 w-full'
              >
                <div class=' w-full rounded-2xl bg-white p-6 drop-shadow-xl'>
                  <div class='flex h-80 w-full gap-5'>
                    <div class='flex w-full flex-col justify-between px-6 py-4'>
                      <h1 class='text-wrap w-full font-dm-sans text-2xl font-bold text-base-content'>
                        {value.judul_lowongan}
                      </h1>
                      <div class='flex w-full items-center justify-between'>
                        <h2 class='rounded-full bg-red-400 px-6 py-2 font-poppins text-2xl'>
                          Loker
                        </h2>
                        <span class=' block h-5 border-r border-[#E7EDF3]'></span>
                        <p class='font-poppins text-2xl text-primary'>
                          {value.perusaahan}
                        </p>
                      </div>
                      <div>
                        <NavLink
                          href='/jobs'
                          class='btn btn-primary mr-8 w-full rounded-full text-xl'
                        >
                          Lihat Kegiatan
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div class='flex w-full justify-center gap-2 py-2 pb-6'>
          {lowongan().map((value: any) => {
            return (
              <NavLink
                href={`#loker-${value.id_lowongan}`}
                class='h-5 w-5 rounded-full bg-primary'
              ></NavLink>
            );
          })}
        </div>
      </div>

      {/* {popUp() && <ConfirmPopUp username="" OnClose={closePopUp} />} */}
      {/* {popUpOpen() && <ConfirmPopUp params={popupData()} OnClose={ClosePopUp} />} */}
    </div>
  );
};
export default DashboardPage;
