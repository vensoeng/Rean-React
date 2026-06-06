import { useState, useEffect } from 'react';
import {API_URL, STORAGE,  getAuthUser } from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import { Add, Magicpen, VideoOctagon, Designtools, Gift, Dropbox} from 'iconsax-reactjs';

import '../../assets/css/form.css';
import imgTest from '../../assets/img/alien.jpg';
import ImgAppAvatar from '../../assets/img/logo192.png';

export default function Form({title = 'ទម្រង់ព្រឹត្តិការណ៍', titleBtn = 'បង្កើតព្រឹត្តិការណ៍', body = ''}) {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const authUser = getAuthUser();
        setUser(authUser);
    }, []);

    const firstName = user?.firstName || 'Alien';
    const lastName = user?.lastName || '';
    const displayUserName = user?.username || user?.email || '@aliencallyou';
    const avatarSrc = user?.pr_img || imgTest;

    return (
        <form method="POST" encType="multipart/form-data">
            <div className="web-form web-form-active">
                <div className="web-form-body">
                    {/* this is form header  */}
                    <div className="head df-s">
                        <a className="df-l">
                            <span className="icon icon-ra icon-ra-sm over-h">
                                <img className="img-c"
                                src={ImgAppAvatar}
                                loading="lazy" 
                                decoding="async"
                                fetchPriority="high"
                                effect="blur"
                                alt="favicon" />
                            </span>
                        </a>
                        <a><span>{title}</span></a>
                        <div className="icon-ra icon-sm df-c"  onClick={(e) => { document.querySelector('.web-form').classList.toggle('web-form-active'); }}>
                            <Add style={{ transform: 'rotate(45deg)' }} />
                        </div>
                    </div>
                    {/* content of form  */}
                    <div className="con db-c">
                        <div className="con-body db-c">
                            {/* this is form head */}
                            <div className="form-head">
                                <ul className="df-s">
                                    {/* profile */}
                                    <li className="profile-user df-l">
                                        <div className="profile-img df-c icon icon-ra icon-ra-sm">
                                            <img 
                                                className="img-c"
                                                loading="lazy"
                                                src={API_URL + STORAGE + avatarSrc}
                                                alt="icon"
                                            />
                                        </div>
                                        <div className="profile-name left-05">
                                            <h2>{firstName + ' ' + lastName}</h2>
                                            <p className="taget_date">@{displayUserName}</p>
                                        </div>
                                    </li>
                                    {/* status  */}
                                    <li>
                                        <div className="status df-c">
                                            <select name="status">
                                                <option value="1">សាធារណៈ</option>
                                                <option value="0">ឯកជនភាព</option>
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* this is form content  */}
                            <div className="main scroll-y">
                                {/* this is form content */}
                                {body}
                            </div>
                            {/* this is form footer   */}
                            <div className="foot">
                                <div className="foot-body df-s">
                                    <h2>ជ្រើសរើសលខ្ខណៈបង្កើត</h2>
                                    <ul className="df-c">
                                        <NavLink to="/admin/blogs">
                                           <li className="icon icon-ra-sm text-be" style={{ '--text-': "'ផ្សព្វផ្សាយ'" }}><Magicpen /></li>
                                        </NavLink>
                                        <NavLink to="/admin/articles">
                                            <li className="icon icon-ra-sm text-be" style={{ '--text-': "'មាតិកា'" }}><VideoOctagon /></li>
                                        </NavLink>
                                        <NavLink to="/admin/design">
                                            <li className="icon icon-ra-sm text-be" style={{ '--text-': "'ការរចនា'" }}><Designtools /></li>
                                        </NavLink>
                                        <NavLink to="/admin/services">
                                            <li className="icon icon-ra-sm text-be" style={{ '--text-': "'សេវាកម្ម'" }}> <Dropbox /></li>
                                        </NavLink>
                                        <NavLink to="/admin/offers">
                                            <li className="icon icon-ra-sm text-be" style={{ '--text-': "'ការផ្ដល់ជូន'" }}><Gift /></li>
                                        </NavLink>
                                    </ul>
                                </div>
                            </div>
                            {/* ------------- */}
                        </div>
                    </div>
                    {/* this is form footer  */}
                    <div className="submit-form">
                        <div className="box df-c">
                            <button className="btn icon-ra">{titleBtn}</button>
                        </div>
                    </div>
                    {/* ------------------ */}
                </div>
                {/* this is from bg */}
                <div className="form-b"></div>
            </div>
        </form>
    );
}