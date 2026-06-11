import { useState, useEffect } from 'react';
import Form from '../common/Form';
import { api } from '../../utils/auth'; 
import WebLoader from '../common/WebLoader';

export default function FormDesigns({ editData, onSaveSuccess, onCloseForm }) {
    
    const [formData, setFormData] = useState({
        status: true,
        file: ''
    });

    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editData) {
            setFormData({
                status: editData.status === true || editData.status === 'true' || editData.status === '1' || editData.status === 1,
                file: editData.file || '' // Capture existing file name if editing
            });
        } else {
            setFormData({
                status: true,
                file: ''
            });
        }
        setAttachmentFile(null);
    }, [editData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const data = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (key === 'status') {
                    data.append('status', formData.status ? 'true' : 'false');
                } else if (key !== 'file') {
                    data.append(key, formData[key]);
                }
            });

            if (attachmentFile) {
                data.append('file', attachmentFile); 
            }

            const url = editData ? `/storage/${editData.id}` : '/storage';
            const method = editData ? 'put' : 'post'; 

            const res = await api[method](url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status === 200 || res.status === 201) {
                alert(editData ? "កែប្រែឯកសារជោគជ័យ!" : "បង្កើតឯកសារជោគជ័យ!");

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
                title="បង្កើតឯកសារសម្រាប់ចែករំលែក" 
                onSubmit={handleSubmit} 
                isEdit={Boolean(editData)}
                statusValue={String(formData.status)} 
                onStatusChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                body={
                    <div className="box bottom-05" style={{ padding: '0 10px' }}>
                    
                        {/* file (Attachments) */}
                        <div className="txt-title">
                           <label htmlFor="file" style={{ cursor: 'pointer' }}>
                                {attachmentFile ? (
                                    <span>📄 ឯកសារដែលបានរើសថ្មី៖ <strong>{attachmentFile.name}</strong></span>
                                ) : 
                                editData && formData?.file ? (
                                    <span>📄 ឯកសារដែលមានស្រាប់៖ <strong style={{ color: '#2563eb' }}>{formData.file}</strong></span>
                                ) : (
                                    <span>📁 បញ្ចូលរូបភាព ឬ HTML</span>
                                )}
                            </label>
                            <div className="txt-title-box">
                                <input type="file" id="file" name="file" accept=".png,.jpg,.jpeg,.web,.html,.htm,text/html" className="text_file" onChange={(e) => setAttachmentFile(e.target.files[0])} />
                            </div>
                        </div>

                    </div>
                }
            />
        </div>
    );
}