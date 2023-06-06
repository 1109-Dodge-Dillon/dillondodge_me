import { useState } from "react"
import axiosClient from "../axios-client";
import { useStateContext } from "../contextProvider";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login()
{
    const {setUser, setToken} = useStateContext();
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const [params] = useSearchParams();
    let redirect = params.get('redirectTo');

    const onSubmit = (e) =>
    {
        e.preventDefault();

        const payload = {
            email: 'samcneece@gmail.com',
            password: 'Tedford13!'
        }

        setErrors(null);

        axiosClient.post('/login', payload)
            .then(({data}) =>
            {
                setUser(data.user.name);
                setToken(data.token);
                navigate(redirect == null ? "/" : redirect);
            })
            .catch(err =>
            {
                const response = err.response;

                if(response && response.status === 422)
                {
                    if(response.data.errors)
                    {
                        console.log(response.data.errors);
                    }
                    else
                    {
                        setErrors(
                            response.data.message
                        );
                    }
                }
            });
    }

    return (
        <div className="row min-vh-100">
            <div className="col-12">
                <div className="d-flex min-vh-100 p-4 flex-fill align-items-center">
                    <div className="card w-100">
                        <div className="card-header">
                            <img src="/VRC_LOGO_text-dark.svg" alt="LOGO" width="150" height="50" />
                        </div>
                        <video className="mx-auto" width={300} height={300} autoPlay="autoplay" muted playsInline preload="auto">
                            <source src={'/VRC_LOGIN.mp4'} />
                        </video>
                        <div className="card-body">
                        {errors && <div className="alert alert-warning" role="alert">
                            {errors}
                        </div>}
                        </div>
                        <div className="card-footer d-flex justify-content-center">
                            <button type="button" className="btn btn-secondary" onClick={onSubmit}>Continue as Steven</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}