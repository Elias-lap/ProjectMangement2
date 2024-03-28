export interface FormData {
  email: string;
  password: string;
  message?: string;
  confirmPassword?: string;
  seed?: string;
}
export interface FormDataVerify {
  email: string;
  code: string;
}
export interface FormDataRegister {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage :File[]
}
export interface ToastContextType {
  showToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}

export interface AuthContextType {
  token:string;
}
export interface ChangPassProps {
  handleClose: () => void;
}

export  interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
 export interface DataTasks {
  creationDate:string,
  description:string,
  employee:{
    creationDate:string,
    userName:string
  }
  project :{
    creationDate:string,
    title:string,
  }

  id :number,
  title:string,
  status:string,
}