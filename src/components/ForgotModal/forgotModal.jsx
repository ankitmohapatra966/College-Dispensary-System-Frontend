import React, { useState } from "react";
import "./forgotModal.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const ForgotModal = (props) => {
  const [step, setStep] = useState(1);
  const [buttonText, setButtonText] = useState("Send OTP.");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };

  const sendOTPToMail = async () => {
    if (inputField.email.trim().length === 0)
      return toast.error("Please Enter Email");
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
        email: inputField.email,
      })
      .then((response) => {
        console.log(response);
        setStep(2);
        setButtonText("Enter the OTP");
        alert(response.data.message);
      })
      .catch((err) => {
        alert(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const checkOtp = async () => {
    if (inputField.otp.trim().length === 0)
      return toast.error("Please Enter OTP");
    props.showLoader();
    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
        email: inputField.email,
        otp: inputField.otp,
      })
      .then((response) => {
        setStep(3);
        setButtonText("Update New Password")
        alert(response.data.message)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const resetPassword = async () => {
    if (inputField.newPassword.trim().length === 0)
      return toast.error("Please Enter new password");
    props.showLoader();
    if(inputField.newPassword.trim().length === 0) return toast.error("Please Enter new Password")
        props.showLoader();
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,{email:inputField.email,newPassword:inputField.newPassword}).then((response)=>{
        alert(response.data.message)
        props.closeModal();
    }).catch((err)=>{
          toast.error(err?.response?.data?.error);
        }).finally(()=>{
      props.hideLoader();
    })
  };

  const handleForgotBtn = async () => {
    if (step === 1) {
      await sendOTPToMail();
    } else if (step === 2) {
      await checkOtp();
    } else if (step === 3) {
      await resetPassword();
    }
  };
  return (
    <div className="forgot-password-modal">
      <div className="signup-page-card">
        <div className="card-header-form">Reset Password</div>

        <input
          value={inputField.email}
          disabled={step !== 1}
          onChange={(e) => handleOnChange(e, "email")}
          type="email"
          className="form-input"
          placeholder="Enter Email Id"
        />
        {(step === 2 || step === 3) && (
          <input
            value={inputField.otp}
            disabled={step !== 2}
            onChange={(e) => handleOnChange(e, "otp")}
            type="text"
            className="form-input"
            placeholder="Enter OTP"
          />
        )}
        {step == 3 && (
          <input
            value={inputField.newPassword}
            onChange={(e) => handleOnChange(e, "newPassword")}
            type="password"
            className="form-input"
            placeholder="New Password"
          />
        )}

        <div className="form-btn forgot-password-btn" onClick={handleForgotBtn}>
          {buttonText}
        </div>
        <div
          className="form-btn forgot-password-btn"
          onClick={() => props.closeModal()}
        >
          Cancel
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotModal;
