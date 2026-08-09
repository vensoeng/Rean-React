import { Helmet } from 'react-helmet-async';
import { API_URL } from '../utils/auth';
import './../assets/css/about.css';

// import aboutImg from './../assets/img/vensoeng.png';
// import nmuLogo from './../assets/img/nmu_logo.jpg';
// import Button from '../components/common/button';

// import StudyList from '../components/common/ListStudy';

// import { MessageText1, Profile2User, Activity, Blur, Code, Cd, ArrowRight} from 'iconsax-reactjs';
import Slider from '../components/common/Slider'; 

export default function AboutPage({active = true})
{

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
          <title>VenSoeng - About Business</title>
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
                            <h2 className="web">បង្កើត Website & App ដែលសមនឹងអាជីវកម្មរបស់លោកអ្នក</h2>
                            <p>
                                VenSoeng Business គឺជាស្ទូឌីយោឌីជីថលដែលផ្តោតលើការអភិវឌ្ឍ Web & App សម្រាប់អាជីវកម្មខ្នាតតូច និងមធ្យម។ យើងជួយអតិថិជនបង្កើតដំណោះស្រាយឌីជីថលដែលមានភាពទំនើប ងាយស្រួលប្រើប្រាស់ មានសុវត្ថិភាព និងអាចអភិវឌ្ឍបន្ថែមបានតាមតម្រូវការរបស់អាជីវកម្មនាពេលអនាគត់។
                            </p>
                            <div className="action df-l">
                                <a href="/services" className="btn">មើលសេវាកម្ម</a>
                                <a href="http://facebook.com/vensoeng" className="btn">ពិភាក្សាគម្រោង</a>
                            </div>
                        </blockquote>
                        <div className="txt">Our Business.</div>
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
                        ហេតុអ្វីត្រូវជ្រើសរើស
                        VenSoeng business?
                    </h2>
                </div>
            </div>
            <div className="sc">
                <div className="scbox">
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>ដំណោះស្រាយស្របតាមអាជីវកម្ម</h3>
                            </div>
                            <blockquote>
                                <p>យើងសិក្សាពីតម្រូវការអាជីវកម្មរបស់អ្នក ដើម្បីបង្កើតដំណោះស្រាយដែលសមស្រប និងអាចប្រើប្រាស់បានពិតប្រាកដ។</p>
                            </blockquote>
                        </div>
                    </div>
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>គិតពីការរីកចម្រើនរបស់អាជីវកម្ម</h3>
                            </div>
                            <blockquote>
                                <p>យើងមិនត្រឹមតែអភិវឌ្ឍគម្រោងសម្រាប់ថ្ងៃនេះទេ ប៉ុន្តែគិតគូរអំពីការពង្រីក និងការអភិវឌ្ឍនាពេលអនាគត ដើម្បីឱ្យប្រព័ន្ធអាចរីកចម្រើនជាមួយអាជីវកម្មរបស់អ្នក។</p>
                            </blockquote>
                        </div>
                    </div>
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>ទំនាក់ទំនងច្បាស់លាស់ និងធ្វើការជាដៃគូ</h3>
                            </div>
                            <blockquote>
                                <p>យើងស្តាប់គំនិត និងតម្រូវការរបស់អ្នក រាយការណ៍វឌ្ឍនភាពជាប្រចាំ និងធ្វើការរួមគ្នានៅគ្រប់ដំណាក់កាល ដើម្បីឱ្យលទ្ធផលចុងក្រោយស្របតាមគោលដៅអាជីវកម្ម។</p>
                            </blockquote>
                        </div>
                    </div>
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>បច្ចេកវិទ្យាទំនើប និងប្រសិទ្ធភាពខ្ពស់</h3>
                            </div>
                            <blockquote>
                                <p>យើងប្រើបច្ចេកវិទ្យាទំនើបដើម្បីអភិវឌ្ឍប្រព័ន្ធដែលមានល្បឿនលឿន សុវត្ថិភាព និងអាចពង្រីកបន្ថែមនាពេលអនាគត។</p>
                            </blockquote>
                        </div>
                    </div>
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>ផ្ដល់ការធានាបន្ទាប់ពីដាក់ឱ្យប្រើប្រាស់</h3>
                            </div>
                            <blockquote>
                                <p>ការងារមិនបញ្ចប់នៅថ្ងៃប្រគល់គម្រោងទេ។ យើងបន្តផ្ដល់ការធានា ដោះស្រាយបញ្ហា និងផ្តល់ការណែនាំ ដើម្បីឱ្យប្រព័ន្ធរបស់អ្នកដំណើរការបានល្អក្នុងរយៈពេលវែង។</p>
                            </blockquote>
                        </div>
                    </div>
                    {/* <!-- row  --> */}
                    <div className="item">
                        <div className="ibox">
                            <div className="ih">
                                <h3>
                                    មានគម្រោងមួយនៅក្នុងចិត្តមែនទេ? <br />
                                </h3>
                            </div>
                            <blockquote>
                                <p>ពិភាក្សាជាមួយយើង ដើម្បីស្វែងរកវិធីដែលសមស្របសម្រាប់អាជីវកម្មរបស់អ្នក។</p>
                            </blockquote>
                            <div className="action">
                                <a href="https://t.me/vensoeng" className="btn btn-style">ទំនាក់ទំនងឥឡូវនេះ</a>
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
                            <h2>អំពី VenSoeng Business</h2>
                            <p>ចាប់ផ្តើមពីគំនិតតូចមួយ ដើម្បីបង្កើតដំណោះស្រាយឌីជីថលដែលមានតម្លៃសម្រាប់អាជីវកម្ម។</p>
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
                        <p>បានបង្កើតឡើងក្នុងកំឡុងឆ្នាំ២០២៤។</p>
                    </div>
                    <div className="stlrsl">
                        <div className="db-c">
                            <blockquote className="crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>ក្នុងយុគសម័យដែលបច្ចេកវិទ្យាកំពុងក្លាយជាផ្នែកដ៏សំខាន់នៃការធ្វើអាជីវកម្ម យើងជឿជាក់ថា អាជីវកម្មគ្រប់ទំហំគួរតែអាចទទួលបានដំណោះស្រាយឌីជីថលដែលមានគុណភាព មិនថាជាអាជីវកម្មថ្មី ឬអាជីវកម្មដែលកំពុងរីកចម្រើននោះទេ។</p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="stlrsl">
                        <div className="db-c">
                            <blockquote className="crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>VenSoeng business ត្រូវបានបង្កើតឡើងដោយមានគោលបំណងជួយអាជីវកម្មបង្កើត Web & APP Application និងដំណោះស្រាយឌីជីថលដែលមានគុណភាព ទំនើប និងអាចអភិវឌ្ឍបន្ថែមបានទៅតាមការរីកចម្រើនៃអាជីវកម្ម។ យើងផ្តោតលើការយល់ដឹងពីតម្រូវការរបស់អតិថិជនមុន ចាប់ផ្ដើមរចនា និងអភិវឌ្ឍដំណោះស្រាយដែលសមស្របទៅតាមគោលដៅអាជីវកម្មរបស់របស់ពួកគេ។</p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="stlrsl">
                        <div className="db-c">
                            <blockquote className="crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>យើងជឿថា គេហទំព័រ ឬប្រព័ន្ធមួយ មិនគួរមានត្រឹមតែរូបរាងស្រស់ស្អាតប៉ុណ្ណោះទេ ប៉ុន្តែត្រូវតែអាចជួយឱ្យអាជីវកម្មធ្វើការទទួលបានប្រសិទ្ធភាពខ្ពស់ មានទំនុកចិត្ត និងរចនាឱ្យប្រើប្រាសបានតាមការរីកចម្រើនក្នុងរយៈពេលវែង។</p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="stlrsl">
                        <div className="db-c">
                            <blockquote className="crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>ដោយហេតុនេះ យើងយកចិត្តទុកដាក់លើគ្រប់ដំណាក់កាលនៃការងារ ចាប់ពីការពិភាក្សាលើគម្រោង ការរៀបចំផែនការ ការរចនា UI/UX ការអភិវឌ្ឍប្រព័ន្ធ ការធ្វើតេស្ត រហូតដល់ការមើលថែបន្ទាប់ពីដាក់ឱ្យប្រើប្រាស់។ យើងមិនមើលការងារជាការប្រគល់ផលិតផលមួយប៉ុណ្ណោះទេ ប៉ុន្តែជាការកសាងទំនាក់ទំនងរយៈពេលវែងជាមួយអតិថិជន។</p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="stlrsl">
                        <div className="db-c">
                            <blockquote className="crop-style">
                                <span className="cpsl cp1"></span><span className="cpsl cp2"></span><span className="cpsl cp3"></span><span className="cpsl cp4"></span>
                                <p>សម្រាប់យើង ភាពជោគជ័យមិនមែនវាស់តាមតែចំនួនគម្រោងដែលបានបញ្ចប់នោះទេ ប៉ុន្តែវាស់តាមតម្លៃដែលយើងអាចបង្កើតជូនដល់អាជីវកម្ម និងទំនុកចិត្តដែលអតិថិជនផ្តល់ឱ្យយើង។</p>
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
                            <h2>ចក្ខុវិស័យ</h2>
                            <p><strong>ក្លាយជាដៃគូឌីជីថលដែលអាជីវកម្មទុកចិត្តសម្រាប់ការរីកចម្រើនរយៈពេលវែង</strong></p>
                            <p>យើងមានចក្ខុវិស័យក្នុងការក្លាយជាដៃគូដែលអាជីវកម្មជឿទុកចិត្ត នៅពេលត្រូវការWeb & APP Application និងសេវាកម្មឌីជីថល។ យើងចង់ឃើញអាជីវកម្មគ្រប់ទំហំ អាចប្រើប្រាស់បច្ចេកវិទ្យាដើម្បីបង្កើនប្រសិទ្ធភាពការងារ បង្កើតបទពិសោធន៍ល្អសម្រាប់អតិថិជនរបស់ពួកគេ និងរីកចម្រើនប្រកបដោយនិរន្តរភាព។</p>
                        </blockquote>
                    </div>
                    <div className="vimirc">
                        <blockquote>
                            <h2>បេសកកម្ម</h2>
                            <p><strong>បង្កើតដំណោះស្រាយឌីជីថលដែលមានគុណភាព និងមានតម្លៃសម្រាប់អាជីវកម្ម</strong></p>
                            <p>VenSoeng business ជួយអាជីវកម្មបង្កើតគេហទំព័រ WEB & APP Application និងដំណោះស្រាយឌីជីថលដែលមានគុណភាព ស្របតាមតម្រូវការជាក់ស្តែង និងអាចជួយបង្កើនប្រសិទ្ធភាពការងារ។ យើងផ្តោតលើការរចនាដែលងាយស្រួលប្រើ ការអភិវឌ្ឍដែលមានស្ថិរភាព និងផ្ដល់ការធានាបន្ទាប់ពីដាក់ឱ្យប្រើប្រាស់ ដើម្បីឱ្យអតិថិជនអាចប្រើប្រាស់ប្រព័ន្ធបានដោយទំនុកចិត្ត។</p>
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
                    <h2>តួលេខដែលបង្ហាញពីការរីកចម្រើន និងការប្តេជ្ញាចិត្តរបស់យើង</h2>
                </div>
            </div>
            <div className="sts-b df-s">
                {/* <!-- list  --> */}
                <div className="stsl df-c">
                    <div className="stslb">
                        <h3>15+</h3>
                        <p>គម្រោងដែលបានបញ្ចប់</p>
                    </div>
                </div>
                {/* <!-- list  --> */}
                <div className="stsl df-c">
                    <div className="stslb">
                        <h3>3+</h3>
                        <p>អតិថិជនដែកំពុងសហការ</p>
                    </div>
                </div>
                {/* <!-- list  --> */}
                <div className="stsl df-c">
                    <div className="stslb">
                        <h3>99.9%</h3>
                        <p>ដំណោះស្រាយដែលបានអភិវឌ្ឍ</p>
                    </div>
                </div>
                {/* <!-- list  --> */}
                <div className="stsl df-c">
                    <div className="stslb">
                        <h3>5+</h3>
                        <p>មើលថែ(Support)</p>
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
                            <h2>គម្រោងចាស់ៗ ដែលយើងបានធ្វើការងារជាក្រុម?</h2>
                        </div>
                        <div className="twpn">
                            <p>កម្មវិធីឌីជីថលស្ដីពីកសិករកម្ពុជា <br /> Digital Agri-App Cambodia.</p>
                        </div>
                        <div className="twpn">
                            <p>PLATFORM សម្រាប់លក់ទំនិញONLINE<br /> វីអ៊ិនស៊ីសប(VNCSHOP).</p>
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
                                    <p>English Speaker</p>
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
    <section className="abs01  abt09">
        <div className="abs01-box df-c abt09-box">
            {/* <!-- row  --> */}
            <div className="abt09r">
                <div className="abt09rb">
                    <img className="img-c" src="https://vensoengapi.vercel.app/storage/data/url/1785227540447.webp" alt="vensoeng" />
                </div>
            </div>
            {/* <!-- row  --> */}
            <div className="abt09r">
                <div className="abt09rb">
                    <div className="abt09rh">
                        <h2>អ្នកនៅពីក្រោយចក្ខុវិស័យ និងការរីកចម្រើន</h2>
                    </div>
                    <div className="abt09rd">
                        <blockquote>
                            <p>VenSoeng business ត្រូវបានបង្កើតឡើងដោយចក្ខុវិស័យរួមក្នុងការបង្កើតដំណោះស្រាយឌីជីថលដែលមានគុណភាព និងអាចជួយអាជីវកម្មឱ្យរីកចម្រើន។ យើងជឿជាក់លើការសហការ ការសិក្សាជាបន្តបន្ទាប់ និងការបង្កើតតម្លៃពិតប្រាកដសម្រាប់អតិថិជនតាមរយៈបច្ចេកវិទ្យា។</p>
                        </blockquote>
                    </div>
                    <div className="action">
                        <a href='https://vensoeng.github.io/' className="btn btn-style">
                            ប្រវត្តិរូបខ្ញុំ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
   </main>
 );   
}