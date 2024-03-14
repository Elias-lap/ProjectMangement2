import React from 'react'

export default function VerifyAccount() {
  const { showSuccessToast, showErrorToast } = useToast();
  const [spinner, setSpinner] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataVerify>();
  const navigate = useNavigate();

// senD Data to Api
const onSubmit = async (data: FormDataVerify) => {
  setSpinner(true);

  try {
    const response = await axios.put('https://upskilling-egypt.com:3003/api/v1/Users/verify', data );
    showSuccessToast('Account verified successfully');
    navigate('/');
    console.log(response)
  } catch (error ) {
    if (axios.isAxiosError(error) && error.response) {
      showErrorToast(error.response.data.message)}
      else {
        // Handle other types of errors here
        showErrorToast("An error occurred.");
      }
  } finally {
    setSpinner(false);
  }
};
  return (
    <div>VerifyAccount</div>
  )
}
