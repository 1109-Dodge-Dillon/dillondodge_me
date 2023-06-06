import { Link } from "react-router-dom";

export default function NotFound()
{
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
                            <h2>404 - Lost in Space</h2>
                            <p>Looks like you got lost, let's get you back home!</p>
                        </div>
                        <div className="card-footer d-flex justify-content-center">
                            <Link to="/" className="btn btn-secondary">Go Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}