import Swal from "sweetalert2";

export default function customConfirm(
    onConfirm: any,
    title: string = "確定刪除?",
    confirmButtonText: string = "確定"
){
    Swal.fire({
        title,
        confirmButtonText,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:'取消',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
    }).then(result =>{
        if (result.isConfirmed){
            onConfirm();
        }
    })
}