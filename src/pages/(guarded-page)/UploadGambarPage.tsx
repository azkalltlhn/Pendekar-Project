import { Component, createSignal, onCleanup, JSX } from 'solid-js';
import '../(guarded-page)/UploadGambarPage.css';

const UploadGambarPage: Component = () => {
  const selectImage = document.querySelector('.select-image') as HTMLElement;
  const inputFile = document.querySelector('#file') as HTMLInputElement;
  const imgArea = document.querySelector('.img-area') as HTMLElement;

  const handleClick = () => {
    inputFile.click();
  };

  const handleChange = () => {
    const image = (inputFile.files as FileList)[0];

    if (image.size < 2000000) {
      const reader = new FileReader();

      reader.onload = () => {
        const allImg = imgArea.querySelectorAll('img');
        allImg.forEach(item => item.remove());

        const imgUrl = reader.result as string;
        const img = document.createElement('img');

        img.src = imgUrl;
        imgArea.appendChild(img);
        imgArea.classList.add('active');
        imgArea.dataset.img = image.name;
      };

      reader.readAsDataURL(image);
    } else {
      alert('Image size more than 2MB');
    }
  };

  // Cleanup event listeners to avoid memory leaks
  onCleanup(() => {
    selectImage.removeEventListener('click', handleClick);
    inputFile.removeEventListener('change', handleChange);
  });

  return (
    <div class='container'>
      <a href='/upload-gambar'>
        {' '}
        {/* Tambahkan link ke halaman upload-gambar */}
        <div class='overlap-group'>
          <img class='ellipse' src='src/assets/img/user.svg' alt='User' />
          <img
            class='img'
            src='src/assets/img/Group 1000002476.png'
            alt='Group'
          />
        </div>
      </a>
      <input type='file' id='file' accept='image/*' hidden />
      <div class='img-area' data-img=''>
        <i class='bx bxs-cloud-upload icon'></i>
        <h3>Upload Image</h3>
        <p>
          Image size must be less than <span>2MB</span>
        </p>
      </div>
      <button class='select-image' onClick={handleClick}>
        Select Image
      </button>
    </div>
  );
};

export default UploadGambarPage;
