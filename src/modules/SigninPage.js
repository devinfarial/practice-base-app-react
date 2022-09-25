import { Button } from 'primereact/button'
import { Checkbox } from 'primereact/checkbox'
import { InputText } from 'primereact/inputtext'
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { login } from '../actions/auth';
import Form from "react-validation/build/form";

const SigninPage = (props) => {
    const form = useRef();
    const navigate = useNavigate()

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        form.current.validateAll();


        dispatch(login(username, password))
            .then(() => {
                props.history.push("/home");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });

    };

    if (isLoggedIn) {
        return <Navigate to="/home" />;
    }


    return (
        <div className="flex justify-center w-full py-10">
            <div className="flex flex-col lg:w-1/4 mx-auto sm:w-full">
                <div className="flex flex-col text-center mb-5">
                    <div className="text-900 text-3xl font-medium mb-3">Welcome</div>
                    <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                    <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={() => navigate("/auth/signup")}>Create today!</a>
                </div>

                <Form onSubmit={handleLogin} ref={form}>

                    <InputText className="mb-3 w-full"
                        onChange={onChangeUsername}
                        value={username}
                        placeholder="Username" />
                    <InputText className="mt-3 w-full"
                        type='password'
                        onChange={onChangePassword}
                        value={password}
                        placeholder="Password" />

                

                    <Button label="Sign In" icon="pi pi-user" className="w-full" />
                </Form>
            </div>
        </div>
    )
}

export default SigninPage;