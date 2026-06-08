import { useState, useEffect } from 'react';
import Form from '../../components/common/Form';
import { API_URL, STORAGE, api } from '../../utils/auth'; 
import imgTest from '../../assets/img/alien.jpg';
import WebLoader from '../../components/common/WebLoader';

export default function FormBlog({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        title: '',
        des: '',
        main_hastag: 'Article',
        hastag: '',
        status: true 
    });

    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgTest);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title || '',
                des: editData.des || '',
                main_hastag: editData.main_hastag || 'Article',
                hastag: editData.hastag || '',
                status: editData.status === true || editData.status === 'true' || editData.status === '1' || editData.status === 1
            });

            if (editData.img) {
                setPreviewUrl(`${API_URL + STORAGE}${editData.img}`);
            } else {
                setPreviewUrl(imgTest);
            }
        } else {
            setFormData({
                title: '',
                des: '',
                main_hastag: 'Article',
                hastag: '',
                status: true 
            });
            setPreviewUrl(imgTest);
        }
        setImgFile(null);
        setAttachmentFile(null);
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
                    data.append('status', formData.status ? '1' : '0');
                } else {
                    data.append(key, formData[key]);
                }
            });

            if (imgFile) data.append('img', imgFile);
            if (attachmentFile) data.append('file', attachmentFile);

            const url = editData ? `/blogs/${editData.id}` : '/blogs';
            const method = editData ? 'put' : 'post';

            const res = await api[method](url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                alert(editData ? "កែប្រែអត្ថបទប្លុកជោគជ័យ!" : "បង្កើតអត្ថបទប្លុកជោគជ័យ!");

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
                title="អត្ថបទ" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} 
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>
                        
                        {/* ចំណងជើង (English) */}
                        <div className="txt-title">
                            <label htmlFor="title">ឈ្មោះអត្ថបទ <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='title' name="title" value={formData.title} onChange={handleChange} placeholder="បញ្ចូលឈ្មោះអត្ថបទ" required />
                            </div>
                        </div>

                        {/* ការពិពណ៌នា (English) */}
                        <div className="text-caption">
                            <label htmlFor="des">ការពិពណ៌នា <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea name="des" id="des" value={formData.des} onChange={handleChange} cols={30} rows={4} placeholder="សរសេរការពិពណ៌នា" required />
                            </div>
                        </div>

                        {/* Main Hashtag & Hashtags List */}
                        <div className="txt-title">
                            <label htmlFor="main_hastag">Main Hashtag <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='main_hastag' name="main_hastag" value={formData.main_hastag} onChange={handleChange} placeholder="e.g., Article" required />
                            </div>
                        </div>

                        <div className="txt-title">
                            <label htmlFor="hastag">Hashtags<span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='hastag' name="hastag" value={formData.hastag} onChange={handleChange} placeholder="e.g., mylife article Encourage" required />
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

                        {/* ផ្នែកបញ្ចូលឯកសារ HTML (Blog HTML Attachment) */}
                        <div className="txt-title" style={{ marginTop: '15px' }}>
                           <label htmlFor="blog_file_input" style={{ cursor: 'pointer', display: 'inline-block', marginBottom: '8px' }}>
                                {attachmentFile ? (
                                    <span>📄 ឯកសារដែលបានរើសថ្មី៖ <strong>{attachmentFile.name}</strong></span>
                                ) : editData && editData.file ? (
                                    <span>📄 ឯកសារដែលមានស្រាប់៖ <strong style={{ color: '#2563eb' }}>{editData.file}</strong></span>
                                ) : (
                                    <span>📁 បញ្ចូលឯកសារ HTML ជំនួយ</span>
                                )}
                            </label>
                            <div className="txt-title-box">
                                <input type="file" id="blog_file_input" name="file" accept=".html,.htm,text/html" className="text_file" onChange={(e) => setAttachmentFile(e.target.files[0])} />
                            </div>
                        </div>

                    </div>
                }
            />
        </div>
    );
}