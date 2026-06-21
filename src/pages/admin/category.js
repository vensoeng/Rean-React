import { useEffect, useState } from 'react';
import { API_URL, STORAGE, api } from '../../utils/auth';
import { Flash, Add, Magicpen, Lock1, Global, More, Edit } from 'iconsax-reactjs';
import WebLoader from '../../components/common/WebLoader';
import FormCategory from '../../components/form/category_form';

import '../../assets/css/admin/table.css';
import '../../assets/css/admin/creators.css';

export default function AdminCategory() {
  const [categorys, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingTextDelete, setLoadingTextDelete] = useState('កំពុងលុបទិន្នន័យមាតិកាចេញពីប្រព័ន្ធ សូមរង់ចាំបិច...');

  // Fetch categorys from API
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/categorys`);
      const resData = await res.json();
      
      if (resData && resData.data) {
        setCategory(resData.data);
      } else if (Array.isArray(resData)) {
        setCategory(resData);
      }
    } catch (err) {
      console.error("Error fetching category:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Handle delete item
  const handleDeleteSubmit = async (designsId) => {
    if (window.confirm("តើអ្នកពិតជាចង់លុបមាតិការនេះមែនទេ?")) {
      try {
        setLoadingDelete(true);
        const response = await api.delete(`/categorys/${designsId}`);

        if (response.status === 200 || response.status === 204) {
          setCategory((prevdesigns) => prevdesigns.filter((categorys) => categorys.id !== designsId));
          setLoadingTextDelete('🗑️ លុបមាតិកាបានជោគជ័យ!');
          setTimeout(() => {
            setLoadingTextDelete('កំពុងលុបទិន្នន័យចេញពីប្រព័ន្ធ សូមរង់ចាំបន្តិច...');
          }, 2000);
        }
      } catch (err) {
        console.error("Error deleting categorys:", err);
        alert(`ការលុបបរាជ័យ៖ ${err.response?.data?.message || 'មានបញ្ហាក្នុងការតភ្ជាប់!'}`);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleOpenCreate = () => {
    setSelectedCategory(null); 
    document.querySelector('.web-form')?.classList.add('web-form-active');
  };

  const handleOpenEdit = (item) => {
    setSelectedCategory(item); 
    document.querySelector('.web-form')?.classList.add('web-form-active');
  };

  const handleSaveSuccess = (newData, actionType) => {
    if (actionType === 'create') {
      setCategory((prev) => [...prev, newData]);
    } else {
      setCategory((prev) =>
        prev.map((item) => (item.id === newData.id ? newData : item))
      );
    }
    document.querySelector('.web-form')?.classList.remove('web-form-active');
  };

  return (
      <div className='admin-creators p-r'>
        {/* 💡 Correctly Render FormBlog with synced service states */}
        <FormCategory 
          editData={selectedCategory} 
          onSaveSuccess={handleSaveSuccess}
          onCloseForm={() => setSelectedCategory(null)} 
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
                  បន្ថែមអត្ថបទ
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
                        <h2>មានចំនួន {categorys.length}</h2> 
                        <p>សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍។</p>
                      </blockquote>
                    </div>
                    <div className='adnvulrw-action df-r'>
                      <button type='button' onClick={handleOpenCreate} className='btn'>
                        <Magicpen />
                        បន្ថែមអត្ថបទ
                      </button>
                    </div>
                  </div>
                </div>
  
                <div className='adnvul-row adnav-unactive'>
                  <div className='adnvulrw-bx'>
                    <div className='adnvulrwbxh df-l'>
                      <Magicpen />
                      <h2>អត្ថបទមាន</h2>
                    </div>
                    <div className='adnvulrw-con'>
                      <blockquote>
                        <h2>មានចំនួន ១០</h2>
                        <p>សរសេរអត្ថបទបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត។</p>
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
                      {categorys.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            មិនមានទិន្នន័យអត្ថបទឡើយ។
                          </td>
                        </tr>
                      ) : (
                        [...categorys].reverse().map((d, index) => (
                          <tr key={d.id || index}>
                            <td>
                              <div className="box df-l">
                                <div className="img">
                                  <img 
                                    src={d.img ? API_URL + STORAGE + d.img : "https://via.placeholder.com/150"} 
                                    alt="d Cover" 
                                  />
                                </div>
                                <div className="text">
                                    <h2>{d.title}</h2>
                                    <blockquote>
                                      <p>{d.des}</p>
                                    </blockquote>
                                    <div className='icon icon-sm txt-be'>
                                      {d.status === 'true' ? <Global /> : <Lock1 />}
                                    </div>
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
                                  <span>លុបអត្ថបទ</span>
                                </div>
                              </button>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <button className="btn btn-ra icon-ra-sm btn-status">
                                <span>
                                  <More />
                                </span>
                              </button>
                            </td>
                            <td>
                              {new Date(d.created_at).toLocaleDateString('kh-KH', {
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