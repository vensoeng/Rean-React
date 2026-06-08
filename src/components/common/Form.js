import { useState, useEffect } from 'react';
import { API_URL, STORAGE, getAuthUser } from '../../utils/auth';
import { NavLink } from 'react-router-dom';
import { Add, Magicpen, VideoOctagon, Designtools, Gift, Dropbox } from 'iconsax-reactjs';
import '../../assets/css/form.css';
import imgTest from '../../assets/img/alien.jpg';
import ImgAppAvatar from '../../assets/img/logo192.png';

export default function Form({ 
    title = 'ទម្រង់ព្រឹត្តិការណ៍', 
    titleBtn = 'រក្សាទុក', 
    body = '', 
    onSubmit, 
    isEdit = false,
    onClose,
    statusValue = 'false',
    onStatusChange
}) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authUser = getAuthUser();
        setUser(authUser);
    }, []);

    const firstName = user?.firstName || 'Alien';
    const lastName = user?.lastName || '';
    const displayUserName = user?.username || user?.email || '@aliencallyou';
    const avatarSrc = user?.pr_img ? `${API_URL}${STORAGE}${user.pr_img}` : imgTest;

    // មុខងារបិទផ្ទាំង Form
    const handleCloseForm = () => {
        document.querySelector('.web-form').classList.remove('web-form-active');
        if (onClose) onClose();
    };

    return (
        <form onSubmit={onSubmit} method="POST" encType="multipart/form-data">
            <div className="web-form">
                <div className="web-form-body">
                    {/* Form Header */}
                    <div className="head df-s">
                        <div className="h-row df-l">
                            <span className="icon icon-ra icon-ra-sm over-h">
                                <img className="img-c" src={ImgAppAvatar} loading="lazy" alt="favicon" />
                            </span>
                        </div>
                        <div className='h-row-title'>
                            <span>{isEdit ? `កែប្រែ${title}` : `បញ្ចូល${title}`}</span>
                        </div>
                        <div className="icon-ra icon-sm df-c" onClick={handleCloseForm} style={{ cursor: 'pointer' }}>
                            <Add style={{ transform: 'rotate(45deg)' }} />
                        </div>
                    </div>

                    {/* Content of Form */}
                    <div className="con db-c">
                        <div className="con-body db-c">
                            <div className="form-head">
                                <ul className="df-s">
                                    <li className="profile-user df-l">
                                        <div className="profile-img df-c icon icon-ra icon-ra-sm">
                                            <img className="img-c" loading="lazy" src={avatarSrc} alt="icon" />
                                        </div>
                                        <div className="profile-name left-05">
                                            <h2>{firstName + ' ' + lastName}</h2>
                                            <p className="taget_date">@{displayUserName}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="status df-c">
                                            {/* 🟢 កែសម្រួលត្រង់នេះ៖ ភ្ជាប់តម្លៃទៅកាន់ State របស់ Component មេ */}
                                            <select 
                                                name="status" 
                                                id="form-status-select"
                                                value={String(statusValue)} 
                                                onChange={onStatusChange}
                                            >
                                                <option value="true">សាធារណៈ</option>
                                                <option value="false">ឯកជនភាព</option>
                                            </select>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="main scroll-y">
                                {body}
                            </div>

                            {/* Form Footer (លាក់ Navbar នេះបើកំពុងស្ថិតក្នុងរបៀប Edit) */}
                            {!isEdit && (
                                <div className="foot">
                                    <div className="foot-body df-s">
                                        <h2>ជ្រើសរើសលក្ខណៈបង្កើត</h2>
                                        <ul className="df-c">
                                            <NavLink to="/admin/blogs"><li className="icon icon-ra-sm text-be" style={{ '--text-': "'ផ្សព្វផ្សាយ'" }}><Magicpen /></li></NavLink>
                                            <NavLink to="/admin/articles"><li className="icon icon-ra-sm text-be" style={{ '--text-': "'មាតិកា'" }}><VideoOctagon /></li></NavLink>
                                            <NavLink to="/admin/design"><li className="icon icon-ra-sm text-be" style={{ '--text-': "'ការរចនា'" }}><Designtools /></li></NavLink>
                                            <NavLink to="/admin/services"><li className="icon icon-ra-sm text-be" style={{ '--text-': "'សេវាកម្ម'" }}><Dropbox /></li></NavLink>
                                            <NavLink to="/admin/offers"><li className="icon icon-ra-sm text-be" style={{ '--text-': "'ការផ្ដល់ជូន'" }}><Gift /></li></NavLink>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="submit-form">
                        <div className="box df-c">
                            <button type="submit" className="btn icon-ra">
                                {isEdit ? `ធ្វើបច្ចុប្បន្នភាព` : titleBtn}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-b" onClick={handleCloseForm}></div>
            </div>
        </form>
    );
}