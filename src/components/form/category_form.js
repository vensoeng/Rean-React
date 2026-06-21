import { useState, useEffect } from 'react';
import Form from '../common/Form';
import { API_URL, STORAGE, api } from '../../utils/auth'; 
import imgTest from '../../assets/img/alien.jpg';
import WebLoader from '../common/WebLoader';

export default function FormCreator({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        status: true,
        title: '',
        des: '',
    });

    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgTest);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                status: editData.status === true || editData.status === 'true' || editData.status === '1' || editData.status === 1,
                title:  editData.title || '',
                des: editData.des || '',
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
            });
            setPreviewUrl(imgTest);
        }
        setImgFile(null);

    }, [editData]);

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

            const url = editData ? `/categorys/${editData.id}` : '/categorys';
            const method = editData ? 'put' : 'post';

            const res = await api[method](url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                alert(editData ? "កែប្រែអត្ថបទប្លុកជោគជ័យ!" : "បង្កើតមាតិកាជោគជ័យ!");

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
                title="ប្រភេទផលិតផល" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} 
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>

                        {/* ចំណងជើង */}
                        <div className="txt-title">
                            <label htmlFor="title">ចំណងជើងមាតិកា <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='title' name="title" value={formData.title} onChange={handleChange} placeholder="បញ្ចូលឈ្មោះអត្ថបទ" required />
                            </div>
                        </div>

                        {/* ការពិពណ៌នា */}
                        <div className="text-caption">
                            <label htmlFor="des">ការពិពណ៌នា <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea name="des" id="des" value={formData.des} onChange={handleChange} cols={30} rows={4} placeholder="សរសេរការពិពណ៌នា" required />
                            </div>
                        </div>

                        {/* ផ្នែកបញ្ចូលរូបភាព (Main Thumbnail Photo) */}
                        <div className="txt-photo df-c" style={{ cursor: 'pointer', marginTop: '15px' }} onClick={() => document.getElementById('blog_img_input').click()}>
                            <div className={`txt-photo-box soeng_artical ${(editData || (previewUrl && previewUrl !== imgTest)) ? 'active-img txt-photo-box-active' : ''}`}>
                                <ul>
                                    <li className="icon-ra-sm"><i className="fa-solid fa-photo-film"></i></li>
                                    <li><h2>{editData ? "ប្តូររូបភាពប្លុក" : "បញ្ចូលរូបភាពគម្រប"}</h2></li>
                                    <li><p>រូបភាព (៩០០ X ៩០០px)</p></li>
                                </ul>
                                <img src={previewUrl} alt="Blog Cover" style={{ objectFit: 'cover' }} />
                                <input type="file" id="blog_img_input" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} style={{ display: 'none' }} required={!editData} />
                            </div>
                        </div>

                    </div>
                }
            />
        </div>
    );
}