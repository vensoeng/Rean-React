import { useState, useEffect } from 'react';
import Form from '../common/Form';
import { API_URL, STORAGE, api } from '../../utils/auth'; 
import imgTest from '../../assets/img/alien.jpg';
import WebLoader from '../common/WebLoader';

export default function FormProduct({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        status: true,
        pin: '0',
        cat_id: '1',
        name: '',
        des: '',
        price: '0',
        stock: '0',
        pesent: '0',
        note: '',
        tags: '',
        list_img: '',
    });

    const [imgFile, setImgFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(imgTest);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categorys, setCategory] = useState([]);

    useEffect(() => {
        if (editData) {
            setFormData({
                status: editData.status === true || editData.status === 'true' || editData.status === '1' || editData.status === 1,
                pin: String(editData.pin ?? '0'),
                cat_id: String(editData.cat_id ?? '1'),
                name:  editData.name || '',
                des: editData.des || '',
                price: editData.price || '0',
                stock: editData.stock || '0',
                pesent: editData.pesent || '0',
                note: editData.note || '',
                tags: editData.tags || '',
                list_img: editData.list_img || '',
            });

            if (editData.img) {
                setPreviewUrl(`${API_URL + STORAGE}${editData.img}`);
            } else {
                setPreviewUrl(imgTest);
            }
        } else {
            setFormData({
                status: true,
                pin: '',
                cat_id: '1',
                name: '',
                des: '',
                price: '0',
                stock: '0',
                pesent: '0',
                note: '',
                tags: '',
                list_img: '',
            });
            setPreviewUrl(imgTest);
        }
        setImgFile(null);
        setAttachmentFile(null);

        fetchCategory();

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
            } else if (key === 'pin') {
                data.append('pin', formData.pin === '1' || formData.pin === true ? '1' : '0');
            } else if (key === 'cat_id') {
                const numericId = Number(formData.cat_id) || 1; 
                data.append('cat_id', numericId); 
            } else if (key === 'price') {
                data.append('price', Number(formData.price) || 0);
            } else {
                data.append(key, formData[key]);
            }
        });

            if (imgFile) data.append('img', imgFile);
            if (attachmentFile) data.append('file', attachmentFile);

            const url = editData ? `/products/${editData.id}` : '/products';
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
    
    const fetchCategory = async () => {
        try {
        const res = await fetch(`${API_URL}/categorys`);
        const resData = await res.json();
        
        if (resData && resData.data) {
            setCategory(resData.data);
        } else if (Array.isArray(resData)) {
            setCategory(resData);
        }
        } catch (err) {
            console.error("Error fetching creators:", err);
        }
    };

    return (
        <div>
            {isSubmitting && (
                <WebLoader>កំពុងរក្សាទុកទិន្នន័យ សូមរង់ចាំបន្តិច...</WebLoader>
            )}
            <Form 
                title="ផលិតផល" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} 
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>
                        {/* 1. Category Dropdown - FIXED name="cat_id" */}
                        <div className="txt-select">
                            <ul>
                                <li>
                                    <label htmlFor="cat_id">ប្រភេទការរចនា</label>
                                    <div className="txt-select-list-con df-c">
                                        <select id="cat_id" name="cat_id" value={formData.cat_id} onChange={handleChange} required>
                                            {categorys.map((p, i) => (
                                                <option value={p.id}>{p.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* ចំណងជើង (English) */}
                        <div className="txt-title">
                            <label htmlFor="title">ចំណងជើងមាតិកា <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='name' name="name" value={formData.name} onChange={handleChange} placeholder="បញ្ចូលឈ្មោះអត្ថបទ" required />
                            </div>
                        </div>

                        {/* ការពិពណ៌នា (English) */}
                        <div className="text-caption">
                            <label htmlFor="des">ការពិពណ៌នា <span className='sre'>*</span></label>
                            <div className="txt-caption-box">
                                <textarea
                                    name="des" 
                                    id="des"
                                    onChange={(e) => {
                                        e.target.parentNode.dataset.replicatedValue = e.target.value;
                                        handleChange(e);
                                    }}
                                    value={formData.des}
                                    onBlur={(e) => e.target.parentNode.dataset.replicatedValue = null}
                                    onClick={(e) => e.target.parentNode.dataset.replicatedValue = e.target.value}
                                    cols={30}
                                    rows={1}
                                    placeholder="សរសេរការពិពណ៌នា" required
                                />
                            </div>
                        </div>

                        {/* តម្លៃផលិតផល (English) */}
                        <div className="txt-title">
                            <label htmlFor="price">តម្លៃផលិតផល <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="text" id='price' name="price" value={formData.price} onChange={handleChange} placeholder="$_ _ _" required />
                            </div>
                        </div>
                        
                        {/* ចំនួនក្នុងស្តុក (English) */}
                        <div className="txt-title">
                            <label htmlFor="stock">ចំនួនក្នុងស្តុក <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="number" id='stock' name="stock" value={formData.stock} onChange={handleChange} placeholder="_ _ _" required />
                            </div>
                        </div>

                        {/* បញ្ចុះតម្លៃ (English) */}
                        <div className="txt-title">
                            <label htmlFor="pesent">បញ្ចុះតម្លៃ <span className='sre'>*</span></label>
                            <div className="txt-title-box">
                                <input type="number" id='pesent' name="pesent" value={formData.pesent} onChange={handleChange} placeholder="_ _%" required />
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

                        {/* list images URL */}
                        <div className="text-caption">
                            <label htmlFor="list_img">URL រូបភាពស្លាយ</label>
                            <div className="txt-caption-box">
                                <textarea
                                    name="list_img"
                                    id="data-text"
                                    onChange={(e) => {
                                        e.target.parentNode.dataset.replicatedValue = e.target.value;
                                        handleChange(e);
                                    }}
                                    value={formData.list_img}
                                    onBlur={(e) => e.target.parentNode.dataset.replicatedValue = null}
                                    onClick={(e) => e.target.parentNode.dataset.replicatedValue = e.target.value}
                                    cols={30}
                                    rows={1}
                                    placeholder="storage/098654.web, ...."
                                />
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

                        {/* 5. Hashtags - FIXED changed name="hastag" to name="tags" */}
                        <div className="txt-title">
                            <label htmlFor="note">ចំណាំ</label>
                            <div className="txt-title-box">
                                <input type="text" id='note' name="note" value={formData.note} onChange={handleChange} placeholder="ឧទាហរណ៍៖ របស់ងាយបែកបាក់"/>
                            </div>
                        </div>

                        {/* 5. Hashtags - FIXED changed name="hastag" to name="tags" */}
                        <div className="txt-title">
                            <label htmlFor="tags">Hashtags</label>
                            <div className="txt-title-box">
                                <input type="text" id='tags' name="tags" value={formData.tags} onChange={handleChange} placeholder="e.g., mylife article Encourage"/>
                            </div>
                        </div>

                        {/* 6. Index Item - FIXED added name="pin_num" */}
                        <div className="txt-title df-l">
                            <label htmlFor="pin">ចង់ឱ្យនៅលើ<span className='sre'></span></label>
                            <input 
                                className='left-05'
                                type="checkbox" 
                                id="pin"
                                name="pin"
                                checked={formData.pin === '1' || formData.pin === 1}
                                onChange={(e) => setFormData(prev => ({ ...prev, pin: e.target.checked ? '1' : '0' }))}
                            />
                        </div>
                        
                    </div>
                }
            />
        </div>
    );
}