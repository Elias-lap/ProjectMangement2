export interface FormData {
  email: string;
  password: string;
  message?: string;
}

export interface ToastContextType {
  showToast: (message: string) => void;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}