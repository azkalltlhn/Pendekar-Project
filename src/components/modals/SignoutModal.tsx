import { logOut } from "@/functions/Auth";
import { useNavigate } from "@solidjs/router";

export default function SignoutModal() {

  const navigate = useNavigate()

  const handleLogout = () =>{
    logOut()
    navigate('/')
  }
  return (
    <dialog id='signout_modal' class='modal modal-top sm:modal-middle'>
      <div class='modal-box'>
        <h3 class='text-lg font-bold'>Sign Out</h3>
        <p class='py-4'>Are you sure you want to exit?</p>
        <div class='modal-action'>
          <button class='btn bg-royal-blue text-white hover:bg-primary' onClick={()=>{handleLogout()}}>
            Sign Out
          </button>
          <form method='dialog'>
            <button class='btn btn-outline border-2 border-error text-error hover:border-error hover:bg-error hover:text-white'>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
