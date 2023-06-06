import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../contextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout()
{
    const {user, token, dates} = useStateContext();
    const [next, setNext] = useState('');
    const [coupon, setCoupon] = useState({});
    const prevLocation = useLocation();
    const navigate = useNavigate();

    useEffect(() =>
    {
        let today = new Date();
        let coupon_month = dates.dates.find((d) => d.code === (today.getMonth()+1));

        axiosClient.get('/coupons')
            .then(({data}) =>
            {
                let coupon = data.data.find((d) => d.month === coupon_month.month);

                if(coupon.claimed || coupon_month.year > today.getFullYear())
                {
                    setNext('disabled');
                    setCoupon(coupon);
                }
            });

    }, []);

    if(!token)
    {
        useEffect(() =>
        {
            navigate(`/login?redirectTo=${prevLocation.pathname}`);
        }, []);
    }

    return (
        <div className="position-absolute top-0 bottom-0 start-0 end-0">
            <nav className="navbar bg-light navbar-expand-lg position-sticky top-0" style={{zIndex: `1000`, minHeight: `10vh`}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="/VRC_LOGO_text-dark.svg" alt="LOGO" width="150" height="50" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Hi {user}!</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/vrc/${coupon.coupon_id}`} className={"nav-link " + next}>Next Coupon</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main className="bg-light" style={{minHeight: `85vh`, backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.05))`}}>
                <Outlet />
            </main>
            <footer className="text-center bg-light" style={{minHeight: `5vh`, backgroundImage: `linear-gradient(to bottom right, rgba(0,0,0,0.05), rgba(0,0,0,0.05))`}}>
                <p style={{fontSize: `12px`}}>VRC & CO &copy; 2023</p>
            </footer>
        </div>
    )
}