import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL, STORAGE } from '../../utils/auth';

import {
    TimerStart,
    Location,
    DollarCircle,
    BrifecaseTick,
    Note1
} from 'iconsax-reactjs';

export default function ServiceCard({service = {} , index = 0}) {
    const { t, i18n } = useTranslation();

    const navigate = useNavigate();

    const locat = (url) => {
        navigate(url);
    }

    const isKhmer = i18n.language === 'kh';

    const rawTags = isKhmer 
        ? (service.tags_kh || service.tags) 
        : (service.tags || service.tags_kh);

    const rawActiveTags = isKhmer 
        ? (service.tags_active_kh || service.tags_active) 
        : (service.tags_active || service.tags_active_kh);

    const parseTags = (data) => {
        if (!data) return [];
        if (typeof data === 'string') return data.split(',').map((t) => t.trim());
        if (Array.isArray(data)) return data;
        return [];
    };

    const tagsList = parseTags(rawTags);
    const activeTagsList = parseTags(rawActiveTags);
    
    return (
        <div className="nsi" key={service.id || index} data-category={service?.list_id}>
            <div className="nsi-box df-c">
                <div className="nsir">
                    <div className="nsir-box">
                        <div className="nsirh">
                            <div className="status">
                                <span></span>
                                <p>{service.status === 'true' || service.status === true ? t('servicePage.card.available') : t('servicePage.card.unAvailable')}</p>
                            </div>
                            <div className="title">
                                <h2 onClick={() => locat('/services/detail/' + service.id)}>{ i18n.language === 'kh' ? service.title_kh : service.title}</h2>
                            </div>
                            <div className="descript">
                                <p onClick={() => locat('/services/detail/' + service.id)}>{i18n.language === 'kh' ? service.description_kh : service.description }</p>
                            </div>
                            <div className="has crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <div className="hasbox">
                                    {tagsList.map((tag, tagIndex) => (
                                        <div key={`tag-${tagIndex}`} className="hi btn crop-style">
                                            <span className="cpsl cp1"></span>
                                            <span className="cpsl cp2"></span>
                                            <span className="cpsl cp3"></span>
                                            <span className="cpsl cp4"></span>
                                            <div className="hi-box">
                                            <p>{tag}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {activeTagsList.map((activeTag, activeIndex) => (
                                        <div key={`active-${activeIndex}`} className="hi btn crop-style active">
                                            <span className="cpsl cp1"></span>
                                            <span className="cpsl cp2"></span>
                                            <span className="cpsl cp3"></span>
                                            <span className="cpsl cp4"></span>
                                            <div className="hi-box">
                                            <p>{activeTag}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="note crop-style">
                            <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                            <div className="not-box">
                                <div className="nti">
                                    <div className="nti-box df-l">
                                        <div className="icon icon-ra icon-sm"><TimerStart /></div>
                                        <div className="txt"><p>{i18n.language === 'kh' ? service.time_kh : service.time}</p></div>
                                    </div>
                                </div>
                                <div className="nti">
                                    <div className="nti-box df-l">
                                        <div className="icon icon-ra icon-sm"><Location /></div>
                                        <div className="txt"><p>{i18n.language === 'kh' ? service.location_kh : service.location}</p></div>
                                    </div>
                                </div>
                                <div className="nti">
                                    <div className="nti-box df-l">
                                        <div className="icon icon-ra icon-sm"><DollarCircle /></div>
                                        <div className="txt"><p>{t('servicePage.card.deposit')}: {service.deposit}%</p></div>
                                    </div>
                                </div>
                                <div className="nti">
                                    <div className="nti-box df-l">
                                        <div className="icon icon-ra icon-sm"><BrifecaseTick /></div>
                                        <div className="txt"><p>{t('servicePage.card.warranty')}: {i18n.language === 'kh' ? service.warranty_kh : service.warranty}</p></div>
                                    </div>
                                </div>
                                <div className="nti">
                                    <div className="nti-box df-l">
                                        <div className="icon icon-ra icon-sm"><Note1 /></div>
                                        <div className="txt"><p>{i18n.language === 'kh' ? service.note_kh : service.note}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nsir">
                    <div className="nsir-box">
                        <div className="mimg crop-style" onClick={() => locat('/services/detail/' + service.id)}>
                            <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                            <img className="img-c" src={API_URL + STORAGE + service.img} alt={service.title_kh || "service"} loading='lazy' />
                        </div>
                        <div className="action">
                            <div className="action-box df-s">
                                <div className="atr">
                                    <p>{t('servicePage.card.starting')}</p>
                                    <h2>${service.price_start}</h2>
                                </div>
                                <div className="atr">
                                    <Link className="btn btn-style" to={`/services/detail/${service.id}`}>
                                        <svg fill="#000000" viewBox="0 0 400 400" id="Send" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <g id="XMLID_3_">
                                                    <polygon id="XMLID_4_" points="373.3,0 346.7,0 320,0 320,26.7 346.7,26.7 373.3,26.7 373.3,53.3 373.3,80 400,80 400,53.3 400,26.7 400,0 "></polygon>
                                                    <polygon id="XMLID_299_" points="293.3,53.3 320,53.3 320,26.7 293.3,26.7 266.7,26.7 240,26.7 240,53.3 266.7,53.3 "></polygon>
                                                    <polygon id="XMLID_300_" points="213.3,80 240,80 240,53.3 213.3,53.3 186.7,53.3 160,53.3 160,80 186.7,80 "></polygon>
                                                    <polygon id="XMLID_301_" points="133.3,106.7 160,106.7 160,80 133.3,80 106.7,80 80,80 80,106.7 106.7,106.7 "></polygon>
                                                    <polygon id="XMLID_302_" points="346.7,106.7 346.7,133.3 346.7,160 373.3,160 373.3,133.3 373.3,106.7 373.3,80 346.7,80 "></polygon>
                                                    <polygon id="XMLID_313_" points="80,133.3 80,106.7 53.3,106.7 26.7,106.7 26.7,133.3 53.3,133.3 "></polygon>
                                                    <rect height="26.7" id="XMLID_314_" width="26.7" x="0" y="133.3"></rect>
                                                    <polygon id="XMLID_315_" points="186.7,160 160,160 133.3,160 106.7,160 80,160 53.3,160 26.7,160 26.7,186.7 53.3,186.7 80,186.7 106.7,186.7 133.3,186.7 160,186.7 186.7,186.7 213.3,186.7 213.3,160 "></polygon>
                                                    <polygon id="XMLID_316_" points="320,186.7 320,213.3 320,240 346.7,240 346.7,213.3 346.7,186.7 346.7,160 320,160 "></polygon>
                                                    <polygon id="XMLID_317_" points="293.3,266.7 293.3,293.3 293.3,320 320,320 320,293.3 320,266.7 320,240 293.3,240 "></polygon>
                                                    <polygon id="XMLID_318_" points="240,320 240,293.3 240,266.7 240,240 240,213.3 240,186.7 213.3,186.7 213.3,213.3 213.3,240 213.3,266.7 213.3,293.3 213.3,320 213.3,346.7 213.3,373.3 240,373.3 240,346.7 "></polygon>
                                                    <polygon id="XMLID_319_" points="266.7,346.7 266.7,373.3 293.3,373.3 293.3,346.7 293.3,320 266.7,320 "></polygon>
                                                    <rect height="26.7" id="XMLID_320_" width="26.7" x="240" y="373.3"></rect>
                                                </g>
                                            </g>
                                        </svg>
                                        {t('servicePage.card.detail')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
