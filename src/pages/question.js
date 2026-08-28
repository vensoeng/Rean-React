
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Add } from 'iconsax-reactjs';
import './../assets/css/question.css';

export default function Questions(){
    const { t } = useTranslation();
    const faqData = [
        {
            id: 1,
            question: t('faq.q1'),
            answer: t('faq.a1')
        },
        {
            id: 2,
            question:  t('faq.q2'),
            answer: t('faq.a2')
        },
        {
            id: 3,
            question: t('faq.q3'),
            answer: t('faq.a3')
        },
        {
            id: 4,
            question: t('faq.q4'),
            answer: t('faq.a4')
        },
        {
            id: 5,
            question: t('faq.q5'),
            answer: t('faq.a6')
        },
        {
            id: 6,
            question: t('faq.q6'),
            answer: t('faq.a6')
        },
        {
            id: 7,
            question: t('faq.q7'),
            answer: t('faq.a7'),
        },
        {
            id: 8,
            question: t('faq.q8'),
            answer: t('faq.a8')
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
                        <h2>{t('faq.title')}</h2>
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