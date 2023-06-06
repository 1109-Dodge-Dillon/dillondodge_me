import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from "../axios-client";
import { useStateContext } from "../contextProvider";

export default function Coupon()
{
    const {id} = useParams();
    const navigate = useNavigate();
    const [claimable, setClaimable] = useState(true);
    const {dates} = useStateContext();
    const [coupon, setCoupon] = useState([]);

    if(id)
    {
        useEffect(() =>
        {
            axiosClient.get(`/coupons/${id}`)
                .then(({data}) =>
                {
                    let today = new Date();
                
                    const coupon_month = dates.dates.find((d) => d.month === data.month);

                    if(coupon_month.code > today.getMonth() || coupon_month.year > today.getFullYear())
                    {
                        setClaimable(false);
                    }
                    
                    setCoupon(data);
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
                            console.log(response.data.message);
                        }
                    }
                });
        }, []);
    }

    const goBack = () =>
    {
        navigate(-1);
    }

    const onSubmit = (e) =>
    {
        e.preventDefault();

        axiosClient.put(`/coupons/${id}`, coupon)
            .then(() =>
            {
                navigate('/');
            })
    }

    return (
        <div className="p-5">
            <span className="material-symbols-rounded mb-4" style={{cursor: 'pointer'}} onClick={goBack}>
                arrow_back
            </span>
            <h2 className="mb-4">{coupon.month} Coupon</h2>
            {!claimable && <div className="mb-3">This coupon can't be claimed yet! Please wait until {coupon.month} to claim it.</div>}
            {coupon.claimed && <div className="mb-3">You've already used your coupon for this month!</div>}
            
            {!coupon.claimed && claimable && <form onSubmit={onSubmit}>
                <h5 className="mb-3">Enter your Coupon Info</h5>
                <div className="form-floating mb-2">
                    <input type="text" className="form-control" id="couponId" placeholder="Coupon Id" value={coupon.coupon_id ? coupon.coupon_id : ""} disabled />
                    <label htmlFor="couponId">Coupon Id</label>
                </div>
                <div className="form-floating mb-2">
                    <input onChange={e => setCoupon({...coupon, date_claimed: e.target.value})} type="date" className="form-control" id="dateClaimed" placeholder="Date Claimed" />
                    <label htmlFor="dateClaimed">Date Claimed</label>
                </div>
                <div className="form-floating mb-2">
                    <input onChange={e => setCoupon({...coupon, album: e.target.value})} type="text" className="form-control" id="album" placeholder="Album" value={coupon.album ? coupon.album : ""} />
                    <label htmlFor="album">Album</label>
                </div>
                <div className="form-floating mb-2">
                    <input onChange={e => setCoupon({...coupon, artist: e.target.value})} type="text" className="form-control" id="artist" placeholder="Artist" value={coupon.artist ? coupon.artist : ""} />
                    <label htmlFor="artist">Artist</label>
                </div>
                <div className="form-floating mb-2">
                    <select onChange={e => setCoupon({...coupon, pressing: e.target.value})} className="form-select" id="pressing" aria-label="Floating label select example" value={coupon.pressing ? coupon.pressing : ""}>
                        <option value="Target">Target</option>
                        <option value="Walmart">Walmart</option>
                        <option value="Urban Outfitters">Urban Outfitters</option>
                        <option value="Store Exclusive">Store Exclusive</option>
                        <option value="Other">Other</option>
                    </select>
                    <label htmlFor="pressing">Pressing</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={e => setCoupon({...coupon, web_link: e.target.value})} type="text" className="form-control" id="webLink" placeholder="Web Link" value={coupon.web_link ? coupon.web_link : ""} />
                    <label htmlFor="webLink">Web Link</label>
                </div>
                <div className="d-grid gap-2 col-8 mx-auto">
                    <button onChange={e => setCoupon({...coupon, claimed: true})} type="submit" className="btn btn-secondary mb-3">Claim Coupon</button>
                </div>
            </form>}
        </div>
    )
}