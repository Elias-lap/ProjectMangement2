// const onSubmit: SubmitHandler<FormValues> = async (data) => {
//     // setLoadingBtn(true);
//     let token = localStorage.getItem("TokenUser");
//     console.log(token)

//     if (data.newPassword === data.confirmNewPassword) {
//       try {
//         let DtaApi = await axios.put(
//           "https://upskilling-egypt.com:443/api/v1/Users/ChangePassword",
//           data,
//           {
//             headers: {
//               Authorization: localStorage.getItem("TokenUser"),
//             },
//           }
//         );

//         handleClose();
//         toast.success("You are change password");

//         console.log(DtaApi);
//       } catch (error) {
//         toast.error((error as { message: string } | undefined)?.message);
//         // console.log(error?.message)
//       }
//       //   setLoadingBtn(false);
//     } else {
//       setMassageError("Your New Password Don't Equal Your Confirm Password ");
//       //   setLoadingBtn(false);
//     }
//   };