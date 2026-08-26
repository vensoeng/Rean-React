
import { useState } from 'react';

import { Add } from 'iconsax-reactjs';
import './../assets/css/question.css';

export default function Questions(){
    const faqData = [
        {
            id: 1,
            question: "តើ SOENG DigitalCore ផ្តល់សេវាកម្មអ្វីខ្លះ?",
            answer: "Soeng DigitalCore ផ្តល់សេវាអភិវឌ្ឍ និងរចនាដំណោះស្រាយឌីជីថលសម្រាប់អាជីវកម្ម ដូចជា Website, Web System, Mobile App, Automation & Integration, UI/UX Design និង Graphic Design។ យើងអាចជួយចាប់ពីការរៀបចំគំនិត រចនា អភិវឌ្ឍ រហូតដល់ប្រគល់ និងការធានាចាំដោះស្រាយប្រព័ន្ធ។"
        },
        {
            id: 2,
            question: "ខ្ញុំមិនទាន់ដឹងថាត្រូវការប្រព័ន្ធអ្វី អាចពិភាក្សាមុនបានទេ?",
            answer: "អ្នកអាចប្រាប់យើងពី បញ្ហាដែលអាជីវកម្មកំពុងជួបប្រទះ មុន មិនចាំបាច់ត្រូវដឹងថាត្រូវបង្កើតប្រព័ន្ធអ្វីឡើយ។ យើងអាចជួយវិភាគតម្រូវការ និងណែនាំដំណោះស្រាយដែលសមស្របជាងគេ។"
        },
        {
            id: 3,
            question: "តើតម្លៃសេវាកម្មកំណត់ដោយរបៀបណា?",
            answer: "តម្លៃអាស្រ័យលើ ទំហំគម្រោង ចំនួនមុខងារ កម្រិតនៃការរចនា ការភ្ជាប់ប្រព័ន្ធផ្សេងៗ និងតម្រូវការពិសេស។ សេវាដែលមានតម្លៃចាប់ផ្តើមច្បាស់ នឹងបង្ហាញតម្លៃនៅលើទំព័រសេវាកម្ម ខណៈគម្រោង Custom នឹងត្រូវពិភាក្សាជាមុនសិន។"
        },
        {
            id: 4,
            question: "តើត្រូវចំណាយពេលប៉ុន្មានដើម្បីបញ្ចប់គម្រោង?",
            answer: "រយៈពេលអាស្រ័យលើទំហំ និងភាពស្មុគស្មាញរបស់គម្រោង។ គម្រោងតូចអាចចំណាយពេលខ្លី ខណៈប្រព័ន្ធ ឬ App ដែលមានមុខងារច្រើនអាចត្រូវការពេលបន្ថែម។ យើងនឹងកំណត់ Scope និង Timeline ជាមួយអ្នកមុនចាប់ផ្តើម។"
        },
        {
            id: 5,
            question: "តើបន្ទាប់ពីប្រគល់ Website/System ហើយ មាន Support ដែរឬទេ?",
            answer: "សេវានីមួយៗនឹងមានលក្ខខណ្ឌ Warranty ឬ Support ខុសៗគ្នា ដែលនឹងបង្ហាញនៅលើ Service Detail។ សម្រាប់ការកែប្រែ ឬបន្ថែមមុខងារដែលនៅក្រៅ Warranty អាចត្រូវបានគិតថ្លៃបន្ថែម។"
        },
        {
            id: 6,
            question: "តើខ្ញុំត្រូវត្រៀមអ្វីខ្លះ មុនចាប់ផ្តើមគម្រោង?",
            answer: "ជាទូទៅ អ្នកអាចត្រៀម គោលបំណងរបស់គម្រោង ព័ត៌មានអាជីវកម្ម Logo/Brand Assets មុខងារដែលចង់បាន និងឧទាហរណ៍ដែលអ្នកចូលចិត្ត ប្រសិនបើមាន។ ប៉ុន្តែប្រសិនបើអ្នកមិនទាន់មានអ្វីច្បាស់ យើងអាចចាប់ផ្តើមពីការពិភាក្សាតម្រូវការជាមុន។"
        },
        {
            id: 7,
            question: "តើខ្ញុំអាចស្នើសុំកែប្រែ (Revision) មុខងារ ឬ Layout បានចំនួនប៉ុន្មានដង?",
            answer: "ខ្ញុំផ្តល់ជូនការកែប្រែដោយមិនកំណត់ចំនួនដងឡើយ នៅក្នុងដំណាក់កាលរចនាគំរូ (UI/UX Design Stage) រហូតទាល់តែលោកអ្នកពេញចិត្ត។ បន្ទាប់ពីការយល់ព្រមលើគំរូ និងឈានចូលដល់ដំណាក់កាលសរសេរកូដ (Development) លោកអ្នកអាចស្នើសុំកែសម្រួលបន្ថែមបានទៅតាមទំហំការងារដែលបានព្រមព្រៀងគ្នាក្នុងកិច្ចសន្យាដំបូង។"
        },
        {
            id: 8,
            question: "តើត្រូវទាក់ទង SOENG DigitalCore ដូចម្តេច ដើម្បីចាប់ផ្តើមគម្រោង?",
            answer: "អ្នកអាចទាក់ទងមកយើងតាមបណ្តាញទំនាក់ទំនងដែលមាននៅលើ Website។ ប្រាប់យើងពី អ្វីដែលអ្នកចង់បង្កើត ឬបញ្ហាដែលអាជីវកម្មរបស់អ្នកកំពុងជួបប្រទះ ហើយយើងនឹងពិភាក្សាអំពីតម្រូវការ និងជំហានបន្ទាប់។"
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