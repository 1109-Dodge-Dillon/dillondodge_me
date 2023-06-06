import { useRef } from "react"
import axiosClient from "../axios-client";
import { useStateContext } from "../contextProvider";

export default function Signup()
{
    const {setUser, setToken} = useStateContext();
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirmation = useRef();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        const payload = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value,
            password_confirmation: passwordConfirmation.current.value
        }

        axiosClient.post('/signup', payload)
            .then(({data}) =>
            {
                setUser(data.user);
                setToken(data.token);
            })
            .catch(err =>
            {
                const response = err.response;

                console.log(response.data.message);
            });
    }

    return (
        <div className="p-5">
            <h2 className="mb-4">Create Account</h2>
            <form onSubmit={onSubmit}>
                <h5 className="mb-3">Enter your Account Info</h5>
                <div className="form-floating mb-2">
                    <input ref={name} type="text" className="form-control" id="name" placeholder="Name" />
                    <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={email} type="email" className="form-control" id="email" placeholder="Email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={password} type="password" className="form-control" id="password" placeholder="Password" />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={passwordConfirmation} type="password" className="form-control" id="passwordConfirmation" placeholder="Password Confirmation" />
                    <label htmlFor="passwordConfirmation">Password Confirmation</label>
                </div>
                <div className="d-grid gap-2 col-8 mx-auto">
                    <button type="submit" className="btn btn-secondary mb-3">Create Account</button>
                </div>
            </form>
        </div>
    )
}