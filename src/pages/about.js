import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../utils/auth';
import './../assets/css/about.css';

// import aboutImg from './../assets/img/vensoeng.png';
// import nmuLogo from './../assets/img/nmu_logo.jpg';
// import Button from '../components/common/button';

// founder Component
import Founder from '../components/common/founder';

// import StudyList from '../components/common/ListStudy';

// import { MessageText1, Profile2User, Activity, Blur, Code, Cd, ArrowRight} from 'iconsax-reactjs';
import Slider from '../components/common/Slider'; 

export default function AboutPage({active = true})
{
    const { t } = useTranslation();

    const slideImages = [
        API_URL + "/storage/data/url/1786239986077.webp",
        API_URL + "/storage/data/url/1786245883296.webp",
        API_URL + "/storage/data/url/1786245970075.webp",
        API_URL + "/storage/data/url/1786245970075.webp",
        API_URL + '/storage/data/url/1786246015426.webp',
        API_URL + '/storage/data/url/1786246055514.webp',
        API_URL + '/storage/data/url/1786246086142.webp'
    ];

    return (
    <main className={active ? "web-main about-main-active" : "web-main"}>
        {/* update priview card share  */}
        <Helmet>
            <title>SOENG DigitalCore | About Business</title>
            <meta name="description" content="Creative and effective solutions for websites and mobile." />
            <meta property="og:title" content="VenSoeng - About Business" />
            <meta property="og:description" content="Creative and effective solutions for websites and mobile." />
            <meta property="og:url" content="https://vensoeng.vercel.app/storys" />
        </Helmet>
        <div className="abus08">
            {/* <!-- hero  --> */}
            <section className="uh09">
                <div className="uh09-box df-c">
                    <div className="row">
                        <div className="rbox">
                            <blockquote>
                                <h2 className="web">{t('aboutPage.hero.title')}</h2>
                                <p>
                                    {t('aboutPage.hero.desc')}
                                </p>
                                <div className="action df-l">
                                    <a href="/services" className="btn">{t('homePage.hero.services')}</a>
                                    <a href="http://facebook.com/vensoeng" className="btn">{t('homePage.services.discuss')}</a>
                                </div>
                            </blockquote>
                            <div className="txt">{t('aboutPage.hero.business')}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="rbox">
                            <div className="rbh df-c">
                                <p>Startup</p>
                            </div>
                            <div className="data-side">
                                <div className="datasbox">
                                    {/* <!-- this is slide  --> */}
                                    <Slider images={slideImages}/>
                                </div>
                            </div>
                            <div className="rbh">
                            <p>Our Teeam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        {/* <!-- why choose when soeng  --> */}
        <section className="abs01">
            <div className="abs01-box">
                {/* <!-- for add background  --> */}
                <div className="hbg"></div>
                {/* <!-- header  --> */}
                <div className="sh df-c">
                    <div className="sh-box">
                        <h2>
                            {t('aboutPage.why.title')}
                        </h2>
                    </div>
                </div>
                <div className="sc">
                    <div className="scbox">
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>{t('aboutPage.why.fit.title')}</h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.why.fit.desc')}</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>{t('aboutPage.why.future.title')}</h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.why.future.desc')}</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>{t('aboutPage.why.communication.title')}</h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.why.communication.desc')}</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>{t('aboutPage.why.usable.title')}</h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.why.usable.desc')}</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>{t('aboutPage.why.support.title')}</h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.why.support.desc')}</p>
                                </blockquote>
                            </div>
                        </div>
                        {/* <!-- row  --> */}
                        <div className="item">
                            <div className="ibox">
                                <div className="ih">
                                    <h3>
                                        {t('aboutPage.cta.title')} <br />
                                    </h3>
                                </div>
                                <blockquote>
                                    <p>{t('aboutPage.cta.desc')}</p>
                                </blockquote>
                                <div className="action">
                                    <a href="https://t.me/vensoeng" className="btn btn-style">{t('aboutPage.cta.button')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- for add background  --> */}
                <div className="hbg bgs" style={{ borderTop: "none" }}></div>
            </div>
        </section>
        {/* <!-- business history  --> */}
        <section className="abs01">
            <div className="abs01-box stlc df-c">
                {/* <!-- this is row  --> */}
                <div className="stlr">
                    <div className="stlr-box">
                        {/* <!-- head  --> */}
                        <div className="stlrh">
                            <blockquote>
                                <h2>{t('aboutPage.story.title')} </h2>
                                <p>{t('aboutPage.story.intro')}</p>
                            </blockquote>
                        </div>
                        <div className="stlrimg">
                            <div className="db-c btn-style">
                                <img src="https://vensoengapi.vercel.app/storage/data/url/1786239986077.webp" alt="campany_img" />
                            </div>
                        </div>
                        <div className="hbg bgs"></div>
                    </div>
                </div>
                {/* <!-- ths is row  --> */}
                <div className="stlr">
                    <div className="stlr-box">
                        <div className="creatd">
                            <p>{t('aboutPage.story.year')}</p>
                        </div>
                        <div className="stlrsl">
                            <div className="db-c">
                                <blockquote className="crop-style">
                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                    <p>{t('aboutPage.story.p1')}</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="stlrsl">
                            <div className="db-c">
                                <blockquote className="crop-style">
                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                    <p>{t('aboutPage.story.p2')}</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="stlrsl">
                            <div className="db-c">
                                <blockquote className="crop-style">
                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                    <p>{t('aboutPage.story.p3')}</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="stlrsl">
                            <div className="db-c">
                                <blockquote className="crop-style">
                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                    <p>{t('aboutPage.story.p4')}</p>
                                </blockquote>
                            </div>
                        </div>
                        <div className="stlrsl">
                            <div className="db-c">
                                <blockquote className="crop-style">
                                    <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                    <p>{t('aboutPage.story.p5')}</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        {/* <!-- vision and mision  --> */}
        <section className="abs01 vimis">
            <div className="abs01-box vimi df-c">
                {/* <!-- row  --> */}
                <div className="vimir">
                    <div className="vimir-box"></div>
                </div>
                {/* <!-- row  --> */}
                <div className="vimir">
                    <div className="vimir-box">
                        <div className="vimirc">
                            <blockquote>
                                <h2>{t('aboutPage.vision.title')}</h2>
                                <p><strong>{t('aboutPage.vision.headline')}</strong></p>
                                <p>{t('aboutPage.vision.desc')}</p>
                            </blockquote>
                        </div>
                        <div className="vimirc">
                            <blockquote>
                                <h2>{t('aboutPage.mission.title')}</h2>
                                <p><strong>{t('aboutPage.mission.headline')}</strong></p>
                                <p>{t('aboutPage.mission.desc')}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- style  --> */}
        <section className="abs01">
            <div className="abs01-box">
                <div className="hbg bgs" style={{ borderTop: "none" }}></div>
            </div>
        </section>
        {/* <!-- Statistics --> */}
        <section className="abs01 sts">
            <div className="abs01-box sts-c">
                {/* <!-- header  --> */}
                <div className="stsh df-l">
                    <div className="stsh-box">
                        <h2>{t('aboutPage.stats.title')}</h2>
                    </div>
                </div>
                <div className="sts-b df-s">
                    {/* <!-- list  --> */}
                    <div className="stsl df-c">
                        <div className="stslb">
                            <h3>15+</h3>
                            <p>{t('aboutPage.stats.projects')}</p>
                        </div>
                    </div>
                    {/* <!-- list  --> */}
                    <div className="stsl df-c">
                        <div className="stslb">
                            <h3>3+</h3>
                            <p>{t('aboutPage.stats.clients')}</p>
                        </div>
                    </div>
                    {/* <!-- list  --> */}
                    <div className="stsl df-c">
                        <div className="stslb">
                            <h3>5+</h3>
                            <p>{t('aboutPage.stats.support')}</p>
                        </div>
                    </div>
                    {/* <!-- list  --> */}
                    <div className="stsl df-c">
                        <div className="stslb">
                            <h3>2024</h3>
                            <p>{t('aboutPage.stats.started')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- style  --> */}
        <section className="abs01">
            <div className="abs01-box">
                <div className="hbg bgs" style={{ borderTop: "none" }}></div>
            </div>
        </section>
        {/* <!-- Teamworkproject  --> */}
        <section className="abs01">
            <div className="abs01-box twp">
                <div className="twp-c">
                    {/* <!-- .row  --> */}
                    <div className="twp-r">
                        <div className="twprb">
                            <div className="top crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>Teamwork Project</p>
                            </div>
                            <div className="title">
                                <h2>{t('aboutPage.team.title')}</h2>
                            </div>
                            <div className="twpn">
                                <p>{t('aboutPage.team.agri')}<br /> {t('aboutPage.team.agriEn')}</p>
                            </div>
                            <div className="twpn">
                                <p>{t('aboutPage.team.shop')}<br /> {t('aboutPage.team.shopEn')}</p>
                            </div>
                        </div>
                    </div>
                    {/* <!-- .row  --> */}
                    <div className="twp-r">
                        <div className="twprb">
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240220462.webp" alt="vensoeng" />
                                    </div>
                                    <blockquote>
                                        <h2>Soeng</h2>
                                        <p>Developer & Hacker</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240252045.webp" alt="reangsey" />
                                    </div>
                                    <blockquote>
                                        <h2>Reangsey</h2>
                                        <p>Project Presenter</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240361951.webp" alt="nil" />
                                    </div>
                                    <blockquote>
                                        <h2>Nil</h2>
                                        <p>Developer & Hustler</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240386190.webp" alt="yee" />
                                    </div>
                                    <blockquote>
                                        <h2>Yee</h2>
                                        <p>Accounting-Consultation</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240422108.webp" alt="mengchit" />
                                    </div>
                                    <blockquote>
                                        <h2>Mengchit</h2>
                                        <p>Developer & Tester</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240450339.webp" alt="sokhenrin" />
                                    </div>
                                    <blockquote>
                                        <h2>Sokharin</h2>
                                        <p>Handler</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240521711.webp" alt="tetenak" />
                                    </div>
                                    <blockquote>
                                        <h2>Ratanak</h2>
                                        <p>Developer & Tester</p>
                                    </blockquote>
                                </div>
                            </div>
                            {/* <!-- list  --> */}
                            <div className="twprl">
                                <div className="twprlb">
                                    <div className="img btn-style">
                                        <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1786240472240.webp" alt="khaimbor" />
                                    </div>
                                    <blockquote>
                                        <h2>Khaimbor</h2>
                                        <p>Hipster</p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- style  --> */}
        <section className="abs01">
            <div className="abs01-box">
                <div className="hbg bgs"></div>
            </div>
        </section>
        {/* <!-- style  --> */}
        <Founder />

        </div>
    </main>
    );   
}