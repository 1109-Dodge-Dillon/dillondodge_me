import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contextProvider";

export default function Home()
{
    const {dates} = useStateContext();
    const [layout, setLayout] = useState({col: 'col-6', grid: 'btn btn-secondary active', agenda: 'btn btn-outline-secondary'});
    const [coupons, setCoupons] = useState([]);
    const [modalData, setModalData] = useState([]);

    useEffect(() =>
    {
        getCoupons();
    }, []);

    const changeLayout = () =>
    {
        if(layout.col === 'col-6')
        {
            setLayout({col: 'col-12', grid: 'btn btn-outline-secondary', agenda: 'btn btn-secondary active'});
        }
        else
        {
            setLayout({col: 'col-6', grid: 'btn btn-secondary active', agenda: 'btn btn-outline-secondary'});
        }
    }

    const getCoupons = () =>
    {
        axiosClient.get('/coupons')
            .then(({data}) =>
            {
                
                setCoupons(data.data);
            });
    }

    const getModalData = (id) =>
    {
        axiosClient.get(`/coupons/${id}`)
            .then(({data}) =>
            {
                setModalData(data);
            });
    }

    return (
        <div className="row g-3 p-3">
            <div>
                <h2>Your Coupons</h2>
                <p>Keep track and manage vinyls</p>
            </div>
            <div className="d-flex justify-content-between align-items-end mt-0">
                <img src="/RECORD_PLAYER.svg" alt="Record Player" width="200" height="175" />
                <div className="btn-group">
                    <button className={layout.grid} aria-current="page" onClick={changeLayout}>
                        <span className="material-symbols-rounded align-bottom">
                            grid_view
                        </span>
                    </button>
                    <button className={layout.agenda} onClick={changeLayout}>
                        <span className="material-symbols-rounded align-bottom">
                            view_agenda
                        </span>
                    </button>
                </div>
            </div>
            {coupons.map(c =>
                (
                    <div key={c.coupon_id} className={layout.col}>
                        <div className="card">
                            <img src="/VINYL_WITH_COVER.svg" className="card-img-top" alt="vinyl with cover" />
                            <div className="card-body">
                                <h5 className="card-title">{c.month}</h5>
                                <p className="card-text">Coupon #: {c.coupon_id}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                {!c.claimed && <Link to={"/vrc/" + c.coupon_id} className="btn btn-secondary">Claim!</Link>}
                                {c.claimed && <Link to={"/vrc/" + c.coupon_id} className="btn btn-secondary disabled">Claimed</Link>}
                                <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#couponModal" onClick={() => getModalData(c.coupon_id)}>View</button>
                            </div>
                        </div>
                    </div>
                ))}
            <div className="modal fade" id="couponModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{modalData.month}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h5 className="mb-3">Coupon Info</h5>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="couponId" placeholder="Coupon Id" value={modalData.coupon_id ? modalData.coupon_id : ""} disabled />
                                <label htmlFor="coupinId">Coupin Id</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="date" className="form-control" id="dateClaimed" placeholder="Date Claimed" value={modalData.dateClaimed ? modalData.dateClaimed : ""} disabled />
                                <label htmlFor="dateClaimed">Date Claimed</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="album" placeholder="Album" value={modalData.album ? modalData.album : ""} disabled />
                                <label htmlFor="album">Album</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="artist" placeholder="Artist" value={modalData.artist ? modalData.artist : ""} disabled />
                                <label htmlFor="artist">Artist</label>
                            </div>
                            <div className="form-floating mb-2">
                                <input type="text" className="form-control" id="pressing" placeholder="Pressing" value={modalData.pressing ? modalData.pressing : ""} disabled />
                                <label htmlFor="pressing">Pressing</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="link" placeholder="Web Link" value={modalData.link ? modalData.link : ""} disabled />
                                <label htmlFor="link">Web Link</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}