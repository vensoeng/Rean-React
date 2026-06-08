import { useState, useEffect } from 'react';
import Form from '../../components/common/Form';
import { API_URL, STORAGE, api } from '../../utils/auth'; 
import imgTest from '../../assets/img/alien.jpg';
import WebLoader from '../../components/common/WebLoader';

export default function FormService({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        list_id: '1',
        title: '', title_kh: '', title_zh: '',
        description: '', description_kh: '', description_zh: '',
        tags: '', tags_kh: '', tags_zh: '',
        tags_active: '', tags_active_kh: '', tags_active_zh: '',
        warranty: '', warranty_kh: '', warranty_zh: '',
        note: '', note_kh: '', note_zh: '',
        location: '', location_kh: '', location_zh: '',
        time: '', time_kh: '', time_zh: '',
        booking_length: 0,
        img_slider: '',
        price_start: 0,
        price_end: 0,
        deposit: 0,
        upper: false,   
        status: true 
    });

    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgTest);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {

            setFormData({
                list_id: String(editData.list_id || '1'),
                title: editData.title || '',
                title_kh: editData.title_kh || '',
                title_zh: editData.title_zh || '',
                description: editData.description || '',
                description_kh: editData.description_kh || '',
                description_zh: editData.description_zh || '',
                tags: editData.tags || '',
                tags_kh: editData.tags_kh || '',
                tags_zh: editData.tags_zh || '',
                tags_active: editData.tags_active || '',
                tags_active_kh: editData.tags_active_kh || '',
                tags_active_zh: editData.tags_active_zh || '',
                warranty: editData.warranty || '',
                warranty_kh: editData.warranty_kh || '',
                warranty_zh: editData.warranty_zh || '',
                note: editData.note || '',
                note_kh: editData.note_kh || '',
                note_zh: editData.note_zh || '',
                location: editData.location || '',
                location_kh: editData.location_kh || '',
                location_zh: editData.location_zh || '',
                time: editData.time || '',
                time_kh: editData.time_kh || '',
                time_zh: editData.time_zh || '',
                booking_length: editData.booking_length ?? 0,
                img_slider: editData.img_slider || '',
                price_start: editData.price_start ?? 0,
                price_end: editData.price_end ?? 0,
                deposit: editData.deposit ?? 0,
                upper: editData.upper === true || editData.upper === 'true',   
                status: editData.status === true || editData.status === 'true'  
            });

            if (editData.img) {
                setPreviewUrl(`${API_URL + STORAGE}${editData.img}`);
            } else {
                setPreviewUrl(imgTest);
            }
        } else {
            setFormData({
                list_id: '1', title: '', title_kh: '', title_zh: '',
                description: '', description_kh: '', description_zh: '',
                tags: '', tags_kh: '', tags_zh: '',
                tags_active: '', tags_active_kh: '', tags_active_zh: '',
                warranty: '', warranty_kh: '', warranty_zh: '',
                note: '', note_kh: '', note_zh: '',
                location: '', location_kh: '', location_zh: '',
                time: '', time_kh: '', time_zh: '',
                booking_length: 0, img_slider: '',
                price_start: 0, price_end: 0, deposit: 0,
                upper: false, status: true 
            });
            setPreviewUrl(imgTest);
        }
        setImgFile(null);
        setAttachmentFile(null);
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'upper') {
            setFormData(prev => ({ ...prev, [name]: value === 'true' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
                data.append(key, formData[key]);
            });

            if (imgFile) data.append('img', imgFile);
            if (attachmentFile) data.append('file', attachmentFile);

            const url = editData ? `/services/${editData.id}` : '/services';
            const method = editData ? 'put' : 'post'; 

            const res = await api[method](url, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.status === 200 || res.status === 201) {
                alert(editData ? "កែប្រែសេវាកម្មជោគជ័យ!" : "បង្កើតសេវាកម្មជោគជ័យ!");

                document.querySelector('.web-form').classList.remove('web-form-active');

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
                title="សេវាកម្ម" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} // 💡 បំប្លែងទៅជា String វិញដើម្បីកុំឱ្យទាស់ជាមួយ <select> value នៅក្នុង Form component
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>
                        
                        {/* list_id / Service Category */}
                        <div className="txt-select">
                            <ul>
                                <li>
                                    <label htmlFor="list_id">ប្រភេទសេវ៉ាកម្ម</label>
                                    <div className="txt-select-list-con df-c">
                                        <select id="list_id" name="list_id" value={formData.list_id} onChange={handleChange} required>
                                            <option value="1">រូបភាព</option>
                                            <option value="2">វីដេអូ</option>
                                            <option value="3">ការរចនា</option>
                                            <option value="4">គេហទំព័រ</option>
                                            <option value="5">ផ្សេងៗ</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* title (English) */}
                        <div className="txt-title">
                            <label htmlFor="title">Service Name <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='title' name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Wedding Photography" required />
                            </div>
                        </div>

                        {/* title_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="title_kh">ឈ្មោះសេវ៉ាកម្ម (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='title_kh' name='title_kh' value={formData.title_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ ថតរូបអាពាហ៍ពិពាហ៍" required />
                            </div>
                        </div>

                        {/* title_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="title_zh">服务名称 (中文)</label>
                            <div className="txt-title-box">
                                <input type="text" id='title_zh' name='title_zh' value={formData.title_zh} onChange={handleChange} placeholder="例如：婚礼摄影" />
                            </div>
                        </div>

                        {/* description (English) */}
                        <div className="text-caption">
                            <label htmlFor="description">Description <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea name="description" id="description" value={formData.description} onChange={handleChange} cols={30} rows={3} placeholder="Describe your service details..." required />
                            </div>
                        </div>

                        {/* description_kh (Khmer) */}
                        <div className="text-caption">
                            <label htmlFor="description_kh">ការពិពណ៌នា (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea name="description_kh" id="description_kh" value={formData.description_kh} onChange={handleChange} cols={30} rows={3} placeholder="រៀបរាប់លម្អិតអំពីសេវ៉ាកម្មរបស់អ្នក..." required />
                            </div>
                        </div>

                        {/* description_zh (Chinese) */}
                        <div className="text-caption">
                            <label htmlFor="description_zh">描述 (中文)</label>
                            <div className="txt-caption-box">
                                <textarea name="description_zh" id="description_zh" value={formData.description_zh} onChange={handleChange} cols={30} rows={3} placeholder="详细描述您的服务内容和细节..." />
                            </div>
                        </div>

                        {/* tags (English) */}
                        <div className="txt-title">
                            <label htmlFor="tags">Tags <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='tags' name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., photo, lightroom, portrait" required />
                            </div>
                        </div>

                        {/* tags_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="tags_kh">ស្លាក (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='tags_kh' name="tags_kh" value={formData.tags_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ ថតរូប, កែវីដេអូ" required />
                            </div>
                        </div>

                        {/* tags_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="tags_zh">标签 (中文)</label>
                            <div className="txt-title-box">
                                <input type="text" id='tags_zh' name="tags_zh" value={formData.tags_zh} onChange={handleChange} placeholder="例如：摄影, 调色" />
                            </div>
                        </div>

                        {/* tags_active (English) */}
                        <div className="txt-title">
                            <label htmlFor="tags_active">Active Tags <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="tags_active" name="tags_active" value={formData.tags_active} onChange={handleChange} placeholder="e.g., raw, 4k, html5" required />
                            </div>
                        </div>

                        {/* tags_active_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="tags_active_kh">ស្លាកសកម្ម (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id="tags_active_kh" name="tags_active_kh" value={formData.tags_active_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ កម្រិត4K" required />
                            </div>
                        </div>

                        {/* tags_active_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="tags_active_zh">有效标签 (中文)</label>
                            <div className="txt-title-box">
                               <input type="text" id="tags_active_zh" name="tags_active_zh" value={formData.tags_active_zh} onChange={handleChange} placeholder="例如：4K高清" />
                            </div>
                        </div>

                        {/* warranty (English) */}
                        <div className="txt-title">
                            <label htmlFor="warranty">Warranty <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="warranty" name="warranty" value={formData.warranty} onChange={handleChange} placeholder="e.g., 3 months" required />
                            </div>
                        </div>

                        {/* warranty_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="warranty_kh">ការធានា (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="warranty_kh" name="warranty_kh" value={formData.warranty_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ ធានា ៣ខែ" required />
                            </div>
                        </div>

                        {/* warranty_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="warranty_zh">保修 / 售后 (中文)</label>
                            <div className="txt-title-box">
                               <input type="text" id="warranty_zh" name="warranty_zh" value={formData.warranty_zh} onChange={handleChange} placeholder="例如：保修3个月" />
                            </div>
                        </div>

                        {/* note (English) */}
                        <div className="txt-title">
                            <label htmlFor="note">Note <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="note" name="note" value={formData.note} onChange={handleChange} placeholder="e.g., Price excludes travel expense" required />
                            </div>
                        </div>

                        {/* note_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="note_kh">ចំណាំ (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="note_kh" name="note_kh" value={formData.note_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ មិនរួមបញ្ចូលថ្លៃធ្វើដំណើរ" required />
                            </div>
                        </div>

                        {/* note_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="note_zh">备注 (中文)</label>
                            <div className="txt-title-box">
                               <input type="text" id="note_zh" name="note_zh" value={formData.note_zh} onChange={handleChange} placeholder="例如：价格不包含交通车费" />
                            </div>
                        </div>

                        {/* location (English) */}
                        <div className="txt-title">
                            <label htmlFor="location">Location <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Phnom Penh" required />
                            </div>
                        </div>

                        {/* location_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="location_kh">ទីតាំង (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="location_kh" name="location_kh" value={formData.location_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ ភ្នំពេញ" required />
                            </div>
                        </div>

                        {/* location_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="location_zh">位置 (中文)</label>
                            <div className="txt-title-box">
                               <input type="text" id="location_zh" name="location_zh" value={formData.location_zh} onChange={handleChange} placeholder="例如：金边" />
                            </div>
                        </div>

                        {/* time (English) */}
                        <div className="txt-title">
                            <label htmlFor="time">Working Time <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="time" name="time" value={formData.time} onChange={handleChange} placeholder="e.g., Mon-Fri 9:00AM" required />
                            </div>
                        </div>

                        {/* time_kh (Khmer) */}
                        <div className="txt-title">
                            <label htmlFor="time_kh">ម៉ោងធ្វើការ (ខ្មែរ) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="time_kh" name="time_kh" value={formData.time_kh} onChange={handleChange} placeholder="ឧទាហរណ៍៖ ចន្ទ-សុក្រ" required />
                            </div>
                        </div>

                        {/* time_zh (Chinese) */}
                        <div className="txt-title">
                            <label htmlFor="time_zh">工作时间 (中文)</label>
                            <div className="txt-title-box">
                               <input type="text" id="time_zh" name="time_zh" value={formData.time_zh} onChange={handleChange} placeholder="例如：周一至周五" />
                            </div>
                        </div>

                        {/* booking_length */}
                        <div className="txt-title">
                            <label htmlFor="booking_length">Booking Length (Days) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="number" id="booking_length" name="booking_length" value={formData.booking_length} onChange={handleChange} placeholder="Enter duration in days" required />
                            </div>
                        </div>

                        {/* img (Main Thumbnail Photo) */}
                        <div className="txt-photo df-c" style={{ cursor: 'pointer' }} onClick={() => document.getElementById('img_input').click()}>
                            <div 
                                className={`txt-photo-box soeng_artical ${
                                    (editData || (previewUrl && previewUrl !== imgTest)) 
                                    ? 'active-img txt-photo-box-active' 
                                    : ''
                                }`}
                            >
                                <ul>
                                    <li className="icon-ra-sm"><i className="fa-solid fa-photo-film"></i></li>
                                    <li><h2>{editData ? "ប្តូររូបភាពសេវ៉ាកម្ម" : "បញ្ចូលរូបភាព"}</h2></li>
                                    <li><p>រូបភាព (៩០០ X ៩០០px)</p></li>
                                </ul>
                                <img src={previewUrl} alt="showImage" style={{ objectFit: 'cover' }} />
                                <input type="file" id="img_input" accept="image/png, image/jpeg, image/jpg, image/webp" onChange={handleImageChange} style={{ display: 'none' }} required={!editData} />
                            </div>
                        </div>

                        {/* file (Attachments) */}
                        <div className="txt-title">
                           <label htmlFor="file" style={{ cursor: 'pointer' }}>
                                {attachmentFile ? (
                                    <span>📄 ឯកសារដែលបានរើសថ្មី៖ <strong>{attachmentFile.name}</strong></span>
                                ) : 
                                editData && formData?.file ? (
                                    <span>📄 ឯកសារដែលមានស្រាប់៖ <strong style={{ color: '#2563eb' }}>{formData.file}</strong></span>
                                ) : (
                                    <span>📁 បញ្ចូលឯកសារ HTML ជំនួយ</span>
                                )}
                            </label>
                            <div className="txt-title-box">
                                <input type="file" id="file" name="file" accept=".html,.htm,text/html" className="text_file" onChange={(e) => setAttachmentFile(e.target.files[0])} />
                            </div>
                        </div>

                        {/* img_slider */}
                        <div className="txt-title">
                            <label htmlFor="img_slider">លីងរូបភាពសម្រាប់ស្លាយ (Slider Images Link) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="text" id="img_slider" name="img_slider" value={formData.img_slider} onChange={handleChange} placeholder="https://example.com/image1.jpg, image2.jpg"/>
                            </div>
                        </div>

                        {/* price_start */}
                        <div className="txt-title">
                            <label htmlFor="price_start">តម្លៃចាប់ផ្ដើម ($) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="number" step="0.01" id="price_start" name="price_start" value={formData.price_start} onChange={handleChange} placeholder="0.00" required />
                            </div>
                        </div>

                        {/* price_end */}
                        <div className="txt-title">
                            <label htmlFor="price_end">តម្លៃបញ្ចប់ ($) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="number" step="0.01" id="price_end" name="price_end" value={formData.price_end} onChange={handleChange} placeholder="0.00" required />
                            </div>
                        </div>

                        {/* deposit */}
                        <div className="txt-title">
                            <label htmlFor="deposit">ប្រាក់កក់ ($) <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                               <input type="number" step="0.01" id="deposit" name="deposit" value={formData.deposit} onChange={handleChange} placeholder="0.00" required />
                            </div>
                        </div>

                        {/* upper */}
                        <div className="txt-select">
                            <ul>
                                <li>
                                    <label htmlFor="upper">Upper Price (តម្លៃអាចប្រែប្រួលខ្ពស់ជាងនេះ)</label>
                                    <div className="txt-select-list-con df-c">
                                        <select id="upper" name="upper" value={String(formData.upper)} onChange={handleChange}>
                                            <option value="false">មិនអាច (Fixed Price)</option>
                                            <option value="true">អាចទៅរួច (Can Be Higher)</option>
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                }
            />
        </div>
    );
}