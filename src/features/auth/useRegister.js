import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import CustomSuccessToast from "../../components/ui/Toast";
import { MESSAGES } from "../../constants/messages";
import { registerUser } from "../../services/authAPI";

export function useRegister() {
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess(MESSAGES.SIGNUP.SUCCESS);
      toast(
        <CustomSuccessToast
          title="Thành công"
          message={MESSAGES.SIGNUP.SUCCESS}
        />,
        {
          position: "top-right",
          autoClose: 1800,
          transition: Slide,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          hideProgressBar: true,
          style: {
            minWidth: 320,
            borderRadius: 12,
            boxShadow: "0 2px 12px #0001",
          },
        },
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || MESSAGES.SIGNUP.FAIL);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    error,
    success,
    loading,
    handleChange,
    handleSubmit,
    setSuccess,
    setError,
  };
}
