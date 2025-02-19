import { logOut } from '@/functions/Auth';
import { useNavigate } from '@solidjs/router';
import { createEffect } from 'solid-js';

interface AuthModalProps {
  title: string;
  body: string;
  auth: boolean; // Ganti boolean dengan tipe data yang sesuai jika diperlukan
}

export default function AuthModal({ title, body, auth }: AuthModalProps) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate('/dashboard');
  };

  return (
    <dialog id='auth_modal' class='modal modal-top sm:modal-middle'>
      <div class='modal-box'>
        <h3 class='text-lg font-bold'>{title}</h3>
        <p class='py-4'>{body}</p>
        <div class='modal-action'>
          <form method='dialog'>
            <button
              onclick={() => {
                auth ? handleNav() : '';
              }}
              class='btn btn-outline border-2 border-error text-error hover:border-error hover:bg-error hover:text-white'
            >
              Oke
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

// import { logOut } from "@/functions/Auth";
// import { useNavigate } from "@solidjs/router";
// import { createEffect } from "solid-js";

// export default function AuthModal({ title, body, auth }) {
//   const navigate = useNavigate()

//   const handleNav = () =>{
//     navigate('/dashboard')
//   }
//   return (
//     <dialog id='auth_modal' class='modal modal-top sm:modal-middle'>
//       <div class='modal-box'>
//         <h3 class='text-lg font-bold'>{title}</h3>
//         <p class='py-4'>{body}</p>
//         <div class='modal-action'>
//           <form method='dialog'>
//             <button onclick={()=> { auth? handleNav() : '' }} class='btn btn-outline border-2 border-error text-error hover:border-error hover:bg-error hover:text-white'>
//               Oke
//             </button>
//           </form>
//         </div>
//       </div>
//     </dialog>
//   );
// }
