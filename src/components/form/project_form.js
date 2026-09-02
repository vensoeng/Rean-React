import { useState, useEffect } from 'react';
import Form from '../common/Form';
import { API_URL, STORAGE, api } from '../../utils/auth'; 
import imgTest from '../../assets/img/alien.jpg';
import WebLoader from '../common/WebLoader';

export default function FormProject({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        status: true,
        service_id: '1',
        title: '',
        des: '',
        link: '',
        ifram: '',
        tags: '',
    });

    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgTest);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                des: editData.des || '',
                link: editData.link || '',
                ifram: editData.ifram || '',
                service_id: String(editData.service_id ?? '1'),
                tags: editData.tags || '',
                status: editData.status === true || editData.status === 'true' || editData.status === '1' || editData.status === 1
            });

            if (editData.img) {
                setPreviewUrl(`${API_URL + STORAGE}${editData.img}`);
            } else {
                setPreviewUrl(imgTest);
            }
        } else {
            setFormData({
                status: true,
                title: '',
                des: '',
                link: '',
                ifram: '',
                service_id: '1',
                tags: '',
            });
            setPreviewUrl(imgTest);
        }
        setImgFile(null);
    }, [editData]);

    // this is for fetch data service 
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services?status=true');
                if (res.status === 200) {
                    const servicesList = res.data.data || res.data.services || [];
                    setServices(servicesList);
                }
            } catch (err) {
                console.error("🔴 Error fetching services:", err);
            }
        };

        fetchServices();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const data = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (key === 'status') {
                    data.append('status', formData.status ? 'true' : 'false');
                } else {
                    data.append(key, formData[key]);
                }
            });

            if (imgFile) data.append('img', imgFile);

            const url = editData ? `/projects/${editData.id}` : '/projects';
            const method = editData ? 'put' : 'post';

            const res = await api[method](url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                alert(editData ? "កែប្រែគម្រោងបង្ហាញជោគជ័យ!" : "បង្កើតគម្រោងបង្ហាញជោគជ័យ!");

                document.querySelector('.web-form')?.classList.remove('web-form-active');

                if (onSaveSuccess) {
                    const responseData = res.data.data || res.data; 
                    onSaveSuccess(responseData, editData ? 'update' : 'create');
                }
            }
        } catch (err) {
            console.error("🔴 Backend Error Response:", err.response?.data);
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = err.response.data.errors;
                const firstKey = Object.keys(errors)[0];
                alert(`ទិន្នន័យមិនត្រឹមត្រូវ [${firstKey}]: ${errors[firstKey]}`);
            } else {
                const errorMsg = err.response?.data?.message || "មិនអាចរក្សាទុកបានទេ";
                alert("មានបញ្ហា៖ " + errorMsg);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {isSubmitting && (
                <WebLoader>កំពុងរក្សាទុកទិន្នន័យ សូមរង់ចាំបន្តិច...</WebLoader>
            )}
            <Form 
                title="គម្រោងបង្ហាញ​" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} 
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>
                        
                        {/* 1. Category Dropdown - FIXED name="service_id" */}
                        <div className="txt-select">
                            <ul>
                                <li>
                                    <label htmlFor="service_id">ប្រភេទការរចនា</label>
                                    <div className="txt-select-list-con df-c">
                                        <select id="service_id" name="service_id" value={formData.service_id} onChange={handleChange} required>
                                            
                                            {services.length === 0 ? (
                                                <option value="">កំពុងផ្ទុក...</option>
                                            ) : (
                                                services.map(service => (
                                                    <option key={service.id} value={String(service.id)}>
                                                        {service.title} -  {service.title_kh}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* 3. Title - FIXED added name="title" */}
                        <div className="txt-title">
                            <label htmlFor="title">ចំណងជើង <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="បញ្ចូលឈ្មោះអត្ថបទ" required />
                            </div>
                        </div>

                        {/* 4. Description - (Already has name="des") */}
                        <div className="text-caption">
                            <label htmlFor="des">ការពិពណ៌នា <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea name="des" id="des" value={formData.des} onChange={handleChange} cols={30} rows={4} placeholder="សរសេរការពិពណ៌នា" required />
                            </div>
                        </div>

                        {/* 5. Hashtags - FIXED changed name="hastag" to name="tags" */}
                        <div className="txt-title">
                            <label htmlFor="tags">Hashtags<span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='tags' name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., mylife article Encourage" required />
                            </div>
                        </div>
                        

                        {/* Image Uploader */}
                        <div className="txt-photo df-c" style={{ cursor: 'pointer', marginTop: '15px' }} onClick={() => document.getElementById('desings_img_input').click()}>
                            <div className={`txt-photo-box soeng_artical ${(editData || (previewUrl && previewUrl !== imgTest)) ? 'active-img txt-photo-box-active' : ''}`}>
                                <ul>
                                    <li className="icon-ra-sm"><i className="fa-solid fa-photo-film"></i></li>
                                    <li><h2>{editData ? "ប្តូររូបភាព" : "បញ្ចូលរូបភាពគម្រប"}</h2></li>
                                    <li><p>រូបភាព (៩០០ X ៩០០px)</p></li>
                                </ul>
                                <img src={previewUrl} alt="Cover Preview" style={{ objectFit: 'cover' }} />
                                
                                <input 
                                    type="file" 
                                    name="img" 
                                    id='desings_img_input'
                                    accept="image/png, image/jpeg, image/jpg, image/webp" 
                                    onChange={handleImageChange} 
                                    style={{ display: 'none' }} 
                                    required={!editData} 
                                />
                            </div>
                        </div>

                        {/* this is link  */}
                        <div className="txt-title">
                            <label htmlFor="link">បញ្ចូលលិងគម្រោង <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="url" 
                                    id='link' 
                                    name="link" 
                                    value={formData.link} 
                                    onChange={handleChange} 
                                    placeholder="https://example.com" 
                                    required={true}
                                />
                            </div>
                        </div>
                        {/* this is iframe  */}
                        <div className="txt-title">
                            <label htmlFor="ifram">Iframe</label>
                            <div className="txt-title-box">
                                <input 
                                    type="url" 
                                    id='ifram' 
                                    name="ifram" 
                                    value={formData.ifram} 
                                    onChange={handleChange} 
                                    placeholder="https://example.com" 
                                />
                            </div>
                        </div>

                    </div>
                }
            />
        </div>
    );
}