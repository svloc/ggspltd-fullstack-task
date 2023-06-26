import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "./auth.css";
import { setisLoggedIn, getisLoggedIn, setAccessToken } from "../../Storage/Storage";
import { PATH_NAME } from "../../Configs/PathName";
import LoginImg from "../../../Assets/Images/Tools.svg";
import Input from "../../Centimeter/Input/Input";
import Button from "../../Centimeter/Button/Button";
import AuthService from "../../Service/AuthService";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  useEffect(() => {
    if (getisLoggedIn()) {
      navigate(PATH_NAME.POST_LIST, { replace: true });
    }
  }, [getisLoggedIn()]);

  function handleSubmit(event) {
    event.preventDefault();
    setFormError({});
    if (!formData.username || formData.username.trim().length === 0) {
      setFormError({ ...formError, usernameError: "Username is required" });
      return;
    }
    if (!formData.password || formData.password.trim().length === 0) {
      setFormError({ ...formError, passwordError: "Password is required" });
      return;
    }
    if (!Object.keys(formError).length) {
      handleLogin(formData);
    }
  }
  const handleLogin = async (loginObj) => {
      const resLogin = await AuthService.postSignin(loginObj);
      const response = await resLogin.json();
      if (resLogin.status === 200) {
        setAccessToken(response.token);
        setisLoggedIn(true);
        toast.success('Successfully Login');
        navigate(PATH_NAME.POST_LIST, { replace: true });
        setFormData({});
        setFormError({});
      } else {
        toast.error(response.message);
      }
    
  };

  return (
    <div className="h-screen flex justify-content-between align-items-center">
      <form className="input-container flex-column flex m-auto justify-content-center box-shadow-light pt-0">
        <img alt="logo" src={LoginImg} height={"150px"} />
        <h2 className="text-center line-in-text">LOGIN</h2>
        <div className="mb-3">
          <Input title='Enter Your username' name="username" onChange={handleChange} value={formData.username} />
          {formError.usernameError && (<p className="text-red">{formError.usernameError}</p>)}
        </div>
        <div className="mb-3">
          <Input title='Enter Your Password' name="password" type='password' onChange={handleChange} value={formData.password} />
          {formError.passwordError && (<p className="text-red">{formError.passwordError}</p>)}
        </div>
        <Button onClick={handleSubmit} type="submit">Login</Button>
        <div className="line-in-text my-3 text-center">or</div> 
        <div className="text-center">don't have account{' '}
          <Link className="underline" to='/sign-up'>Sign Up →</Link>
        </div>
      </form>
    </div>
  );
}
