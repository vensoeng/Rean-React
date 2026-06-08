import { useEffect, useState } from 'react';
import { API_URL, STORAGE, api} from '../../utils/auth';

import { Flash, Add, Dropbox, Lock1, Global, More, Edit} from 'iconsax-reactjs';
import WebLoader from '../../components/common/WebLoader';

import '../../assets/css/admin/table.css';
import '../../assets/css/admin/service.css';

import FormService from '../../components/form/service_form';

export default function AdminService() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/services`);
                const resData = await res.json();
                
                if (resData && resData.data) {
                    setServices(resData.data);
                } else if (Array.isArray(resData)) {
                    setServices(resData);
                }
            } catch (err) {
                console.error("Error fetching Services:", err);
            } finally {
                setLoading(false); 
            }
        };
        fetchServices();
    }, []);
    
    const handleOpenCreate = () => {
        setSelectedService(null); 
        document.querySelector('.web-form')?.classList.add('web-form-active');
    };

    const handleOpenEdit = (item) => {
        setSelectedService(item); 
        document.querySelector('.web-form')?.classList.add('web-form-active');
    };

    const handleSaveSuccess = (newData, actionType) => {
        if (actionType === 'create') {
            setServices((prev) => [...prev, newData]);
        } else {
            setServices((prev) =>
                prev.map((item) => (item.id === newData.id ? newData : item))
            );
        }
        document.querySelector('.web-form')?.classList.remove('web-form-active');
    };
    //delete item
    const handleDelete = async (id) => {
        const isConfirm = window.confirm("តើអ្នកពិតជាចង់លុបសេវាកម្មនេះមែនទេ?");
        if (!isConfirm) return;

        setIsDeleting(true);
        try {
            const res = await api.delete(`/services/${id}`);
            if (res.status === 200 || res.status === 204) {
                alert("លុបទិន្នន័យសេវាកម្មជោគជ័យ!");
                setServices((prev) => prev.filter(item => item.id !== id));
            } else {
                alert("មិនអាចលុបទិន្នន័យបានទេ!");
            }
        } catch (err) {
            console.error("🔴 Error deleting service:", err.response?.data || err.message);
            const errorMsg = err.response?.data?.message || "មានបញ្ហាប្រព័ន្ធ មិនអាចលុបបានឡើយ";
            alert("មានបញ្ហា៖ " + errorMsg);
        }finally {
            setIsDeleting(false);
        }
    };

  return (
    <div className='admin-blogs p-r'>
        {/* add form  */}
        <FormService 
            editData={selectedService} 
            onSaveSuccess={handleSaveSuccess}
            onCloseForm={() => setSelectedService(null)} 
        />

      <div className='admin-content'>
        {/* load animation when delete item  */}

        {/* Nav item for count data */}
        <div className='adnav'>
          <div className='adnav-head'>
            <div className='adnvh-box df-s'>
              <h2 className='df-l'>
                <Flash className='icon icon-sm over-h' />
                បញ្ជីនៃទិន្នន័យ
              </h2>
              <button className='btn' onClick={handleOpenCreate}>
                <Dropbox />
                បន្ថែមសេវ៉ាកម្ម
              </button>
            </div>
          </div>
          
          <div className='adnv-box'>
            <div className='adnvul scroll-x'>

              <div className='adnvul-row'>
                <div className='adnvulrw-bx'>
                  <div className='adnvulrwbxh df-l'>
                    <Dropbox />
                    <h2>សេវ៉ាកម្ម</h2>
                  </div>
                  <div className='adnvulrw-con'>
                    <blockquote>
                      <h2>មានចំនួន {services.length}</h2> 
                      <p>សរសេរសេវ៉ាកម្មបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត Gazat suicide។</p>
                    </blockquote>
                  </div>
                  <div className='adnvulrw-action df-r'>
                    <button type='button' className='btn' onClick={handleOpenCreate}>
                      <Dropbox />
                      បន្ថែមសេវ៉ាកម្ម
                    </button>
                  </div>
                </div>
              </div>

              <div className='adnvul-row adnav-unactive'>
                <div className='adnvulrw-bx'>
                  <div className='adnvulrwbxh df-l'>
                    <Dropbox />
                    <h2>សេវ៉ាកម្មមាន</h2>
                  </div>
                  <div className='adnvulrw-con'>
                    <blockquote>
                      <h2>មានចំនួន ១០</h2>
                      <p>សរសេរសេវ៉ាកម្មបង្ហោះរាល់ថ្ងៃដើម្បីទទួលបានការចាប់អារម្មណ៍ និងការទាក់ទងបង្កើត។</p>
                    </blockquote>
                  </div>
                  <div className='adnvulrw-action df-r'>
                    <button type='button' className='btn'>
                      <Add size="20" variant="Linear"/>
                      បន្ថែមថ្មី
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        {isDeleting && (
            <WebLoader>កំពុងលុបទិន្នន័យ សូមរង់ចាំបន្តិច...</WebLoader>
        )}
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
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                          មិនមានទិន្នន័យសេវ៉ាកម្មឡើយ។
                        </td>
                      </tr>
                    ) : 
                    [...services].reverse().map(((s, index) => (
                        <tr key={s.id || index}>
                            <td>
                                <div className="box df-l">
                                    <div className="img">
                                        <img 
                                        src={s.img ? API_URL + STORAGE + s.img : "https://via.placeholder.com/150"} 
                                        alt="services Cover" 
                                        />
                                    </div>
                                    <div className="text">
                                        <h2>{s.title_kh}</h2>
                                        <blockquote>
                                            <p>{s.description_kh}</p>
                                        </blockquote>
                                        <div className='icon icon-sm txt-be'>
                                            {s.status ? <Global /> : <Lock1 />}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <button 
                                    onClick={() => handleDelete(s.id)}
                                    type="button" 
                                    className="bg-n" 
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
                                {new Date(s.created_at).toLocaleDateString('kh-KH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                                })}
                            </td>
                            <td>
                                <button onClick={() => handleOpenEdit(s)} type='button' className='df-c btn-edit-action'>
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
              
              {/* Pagination Section */}
              <div className="tb-foot df-c dn">
                <div className="box df-c">
                  <button className="icon icon-ra icon-ra-sm over-h right-05"><i className="fa-solid fa-chevron-left"></i></button>
                  <ul className="df-c">
                    <li data-id="1" className="btn icon-ra-sm active"><span>០១</span></li>
                    <li data-id="2" className="btn icon-ra-sm"><span>០២</span></li>
                    <li data-id="3" className="btn icon-ra-sm"><span>០៣</span></li>
                    <li data-id="4" className="btn icon-ra-sm"><span>០៤</span></li>
                    <li data-id="5" className="btn icon-ra-sm"><span>០៥</span></li>
                  </ul>
                  <button className="icon icon-ra icon-ra-sm over-h left-05"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}