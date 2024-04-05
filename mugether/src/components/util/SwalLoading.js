
import Swal from 'sweetalert2';

 export default function SwalLoading() {
  return Swal.fire({
    title: 'กำลังโหลด...',
    html: 'โปรดรอ',
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  })
}


