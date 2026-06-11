import { useEffect, useState } from 'react';
import { API_URL, api } from '../../utils/auth';
import { Flash, Add, Magicpen, Edit, Layer, Copy} from 'iconsax-reactjs';
import WebLoader from '../../components/common/WebLoader';
import FormDesigns from '../../components/form/storage_form';

import '../../assets/css/admin/table.css';
import '../../assets/css/admin/designs.css';

export default function AdminStorage() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDesigns, setSelectedDesigns] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTextDelete, setLoadingTextDelete] = useState('កំពុងលុបទិន្នន័យអត្ថបទចេញពីប្រព័ន្ធ សូមរង់ចាំបិច...');

  // Fetch designs from API
  const fetchDesigns = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/storage`);
      const resData = await res.json();
      
      if (resData && resData.data) {
        setDesigns(resData.data);
      } else if (Array.isArray(resData)) {
        setDesigns(resData);
      }
    } catch (err) {
      console.error("Error fetching designs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // Handle delete item
  const handleDeleteSubmit = async (designsId) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបអត្ថបទនេះមែនទេ?")) {
      try {
        setLoadingDelete(true);
        const response = await api.delete(`/storage/${designsId}`);

        if (response.status === 200 || response.status === 204) {
          setDesigns((prevdesigns) => prevdesigns.filter((designs) => designs.id !== designsId));
          setLoadingTextDelete('🗑️ លុបអត្ថបទបានជោគជ័យ!');
          setTimeout(() => {
            setLoadingTextDelete('កំពុងលុបទិន្នន័យអត្ថបទចេញពីប្រព័ន្ធ សូមរង់ចាំបន្តិច...');
          }, 2000);
        }
      } catch (err) {
        console.error("Error deleting designs:", err);
        alert(`ការលុបបរាជ័យ៖ ${err.response?.data?.message || 'មានបញ្ហាក្នុងការតភ្ជាប់!'}`);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleOpenCreate = () => {
    setSelectedDesigns(null); 
    document.querySelector('.web-form')?.classList.add('web-form-active');
  };

  const handleOpenEdit = (item) => {
    setSelectedDesigns(item); 
    document.querySelector('.web-form')?.classList.add('web-form-active');
  };

  const handleSaveSuccess = (newData, actionType) => {
    const cleanData = newData?.data ? newData.data : newData;

    if (actionType === 'create') {
        setDesigns((prev) => [...prev, cleanData]);
    } else {
        setDesigns((prev) =>
        prev.map((item) => (item.id === cleanData.id ? cleanData : item))
        );
    }
    document.querySelector('.web-form')?.classList.remove('web-form-active');
    };


    const copyLink = async (url_file) => {
        
        if (!url_file) {
            alert('រកមិនឃើញតំណភ្ជាប់ឯកសារនេះទេ! (File URL is undefined)');
            return;
        }

        const dataURL = url_file;
        try {
            await navigator.clipboard.writeText(dataURL);
            alert('Link copied successfully');
        } catch (err) {
            console.error(err);
        }
    };


  return (
      <div className='admin-designs p-r'>
        {/* 💡 Correctly Render FormBlog with synced service states */}
        <FormDesigns 
          editData={selectedDesigns} 
          onSaveSuccess={handleSaveSuccess}
          onCloseForm={() => setSelectedDesigns(null)} 
        />
  
        <div className='admin-content'>
          {/* Load animation when deleting item */}
          {loadingDelete && (
            <WebLoader>{loadingTextDelete}</WebLoader>
          )}
          
          {/* Nav item for count data */}
          <div className='adnav'>
            <div className='adnav-head'>
              <div className='adnvh-box df-s'>
                <h2 className='df-l'>
                  <Flash className='icon icon-sm over-h' />
                  បញ្ជីនៃទិន្នន័យ
                </h2>
                <button onClick={handleOpenCreate} className='btn'>
                  <Magicpen />
                  បន្ថែមឯកសារ
                </button>
              </div>
            </div>
            
            <div className='adnv-box'>
              <div className='adnvul scroll-x'>
                <div className='adnvul-row'>
                  <div className='adnvulrw-bx'>
                    <div className='adnvulrwbxh df-l'>
                      <Magicpen />
                      <h2>អត្ថបទមាន</h2>
                    </div>
                    <div className='adnvulrw-con'>
                      <blockquote>
                        <h2>មានចំនួន {designs.length}</h2> 
                        <p>សរសេរឯកសារបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍។</p>
                      </blockquote>
                    </div>
                    <div className='adnvulrw-action df-r'>
                      <button type='button' onClick={handleOpenCreate} className='btn'>
                        <Magicpen />
                        បន្ថែមឯកសារ
                      </button>
                    </div>
                  </div>
                </div>
  
                <div className='adnvul-row adnav-unactive'>
                  <div className='adnvulrw-bx'>
                    <div className='adnvulrwbxh df-l'>
                      <Magicpen />
                      <h2>ឯកសារ</h2>
                    </div>
                    <div className='adnvulrw-con'>
                      <blockquote>
                        <h2>មានចំនួន ១០</h2>
                        <p>សរសេរឯកសារបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត។</p>
                      </blockquote>
                    </div>
                    <div className='adnvulrw-action df-r'>
                      <button type='button' onClick={handleOpenCreate} className='btn'>
                        <Add size="20" variant="Linear"/>
                        បន្ថែមថ្មី
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Loading state handling */}
          {loading ? (
            <WebLoader>រង់ចាំបន្ដិចយើងកំពុងទាញយកទិន្នន័យដើម្បីដំណើរការ</WebLoader>
          ) : (
            <section className="tb-section db-c" id="art-books">
              <div className="tb-section-body db-c">
                <div className="box">
                  <table>
                    <thead>
                      <tr>
                        <th>រូបភាព និងចំណងជើង</th>
                        <th style={{ textAlign: 'center' }}>លុបទិន្នន័យ</th>
                        <th style={{ textAlign: 'center' }}>ម៉ឺនុយ</th>
                        <th>ពេលវេលា</th>
                        <th>សកម្មភាព</th>
                      </tr>
                    </thead>
                    <tbody>
                      {designs.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            មិនមានទិន្នន័យឯកសារឡើយ។
                          </td>
                        </tr>
                      ) : (
                        [...designs].reverse().map((d, index) => (
                          <tr key={d.id || index}>
                            <td>
                              <div className="box df-l">
                                <div className="img df-c">
                                  <Layer 
                                    size="40"
                                  />
                                </div>
                                <div className="text">
                                    <h2>{d.name}</h2>
                                    <blockquote>
                                      <p>{d.created_at}</p>
                                    </blockquote>
                                </div>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button 
                                type="button" 
                                className="bg-n" 
                                onClick={() => handleDeleteSubmit(d.id)}
                              >
                                <div className="btn btn-ra btn-delete">
                                  <span>លុបឯកសារ</span>
                                </div>
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button onClick={() =>copyLink(d.file_url)} className="btn btn-ra icon-ra-sm btn-status">
                                <span>
                                  <Copy />
                                </span>
                              </button>
                            </td>
                            <td>
                              {new Date(d.updated_at).toLocaleDateString('kh-KH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </td>
                            <td>
                              <button type='button' onClick={() => handleOpenEdit(d)} className='df-c btn-edit-action'>
                                <span>កែប្រែ</span>
                                <Edit size="16" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    );
}