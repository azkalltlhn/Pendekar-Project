// import { Icon } from "@iconify-icon/solid";
import { createSignal, onCleanup, createEffect } from 'solid-js';
import Frame16 from '@/assets/img/frame16.svg';
import Frame17 from '@/assets/img/frame17.svg';
import Frame18 from '@/assets/img/frame18.svg';
import '../layouts/carousel-beasiswa.css'; // Import file CSS untuk gaya

function CarouselBeasiswa() {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const slides = [
    Frame16,
    Frame17,
    Frame18,
  ];

  // Tombol kanan untuk mengganti slide
  const nextSlide = () => {
    setActiveIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  // Tombol kiri untuk mengganti slide
  const prevSlide = () => {
    setActiveIndex(
      prevIndex => (prevIndex - 1 + slides.length) % slides.length,
    );
  };

  createEffect(() => {
    const intervalId = setInterval(nextSlide, 7000); // Mengganti setiap 5 detik (sesuaikan dengan keinginan Anda)

    // Membersihkan interval saat komponen di-unmount
    onCleanup(() => {
      clearInterval(intervalId);
    });
  });

  // Define your custom styles for the img element
  // const imgStyles = {
  //   width: "100%", // Set the width to 96% of the parent container
  //   height: "30vw", // Maintain the aspect ratio
  // };

  return (
    <div class='carousel-container'>
      <button onClick={prevSlide} class='carousel-button-kiri prev'></button>
      {slides.map((slide, index) => (
        <div
          class={`carousel-slide ${index === activeIndex() ? 'active' : ''}`}
        >
          {index === activeIndex() && (
            <img src={slide} alt={`Slide ${index + 1}`} class='imgStyles' />
          )}
        </div>
      ))}
      <button onClick={nextSlide} class='carousel-button-kanan next'></button>
      <div class='carousel-radio'>
        {slides.map((_, index) => (
          <span
            class={`dot ${index === activeIndex() ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
          </span>
        ))}
      </div>
    </div>
  );
}

export default CarouselBeasiswa;
