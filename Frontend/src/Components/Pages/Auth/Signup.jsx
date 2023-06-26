import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../Centimeter/Button/Button";
import Input from "../../Centimeter/Input/Input";
import AuthService from "../../Service/AuthService";
import { PATH_NAME } from "../../Configs/PathName";
import { toast } from "react-hot-toast";

export default function Signup() {
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        if (event.target.name === 'email') {
            setUsername(event.target.value.split("@")[0])
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!formData.email || formData.email.trim().length === 0) {
            setFormError((prevErrors) => ({ ...prevErrors, emailError: 'Email is required' }));
            return;
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            setFormError((prevErrors) => ({ ...prevErrors, emailError: 'Invalid email address' }));
            return;
        } else {
            setFormError({});
            formData.username = formData.email.split("@")[0];
        }

        if (!formData.password || formData.password.trim().length === 0) {
            setFormError((prevErrors) => ({ ...prevErrors, passwordError: 'Password is required' }));
            return;
        }else {
            setFormError({});
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError((prevErrors) => ({ ...prevErrors, confirmPasswordError: 'Passwords do not match', passwordError: '', }));
            return;
        } else {
            setFormError({});
        }

        if (!Object.keys(formError).length) {
            setFormData({ username: username });
            delete (formData.confirmPassword);
            handleSignUp(formData);
        }
    }
    const handleSignUp = async (regObj) => {
        const resReg = await AuthService.postSignup(regObj);
        const response = await resReg.json();

        if (resReg.status === 200) {
            toast.success('Successfully Sign Up')
            navigate(PATH_NAME.LOGIN);
            setFormData({});
            setFormError({});
        } else {
            toast.error(response.message);
        }

    };
    return (<>
        <div className='h-screen flex justify-content-between align-items-center'>
            <form className="input-container flex-column flex m-auto justify-content-center box-shadow-light">
                {/* <img alt='logo' src="../images/Tools.svg" height={'150px'}/> */}
                <h2 className="text-center line-in-text">Sign Up</h2>
                <div className="mb-3">
                    <Input title="Enter Your Email" name='email' onChange={handleChange} value={formData.email} />
                    {formError.emailError && <p className="text-red">{formError.emailError}</p>}
                </div>

                <div className="mb-3">
                    <Input title='Your Username' name="username" onChange={handleChange} value={username} disabled={true} />
                </div>

                <div className="mb-3">
                    <Input title='Enter Your Password' name="password" onChange={handleChange} value={formData.password} />
                    {formError.passwordError && <p className="text-red">{formError.passwordError}</p>}
                </div>

                <div className="mb-3">
                    <Input title='Confirm Password' name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
                    {formError.confirmPasswordError && <p className="text-red">{formError.confirmPasswordError}</p>}
                </div>

                <Button className="btn btn-black" type="submit" onClick={handleSubmit}>Submit</Button>

                <div className="text-center mt-2">
                    <Link className="underline" to='/'>← Back to Login</Link>
                </div>
            </form>
        </div>
    </>)
}