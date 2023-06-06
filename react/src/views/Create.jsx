import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import axiosClient from "../axios-client";

export default function Create()
{
    const navigate = useNavigate();
    const couponId = useRef();
    const month = useRef();
    const dateClaimed = useRef();
    const album = useRef();
    const artist = useRef();
    const pressing = useRef();
    const webLink = useRef();
    const claimed = useRef();

    const onSubmit = (e) =>
    {
        e.preventDefault();

        const payload = {
            coupon_id: couponId.current.value,
            month: month.current.value,
            album: album.current.value,
            artist: artist.current.value,
            pressing: pressing.current.value,
            web_link: webLink.current.value,
            date_claimed: dateClaimed.current.value,
            claimed: claimed.current.value
        };

        axiosClient.post('/coupons', payload)
            .then(() =>
            {
                navigate('/vrc/create');
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
    }

    return (
        <div className="p-5">
            <h2 className="mb-4">Create Coupon</h2>
            
            <form onSubmit={onSubmit}>
                <h5 className="mb-3">Enter your Coupon Info</h5>
                <div className="form-floating mb-2">
                    <input ref={couponId} type="text" className="form-control" id="couponId" placeholder="Coupon Id" />
                    <label htmlFor="couponId">Coupon Id</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={month} type="text" className="form-control" id="month" placeholder="Month" />
                    <label htmlFor="month">Month</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={album} type="text" className="form-control" id="album" placeholder="Album" />
                    <label htmlFor="album">Album</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={artist} type="text" className="form-control" id="artist" placeholder="Artist" />
                    <label htmlFor="artist">Artist</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={pressing} type="text" className="form-control" id="pressing" placeholder="pressing" />
                    <label htmlFor="pressing">Pressing</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={webLink} type="text" className="form-control" id="webLink" placeholder="Web Link" />
                    <label htmlFor="webLink">Web Link</label>
                </div>
                <div className="form-floating mb-2">
                    <input ref={dateClaimed} type="date" className="form-control" id="dateClaimed" placeholder="Date Claimed" />
                    <label htmlFor="dateClaimed">Date Claimed</label>
                </div>
                <div className="form-check mb-3">
                    <input ref={claimed} type="checkbox" className="form-check-input" value="" id="claimed" />
                    <label className="form-check-label" htmlFor="claimed">
                        Claimed
                    </label>
                </div>
                <div className="d-grid gap-2 col-8 mx-auto">
                    <button type="submit" className="btn btn-secondary mb-3">Create Coupon</button>
                </div>
            </form>
        </div>
    )
}