import { useTranslation } from 'react-i18next';

export default function Founder(){
    const { t } = useTranslation();
    return (
        <section className="abs01 abt09">
            <div className="abs01-box df-c abt09-box">
                {/* <!-- row  --> */}
                <div className="abt09r">
                    <div className="abt09rb">
                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240220462.webp" alt="vensoeng" />
                    </div>
                </div>
                {/* <!-- row  --> */}
                <div className="abt09r">
                    <div className="abt09rb">
                        <div className="abt09rh">
                            <h2>{t('founder.title')}</h2>
                        </div>
                        <div className="abt09rd">
                            <blockquote>
                                <p>{t('founder.desc')}</p>
                            </blockquote>
                        </div>
                        <div className="action">
                            <a href='/about' className="btn btn-style">
                                {t('founder.about')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};