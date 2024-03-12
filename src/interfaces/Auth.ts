export interface FormData {
  email: string;
  password: string;
  message?: string;
  confirmPassword?: string;
  seed?: string;
}
export interface FormDataRegister {
  userName: string;
  email : string;
  country : string;
  phoneNumber : string;
  password : string;
  confirmPassword  : string;
}
export interface ToastContextType {
  showToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}



