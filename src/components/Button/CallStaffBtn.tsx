import Swal from 'sweetalert2'
import 'animate.css';

function CallStaffBtn() {
    const alertCallStaff = () =>{
        Swal.fire({
            title: 'Our staff is coming here.',
            confirmButtonColor: '#F472B6',
            showClass: {
              popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
              popup: 'animate__animated animate__zoomOut'
            }
          })
    }
  return (
    <div> 
        <button className='button-firstpage w-32 md:h-12 md:text-lg' onClick={alertCallStaff}>Call the staff</button>
    </div>
  )
}

export default CallStaffBtn