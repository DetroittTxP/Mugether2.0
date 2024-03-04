
import Swal from 'sweetalert2';

 export default function SwalLoading() {
  return Swal.fire({
    title: 'Loading...',
    html: 'Please wait',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  })
}


