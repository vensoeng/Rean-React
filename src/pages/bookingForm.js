import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL, api } from '../utils/auth';

import WebLoader from '../components/common/WebLoader';
import './../assets/css/booking-form.css';
// import flag from './../assets/img/cambodia_flag.webp';
import { 
    ArrowLeft,
    SecurityUser,
    User,
    CallCalling,
    Message,
    Box,
    Cd,
    Happyemoji,
    Calendar,
} from 'iconsax-reactjs';

import Footer from '../components/layout/footer';
import NotFoundPage from './404';

export default function BookingForm() {
    const { id } = useParams(); 
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        x_user_name: '',
        x_company_name: '',
        x_phone: '',
        x_email: '',
        x_service_id: '',
        x_type_contact: 'កក់សេរវ៉ាកម្ម',
        x_date: '',
        x_des: ''
    });

    useEffect(() => {
        const fetchSingleService = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_URL}/services/${id}`);
                
                if (!res.ok) {
                    setService(null);
                    return;
                }
                const result = await res.json();
                if (result && result.success && result.data) {
                    const actualData = result.data;
                    setService(actualData);
                    setFormData(prev => ({ ...prev, x_service_id: actualData.id }));
                } else {
                    setService(null);
                }
            } catch (err) {
                console.error("Error fetching service or HTML:", err);
                setService(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchSingleService();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const payload = {
                ...formData,
            };

            const url = `http://localhost:5000/booking`;

            const res = await api.post(url, payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.status === 200 || res.status === 201) {
                alert("ការកក់សេវ៉ាកម្មរបស់អ្នកបានជោគជ័យ! យើងនឹងធ្វើការទំនាក់ទំនងទៅកាន់អ្នកឱ្យបានឆាប់តាមដែលអាចធ្វើបាន។ អរគុណច្រើនសម្រាប់ការជ្រើសរើសសេវ៉ាកម្មរបស់យើង🙏។");
                setFormData({
                    x_user_name: '',
                    x_company_name: '',
                    x_phone: '',
                    x_email: '',
                    x_service_id: '',
                    x_type_contact: 'កក់សេរវ៉ាកម្ម',
                    x_date: '',
                    x_des: ''
                });
            }
        } catch (err) {
            console.error("🔴 Backend Error Response:", err.response?.data);
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const firstKey = Object.keys(errors)[0];
                alert(`ទិន្នន័យមិនត្រឹមត្រូវ [${firstKey}]: ${errors[firstKey]}`);
            } else {
                const errorMsg = err.response?.data?.message || "មិនអាចរក្សាទុកបានទេ";
                alert("មានបញ្ហា៖ " + errorMsg);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBack = () => {
        window.history.back();
    };

    if (loading) {
        return (
            <nav className="db-c wkf-n">
                <div className="box df-s">
                    <div className="row df-l">
                        <div className="icon icon-ra icon-sm" onClick={handleBack}>
                            <ArrowLeft />
                        </div>
                    </div>
                    <div className="row">
                        <h1>កក់សេវ៉ាកម្ម</h1>
                    </div>
                    <div className="row">
                        <a href="http://facebook.com/vensoeng" className="icon icon-ra icon-sm">
                            <svg viewBox="0 0 24 24" fill="none">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#1C274C"></path>
                                    <path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" fill="white"></path>
                                    <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="white"></path>
                                    <path d="M7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12Z" fill="white"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <WebLoader />
            </nav>
        );
    }

    if (!service || service.status === false || service.status === 'false' || Number(service.status) === 0) {
        return <NotFoundPage />;
    }

    return (
        <div className="bok-form">
            <div className="wbkm-box">
                {/* Header Nav */}
                <nav className="db-c wkf-n">
                    <div className="box df-s">
                        <div className="row df-l">
                            <div className="icon icon-ra icon-sm" onClick={handleBack}>
                                <ArrowLeft />
                            </div>
                        </div>
                        <div className="row">
                            <h1>កក់សេវ៉ាកម្ម</h1>
                        </div>
                        <div className="row">
                            <a href="http://facebook.com/vensoeng" className="icon icon-ra icon-sm">
                                <svg viewBox="0 0 24 24" fill="none">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#1C274C"></path>
                                        <path d="M15 12C15 12.5523 15.4477 13 16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12Z" fill="white"></path>
                                        <path d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z" fill="white"></path>
                                        <path d="M7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12Z" fill="white"></path>
                                    </g>
                                </svg>
                            </a>
                        </div>
                    </div>
                </nav>

                {submitting && (
                    <WebLoader>កំពុងរក្សាទុកទិន្នន័យ សូមរង់ចាំបន្តិច...</WebLoader>
                )}

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="wbkm-c">
                    <div className="box">
                        {/* User Information */}
                        <div className="head df-l">
                            <div className="icon icon-sm icon-ra">
                                <SecurityUser />
                            </div>
                            <h2>ព័ត៌មានទំនាក់ទំនង</h2>
                        </div>
                        <div className="infor">
                            <ul className="if-box">
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_user_name">*ឈ្មោះរបស់អ្នក</label>
                                        <div className="db-c">
                                            <User />
                                            <input 
                                                type="text" 
                                                id="x_user_name"
                                                name="x_user_name" 
                                                value={formData.x_user_name}
                                                onChange={handleChange} 
                                                placeholder="Ex: Vensoeng" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_phone">*លេខទូរស័ព្ទ</label>
                                        <div className="db-c">
                                            <CallCalling />
                                            <input 
                                                type="text" 
                                                id="x_phone"
                                                name="x_phone" 
                                                value={formData.x_phone}
                                                onChange={handleChange} 
                                                placeholder="000-000-000" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_email">*គណនីអ៊ីម៉ែល</label>
                                        <div className="db-c">
                                            <Message />
                                            <input 
                                                type="email" 
                                                id="x_email"
                                                name="x_email" 
                                                value={formData.x_email}
                                                onChange={handleChange} 
                                                placeholder="example@gmail.com" 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Service Information */}
                        <div className="head df-l">
                            <div className="icon icon-sm icon-ra">
                                <Box />
                            </div>
                            <h2>ព័ត៌មានសេវ៉ាកម្ម</h2>
                        </div>
                        <div className="ifs">
                            <ul className="ifs-box">
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_service_id">ឈ្មោះសេវ៉ាកម្ម</label>
                                        <div className="db-c">
                                            <Box />
                                            <select disabled name="x_service_id" value={service?.id || ''}>
                                                <option value={service?.id}>{service?.title_kh}</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_type_contact">*ប្រភេទទាក់ទង</label>
                                        <div className="db-c">
                                            <Cd/>
                                            <select 
                                                name="x_type_contact" 
                                                value={formData.x_type_contact} 
                                                onChange={handleChange}
                                            >
                                                <option value="កក់សេរវ៉ាកម្ម">កក់សេរវ៉ាកម្ម</option>
                                                <option value="ពិភាក្សាសេវ៉ាកម្ម">ពិភាក្សាសេវ៉ាកម្ម</option>
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_company_name">ឈ្មោះក្រុមហ៊ុនរបស់អ្នក</label>
                                        <div className="db-c">
                                            <Happyemoji />
                                            <input 
                                                type="text" 
                                                id="x_company_name"
                                                name="x_company_name" 
                                                value={formData.x_company_name}
                                                onChange={handleChange} 
                                                placeholder="Ex: XYZ" 
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_date">ជ្រើសរើសកាលបរិច្ឆេទចង់ណាត់ជួប</label>
                                        <div className="db-c">
                                            <Calendar />
                                            <input 
                                                type="date" 
                                                id="x_date"
                                                name="x_date" 
                                                value={formData.x_date}
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="li-box">
                                        <label htmlFor="x_des">ពិពណ៌នាបន្ថែម</label>
                                        <div className="db-c">
                                            <textarea 
                                                id="x_des"
                                                name="x_des" 
                                                value={formData.x_des}
                                                onChange={handleChange} 
                                            ></textarea>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* footer  */}
                    <div className="foot">
                        <div className="fbox">
                            <button className="btn" type="submit" disabled={submitting}>
                                {submitting ? "កំពុងបញ្ជូន..." : "បញ្ចូន"}
                            </button>
                        </div>
                    </div> 
                </form>
            </div>
            
            <Footer />
        </div>
    );
}