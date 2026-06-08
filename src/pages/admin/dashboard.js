import { useEffect, useState } from 'react';
import { API_URL, STORAGE, getAuthUser } from '../../utils/auth';
import { ExportCircle } from 'iconsax-reactjs';

// import Form from '../../components/common/Form';

import '../../assets/css/admin/dashboard.css';

export default function Dashboard() {
  const [me, setMe] = useState(null);

  useEffect(() => {
    const authUser = getAuthUser();
    setMe(authUser);
  }, []);

  if (!me) {
    return <div style={{ padding: '20px' }}>កំពុងទាញយកទិន្នន័យ...</div>;
  }

  return (
    <div>
      {/* <Form /> */}
      <div className='admin-content'>
        <div className='adincard'>
          <div className='box'>
            <div className='pr-main'>
              <div className='pr-img'>
                <img
                  className='img-c'
                  src={`${API_URL}${STORAGE}${me.pr_img}`}
                  width={35}
                  alt="User profile"
                />
              </div>
            </div>
            <div className='sub'>
              <div className='sub-box'>
                <h2>សួស្ដី {me.firstName} {me.lastName} ជាទីស្រលាញ់!</h2>
                <blockquote>
                  <p>
                    យើងបានពិនិត្យឃើញថាបច្ចុប្បន្នអ្នកស្មោះពេកហើយ អ្នកគួរតែឆ្លៀតពេលឱ្យខ្លួនឯងចេះសាវ៉ាខ្លះ កុំស្មោះពេកអាស្មោះ។
                    យើងឃើញថាអ្នកជិតដល់ថ្ងៃបង់អង្គការហើយ ប្រញាប់រកប្រាក់ឱ្យគ្រប់។
                  </p>
                </blockquote>
                <div className='adincard-action'>
                  <a href='/' className='btn'>ធ្វើការបង់ប្រាក់</a>
                </div>
              </div>
            </div>
            <div className='adincardbox-action'>
              <a href='/' className='icon icon-sm df-c over-h'>
                <ExportCircle />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}