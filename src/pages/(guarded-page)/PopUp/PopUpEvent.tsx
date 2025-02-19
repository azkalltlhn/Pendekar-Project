import { Component, createSignal } from 'solid-js';
import './PopUpEvent.css';
import { useNavigate } from '@solidjs/router';

interface ConfirmPopUpProps {
  OnClose: () => void;
  username: string;
}

const ConfirmPopUp: Component<ConfirmPopUpProps> = props => {
  const navigate = useNavigate();
  const [popUp, setPopUp] = createSignal(false);

  function closePopUp() {
    // setEditPopUp(false);
    // setDeletePopUp(false);
    setPopUp(false);
  }

  const handleLogout = () => {
    // Lakukan proses logout atau arahkan ke halaman login
    // Contoh mengarahkan ke halaman login menggunakan SolidJS
    console.log(`Logout user: ${props.username}`);
    navigate('/landingPage', { replace: true });
  };

  return (
    <div class='overlay'>
      <div class='logout'>
        <div class='overlap-group'>
          <p class='apakah-kamu-yakin'>
            Apakah kamu yakin ingin mengikuti kegiatan
            <br />
            PENDEKAR?
          </p>
          <div class='overlap'>
            <button class='rectangle' onClick={handleLogout}></button>
            <div class='text-wrapper' onClick={handleLogout}>
              Ya
            </div>
          </div>
          <div class='div-wrapper' onClick={props.OnClose}>
            <div class='div'>Tidak</div>
          </div>
        </div>
        <img class='group' src='img/group-1017.png' />
      </div>
      {popUp() && <ConfirmPopUp username='' OnClose={closePopUp} />}
    </div>
  );
};

export default ConfirmPopUp;
