
import { useState } from 'react';

import { Add } from 'iconsax-reactjs';
import './../assets/css/question.css';

export default function Questions(){
    const faqData = [
        {
            id: 1,
            question: "តើមានសេវ៉ាកម្មរចនាជាកញ្ចប់ដែរឬទេ? ហើយអាចស្នើសុំកែប្រែបានចំនួនប៉ុន្មានដង?",
            answer: "ពិតជាមាន! យើងមានសេវាកម្មរចនាជាច្រើនដូចជា រចនាផ្ទាំង Poster, រចនាផ្ទាំងបដា (Banner), រចនាទម្រង់ប្រវត្តិរូប (CV) និងការរចនាឡូហ្គោ។ ចំពោះការកែប្រែគឺអាស្រ័យលើកញ្ចប់នីមួយៗ៖ រចនា Banner អាចដូរបាន ១ ទៅ ៣ដង, រចនា Poster បាន ២ ទៅ ៥ដង រីឯ CV និងឡូហ្គោ អាចស្នើកែប្រែបាន ១ ទៅ ៥ដង។"
        },
        {
            id: 2,
            question: "តើកញ្ចប់គេហទំព័រ Portfolio ពិសេស (Premium Portfolios) មានរួមបញ្ចូលមុខងារអ្វីខ្លះ?",
            answer: "កញ្ចប់នេះមានតម្លៃ $50 ដោយលោកអ្នកនឹងទទួលបានគេហទំព័រចំនួន ៣ ទំព័រ (3-Page) បង្កើតឡើងដោយប្រើប្រាស់ React JS, Laravel, PHP និង Tailwind CSS។ វាមានភ្ជាប់ជាមួយប្រព័ន្ធទិន្នន័យ (Database XAMPP) ដែលអនុញ្ញាតឱ្យអ្នកបន្ថែមទិន្នន័យ ផ្លាស់ប្តូរប្រភេទ (Categories) និងធ្វើបច្ចុប្បន្នភាព Blog ឬព័ត៌មានផ្ទាល់ខ្លួនបាន។ កញ្ចប់នេះមានការធានាជូនរយៈពេល ១៥ថ្ងៃ (មិនរាប់បញ្ចូលការជួល Hosting ឡើយ)។"
        },
        {
            id: 3,
            question: "តើកញ្ចប់ថតរូបផលិតផល (Product) និងថតរូបបែប Lifestyle មានភាពខុសគ្នាយ៉ាងណាខ្លះ?",
            answer: "កញ្ចប់ទាំងពីរនេះខុសគ្នាត្រង់ការរៀបចំឧបករណ៍ ប្លង់ថត និងចំនួនរូបភាពដែលទទួលបាន៖ កញ្ចប់ថតផលិតផល ($8-15) ផ្ដោតលើការរៀបចំ ការសម្រួលពន្លឺ និងពណ៌ឱ្យបានស្អាតសម្រាប់រូបភាព ៥ ទៅ ១០សន្លឹក។ ចំណែកឯកញ្ចប់ Lifestyle ($15-25) ផ្ដោតលើការថតប្លង់ក្រៅប្លែកៗ បែបធម្មជាតិ ដោយប្រើប្រាស់ Lens ច្រើនប្រភេទ (50MM & 55-250MM) សម្រាប់រូបភាពពី ១០ ទៅ ៣០សន្លឹក។"
        },
        {
            id: 4,
            question: "តើអ្នកអាចបង្កើតប្រព័ន្ធគ្រប់គ្រងទិន្នន័យបែប Premium ដែលមានប្រព័ន្ធ Login សុវត្ថិភាពបានទេ? តម្លៃប៉ុន្មាន?",
            answer: "បាទអាចបាន! ប្រព័ន្ធគ្រប់គ្រងបែប Premium (Automation & Integration web-systems) មានតម្លៃ $250។ វាមានមុខងារ CRUD ពេញលេញ (បង្កើត, អាន, កែប្រែ, លុប) ងាយស្រួលគ្រប់គ្រងទិន្នន័យ, មានប្រព័ន្ធ Login ផ្ទាល់ខ្លួនដើម្បីសុវត្ថិភាព និងមានមុខងារកម្រិតខ្ពស់ដូចជា ភ្ជាប់ជាមួយ Telegram Bot, ទាញទិន្នន័យជា Excel និងការ Print ជាឯកសារ PDF ព្រមទាំងមានការធានាជូនរយៈពេល ១ខែពេញ។"
        },
        {
            id: 5,
            question: "សម្រាប់សេវាកម្មកែរូប និងសម្រស់ (Portrait & Beauty Edit) តើប្រើប្រាស់កម្មវិធីអ្វីខ្លះ ហើយទទួលបានរូបប៉ុន្មានសន្លឹក?",
            answer: "សម្រាប់ការកែស្បែកឱ្យម៉ដ្តស្អាត និងការតុបតែងសម្រស់កម្រិតខ្ពស់ យើងប្រើប្រាស់កម្មវិធី Adobe Lightroom, Adobe CameraRaw, Skinfinner និងកម្មវិធីជំនួយ (Plugins) អាជីពផ្សេងៗទៀត។ សេវាកម្មនេះមានតម្លៃចន្លោះពី $10-25 ដោយលោកអ្នកនឹងទទួលបានរូបភាពកែរួចពី ៦ ទៅ ១៥សន្លឹក ជាប្រភេទ JPG ឬ PNG។"
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