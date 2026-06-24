
import { useState } from 'react';

import { Add } from 'iconsax-reactjs';
import './../assets/css/question.css';

export default function Questions(){
    const faqData = [
        {
            id: 1,
            question: "តើគម្រោងគេហទំព័រ ឬប្រព័ន្ធគ្រប់គ្រងនីមួយៗ ចំណាយពេលអភិវឌ្ឍប៉ុន្មានថ្ងៃ?",
            answer: "រយៈពេលនៃការធ្វើគឺអាស្រ័យទៅលើទំហំ និងមុខងារនៃគម្រោងជាក់ស្តែង។ ជាទូទៅ សម្រាប់គេហទំព័រក្រុមហ៊ុន ឬ Premium Portfolio អាចចំណាយពេលពី ៧ ទៅ ១៤ ថ្ងៃ។ ចំណែកឯប្រព័ន្ធគ្រប់គ្រងទិន្នន័យកម្រិត Premium ដែលមានមុខងារស្មុគស្មាញ អាចចំណាយពេលពី ២ ទៅ ៤ សប្តាហ៍ រួមទាំងការតេស្តប្រព័ន្ធ (QA Testing) មុននឹងដាក់ឱ្យដំណើរការផ្លូវការ។"
        },
        {
            id: 2,
            question: "តើខ្ញុំអាចស្នើសុំកែប្រែ (Revision) មុខងារ ឬ Layout បានចំនួនប៉ុន្មានដង?",
            answer: "ខ្ញុំផ្តល់ជូនការកែប្រែដោយមិនកំណត់ចំនួនដងឡើយ នៅក្នុងដំណាក់កាលរចនាគំរូ (UI/UX Design Stage) រហូតទាល់តែលោកអ្នកពេញចិត្ត។ បន្ទាប់ពីការយល់ព្រមលើគំរូ និងឈានចូលដល់ដំណាក់កាលសរសេរកូដ (Development) លោកអ្នកអាចស្នើសុំកែសម្រួលបន្ថែមបានទៅតាមទំហំការងារដែលបានព្រមព្រៀងគ្នាក្នុងកិច្ចសន្យាដំបូង។"
        },
        {
            id: 3,
            question: " ចំពោះប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ (Premium System) តើមានការធានាសុវត្ថិភាព និងល្បឿនកម្រិតណា?",
            answer: "គ្រប់ប្រព័ន្ធគ្រប់គ្រងទាំងអស់ត្រូវបានបង្កើតឡើងដោយផ្តោតលើសុវត្ថិភាពខ្ពស់ (Secure Login System) ដោយប្រើប្រាស់បច្ចេកវិទ្យាទំនើបៗដូចជា React JS, Laravel, និង Node Express។ ទិន្នន័យទាំងអស់ត្រូវបានរក្សាទុកដោយប្រព័ន្ធដាតាបេសដែលមានសុវត្ថិភាព និងត្រូវបាន Optimize កូដយ៉ាងលម្អិត ដើម្បីធានាបាននូវល្បឿនលឿន រលូន ទោះបីជាមានទិន្នន័យច្រើន ឬប្រើប្រាស់ច្រើនក្នុងពេលតែមួយក៏ដោយ។"
        },
        {
            id: 4,
            question: "តើមានសេវាកម្មជំនួយបច្ចេកទេស និងថែទាំ (Support & Maintenance) ក្រោយពេលប្រព័ន្ធដាក់ឱ្យដំណើរការដែរឬទេ?",
            answer: "ពិតជាមាន! ខ្ញុំមានការធានា និងតាមដានជួយដោះស្រាយបញ្ហាបច្ចេកទេស (Bugs & Errors) ជូនដោយឥតគិតថ្លៃក្នុងរយៈពេល ១៥ថ្ងៃ ទៅ ១ ខែ (ទៅតាមប្រភេទគម្រោង) បន្ទាប់ពីប្រព័ន្ធត្រូវបាន Deploy រួចរាល់។ លោកអ្នកក៏អាចស្នើសុំកញ្ចប់ថែទាំប្រចាំឆ្នាំ ដើម្បីធានាថាប្រព័ន្ធ ឬគេហទំព័រដើរបានរលូន និងមានសុវត្ថិភាពជាប្រចាំ។"
        },
        {
            id: 5,
            question: "បើសិនជាខ្ញុំចង់ភ្ជាប់ប្រព័ន្ធ Notification ជាមួយ Telegram Bot តើអាចធ្វើទៅបានទេ?",
            answer: "អាចធ្វើបានយ៉ាងងាយស្រួល! ខ្ញុំមានជំនាញច្បាស់លាស់ក្នុងការបង្កើត និងតភ្ជាប់ Telegram Bot ជាមួយប្រព័ន្ធគ្រប់គ្រងទិន្នន័យ។រាល់ពេលមានប្រតិបត្តិការថ្មី ការចុះឈ្មោះ ឬការបញ្ជាទិញនៅលើវេបសាយ ប្រព័ន្ធនឹងផ្ញើសារជូនដំណឹង (Real-time Notification) ទៅកាន់ Group Telegram របស់លោកអ្នកភ្លាមៗ។"
        }
    ];

    const [activeId, setActiveId] = useState(null);
    const handleToggle = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return(
        <section className='wqu'>
            <div className="wqu-box">
                {/* head */}
                <div className="wqu-h">
                    <div className="wquh-box df-c">
                        <h2>សំណួរទទួលបានពីអតិថិជនរឿយៗ?</h2>
                    </div>
                </div>
                
                <div className="wqu-c">
                    <ul className="wquc-box">
                        {faqData.map((item) => {
                            const isActive = activeId === item.id;

                            return (
                                <li 
                                    key={item.id} 
                                    className={isActive ? 'active' : ''}
                                >
                                    <div className='qul-h' onClick={() => handleToggle(item.id)} style={{ cursor: 'pointer' }}>
                                        <div className="qulh-box df-s">
                                            <h3>{item.question}</h3>
                                            <div className='icon icon-ra icon-sm'>
                                                <Add style={{ transform: isActive ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='qul-c'>
                                        <blockquote className='qulc-box'>
                                            <p>{item.answer}</p>
                                        </blockquote>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}