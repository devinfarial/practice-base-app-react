import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useState, useRef } from 'react';
import { register } from '../actions/auth';

export default function SignupPage() {
    const toastRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message } = useSelector(state => state.message);


    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: ""
    })

    const handleSignup = (e) => {
        e.preventDefault();

        dispatch(register(formData.username, formData.email, formData.password))
            .then(() => {
                toastRef.current.show({ severity: 'success', summary: 'Success Message', detail: 'Registration Success. Check your email.', life: 3000 });
                navigate("/auth/signin");
            })
            .catch(() => {
                toastRef.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
            });
    }

    return (
        <div className="flex justify-center w-full py-10">

            <Toast position='top-center' ref={toastRef} />

            <div className="flex flex-col lg:w-1/4 mx-auto sm:w-full">
                <div className="flex flex-col text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                    <span className="text-600 font-medium line-height-3">Already have have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate("/auth/signin")}>Sign in now!</a>
                </div>

                <form onSubmit={handleSignup}>
                    <InputText placeholder='Username' id="username" type="text" className="w-full mb-3"
                        value={formData.username}
                        onChange={e => setFormData(_c => ({ ..._c, username: e.target.value }))} />

                    <InputText placeholder='Email' id="email" type="email" className="w-full mb-3"
                        value={formData.email}
                        onChange={e => setFormData(_c => ({ ..._c, email: e.target.value }))} />

                    <InputText type='password' placeholder='Password' id="password" className="w-full mb-3"
                        value={formData.password}
                        onChange={e => setFormData(_c => ({ ..._c, password: e.target.value }))} />

                    <InputText type='password' placeholder='Confirm Pasword' id="confirmPassword" className="w-full mb-3"
                        value={formData.confirmPassword}
                        onChange={e => setFormData(_c => ({ ..._c, confirmPassword: e.target.value }))} />

                    <Button disabled={formData.confirmPassword !== formData.password} label="Sign up" icon="pi pi-user" className="w-full" />
                </form>
            </div>
        </div>
    )
}