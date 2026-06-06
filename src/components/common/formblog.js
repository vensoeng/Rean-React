import { useState, useEffect } from 'react';
import { api } from '../../utils/auth';
import { Image, DirectNotification, Magicpen, CloseCircle} from 'iconsax-reactjs';
import '../../assets/css/admin/form.css';
import '../../assets/css/form.css';
import WebLoader from './WebLoader';

export default function CreateBlog({ onClose, editData = null }) {
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [mainHastag, setMainHastag] = useState('');
  const [hastag, setHastag] = useState('');
  const [status, setStatus] = useState('1');
  
  // State សម្រាប់គ្រប់គ្រងការ Upload ឯកសារទាំងពីរ
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [htmlFile, setHtmlFile] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(editData);

  const [Loading, setLoading] = useState(false);
  const [LoadingText, setLoadingText] = useState('');

  useEffect(() => {
    if (isEditMode && editData) {
      setTitle(editData.title || '');
      setDes(editData.des || '');
      setMainHastag(editData.main_hastag || '');
      setHastag(editData.hastag || '');
      setStatus(editData.status || '1');
      
      if (editData.img) {
        setImagePreview(`http://localhost:5000/images/storage/${editData.img}`);
      }
    }
  }, [editData, isEditMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const handleHtmlFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHtmlFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !des || (!isEditMode && !htmlFile)) {
      alert("សូមបំពេញ ចំណងជើង, សេចក្តីពិពណ៌នា និងជ្រើសរើសឯកសារ HTML Content!");
      return;
    }

    setIsSubmitting(true);

    if (isEditMode) {
      setLoadingText("កំពុងរក្សាទុកការកែប្រែអត្ថបទ... សូមរង់ចាំបន្តិច");
    } else {
      setLoadingText("កំពុងបង្កើត និងបោះពុម្ពអត្ថបទថ្មី... សូមរង់ចាំបន្តិច");
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('des', des);
    formData.append('main_hastag', mainHastag);
    formData.append('hastag', hastag);
    formData.append('status', status);
    
    if (imageFile) formData.append('img', imageFile);
    if (htmlFile) formData.append('file', htmlFile);

    try {
      let response;

      if (isEditMode) {
        response = await api.put(`/blogs/${editData.id}`, formData);
      } else {
        response = await api.post('/blogs', formData);
      }

      if (response.status === 200 || response.status === 201) {
        alert(isEditMode ? "🎉 ធ្វើបច្ចុប្បន្នភាពអត្ថបទបានជោគជ័យ!" : "🎉 បង្កើតអត្ថបទ Blog ថ្មីបានជោគជ័យ!");
        onClose();
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      alert(`ប្រតិបត្តិការបរាជ័យ៖ ${err.response?.data?.message || 'មានបញ្ហាក្នុងការតភ្ជាប់!'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-form-container p-r">
      {Loading && (
        <WebLoader>{LoadingText}</WebLoader>
      )}
      {/* Form Header */}
      <div className="form-header df-s">
        {/* 💡 ប្តូរចំណងជើងរស់រវើកតាមលក្ខខណ្ឌជាក់ស្តែង */}
        <h2>{isEditMode ? "កែប្រែអត្ថបទ (Edit Blog)" : "បង្កើតអត្ថបទថ្មី (Create New Blog)"}</h2>
        <button type="button" className="btn-close-modal df-c" onClick={onClose}>
          <CloseCircle size="24" variant="Linear" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="blog-form-layout">
        
        {/* ផ្នែកខាងឆ្វេង៖ ព័ត៌មានអត្ថបទ */}
        <div className="form-main-inputs">
          <div className="input-group">
            <label>ចំណងជើងអត្ថបទ <span className="required">*</span></label>
            <input 
              type="text" 
              placeholder="វាយបញ្ចូលចំណងជើង..." 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="input-group">
            <label>សេចក្តីពិពណ៌នាសង្ខេប (Description) <span className="required">*</span></label>
            <textarea 
              rows="5" 
              placeholder="សរសេររៀបរាប់សង្ខេប..."
              value={des}
              onChange={(e) => setDes(e.target.value)}
              disabled={isSubmitting}
            ></textarea>
          </div>

          <div className="form-row-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label>Main Hashtag</label>
              <input 
                type="text" 
                placeholder="ឧទាហរណ៍៖ vensoeng, soeng" 
                value={mainHastag}
                onChange={(e) => setMainHastag(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <div className="input-group">
              <label>Hastag បន្ថែម</label>
              <input 
                type="text" 
                placeholder="ឧទាហរណ៍៖ life, mylife" 
                value={hastag}
                onChange={(e) => setHastag(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* ផ្នែកខាងស្តាំ៖ ការ Upload ឯកសារ និងស្ថានភាព */}
        <div className="form-sidebar-inputs">
          
          {/* 📂 ទី១៖ ប្រអប់ជ្រើសរើសឯកសារ HTML Content */}
          <div className="input-group">
            {/* បើក្នុង Mode Create ត្រូវដាក់ផ្កាយបញ្ជាក់ថាចាំបាច់ */}
            <label>ឯកសារខ្លឹមសារអត្ថបទ (.HTML) {!isEditMode && <span className="required">*</span>}</label>
            <div className="file-upload-custom">
              <input 
                type="file" 
                accept=".html" 
                onChange={handleHtmlFileChange}
                disabled={isSubmitting}
                id="html_file_input"
                style={{ display: 'none' }}
              />
              <label htmlFor="html_file_input" className="html-upload-label df-c">
                {/* 💡 បង្ហាញឈ្មោះឯកសារថ្មី បើគ្មានទេ បង្ហាញឈ្មោះឯកសារចាស់ដែលមកពី Database */}
                <span>{htmlFile ? htmlFile.name : (isEditMode && editData.file ? editData.file : "ជ្រើសរើសឯកសារ HTML")}</span>
              </label>
            </div>
          </div>

          {/* 🖼️ ទី២៖ ប្រអប់ជ្រើសរើសរូបភាព Cover */}
          <div className="input-group">
            <label>រូបភាពតំណាង (Cover Image)</label>
            <div className={`image-upload-wrapper ${imagePreview ? 'has-preview' : ''}`}>
              {imagePreview ? (
                <div className="preview-container p-r">
                  <img src={imagePreview} alt="Cover Preview" className="img-preview-src" />
                  <label htmlFor="cover_img_input" className="btn-change-img df-c">
                    <Magicpen size="14"/> ដូររូបភាព
                  </label>
                </div>
              ) : (
                <label htmlFor="cover_img_input" className="upload-placeholder-box df-c">
                  <Image size="32" variant="Linear" className="upload-icon" />
                  <span>ចុចទីនេះដើម្បីជ្រើសរើសរូបភាព</span>
                  <p>គាំទ្រទម្រង់ PNG, JPG ឬ JPEG</p>
                </label>
              )}
              <input 
                type="file" 
                id="cover_img_input"
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* ទី៣៖ ស្ថានភាព */}
          <div className="input-group">
            <label>ស្ថានភាពបោះពុម្ព</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} disabled={isSubmitting}>
              <option value="1">👨‍💻 ផ្សព្វផ្សាយ (Public)</option>
              <option value="0">🔒 ព្រាងទុក (Draft)</option>
            </select>
          </div>

          <div className="form-action-buttons" style={{ marginTop: '24px' }}>
            <button type="submit" className="btn-submit-blog" disabled={isSubmitting}>
              <DirectNotification size="18" variant="Bold"/>
              {/* 💡 ប្តូរឈ្មោះប៊ូតុងរស់រវើក */}
              <span>{isSubmitting ? "កំពុងរក្សាទុក..." : (isEditMode ? "រក្សាការកែប្រែ" : "បោះពុម្ពផ្សាយ")}</span>
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}