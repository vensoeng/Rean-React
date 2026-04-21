import '../assets/css/home.css';
import Button from '../components/common/button';
import { Record, Hashtag, Book1 } from 'iconsax-reactjs';
import AboutPage from './about';
import StoryPage from './story';
export default function HomePage()
{
    return(
        <main className="web-main">
            <div className="main-body">
                <div className="mb-box">
                    {/* this is is head of home page  */}
                    <section className="head">
                        <blockquote>
                            <h2>
                                បង្កើតដំណោះស្រាយប្រកបដោយភាពច្នៃប្រឌិត និងមានប្រសិទ្ធភាព
                                គេហទំព័រនិងទូរស័ព្ទ។
                            </h2>
                            <p>សួស្តី ខ្ញុំឈ្មោះវិនសឹង្ហ ហើយខ្ញុំជាអ្នកអភិវឌ្ឍន៍ជាមួយនឹងបទពិសោធន៍ក្នុងភាសាសរសេរកម្មវិធី និងក្របខ័ណ្ឌផ្សេងៗ។</p>
                            <div className='list-btn'>
                                <div className='df-c'>
                                    <Button>ទាញយកប្រវត្តរូប</Button>
                                    <Button>
                                        <Book1/>
                                        ទិដ្ឋពីក្រោយជីវិត
                                    </Button>
                                </div>
                                <p>Open source platform!</p>
                            </div>
                        </blockquote>
                    </section>
                    {/* this is is about my skill  */}
                    <section className='skill'>
                        <div className='sk-box'>
                            <div className='sk-head'>
                                <div className='skh-box df-l'>
                                    <div className='list-icon'>
                                        <Record/>
                                        <Record/>
                                        <Record/>
                                    </div>
                                </div>
                            </div>
                            <div className='sk-con'>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2021 - 2022</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Basic English</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Basic computer</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Computer network system</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Adobe Photoshop, Premiere pro</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Microsoft basic</p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2022 - 2023</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Project paper (python)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Advance Java programing</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Web development programing (HTML + CSS + JS)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Computer Graphic designs (Photoshop)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>MData structure and algorithm program (python)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Digital marketing </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Web technology (Angular + Node express basic) </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Network administrator</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Linux open source</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2023 - 2024</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Mobile Application development (Flutter)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Open source Technology (Laravel + XAMP) </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Net programing (ASP.net)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Research Methodology</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Database Administrator (Microsoft SQL server) </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2024 - 2025</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Electronic Ecommerce (Ecommerce introduction + WordPress + Laravel)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Big data Analytics</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Advance programming (Node express)</p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Software Engineer and project management </p>
                                            </li>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>Machine Learning (Basic)</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='skc-box df-s'>
                                    <div className='row'>
                                        <div className='row-head'>
                                            <h2>2025 - 2026 Fut</h2>
                                        </div>
                                        <ul>
                                            <li className="df-l">
                                                <Hashtag/>
                                                <p>React JS, Vue.js, Flutter, Network, Node Express.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* this is read node */}
                    <section className='read-node'>
                        <div className='rn-head'>
                            <div className='rnh-box'>
                                <h2>Start up with background Project Experience.</h2>
                            </div>
                        </div>
                        <div className='rn-con'>
                            <ul className='df-c'>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>Student Management System</p>
                                    </blockquote>
                                </li>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>Static Website Project</p>
                                    </blockquote>
                                </li>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>E-Library Management System</p>
                                    </blockquote>
                                </li>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>Pagoda Management System</p>
                                    </blockquote>
                                </li>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>E-Portfolio Website</p>
                                    </blockquote>
                                </li>
                            </ul>
                            <ul className='df-c'>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>Pagoda Management System</p>
                                    </blockquote>
                                </li>
                                <li className='df-c'>
                                    <blockquote>
                                        <p>E-commerce Website</p>
                                    </blockquote>
                                </li>
                            </ul>
                        </div>
                    </section>
                    {/* this is about page  */}
                    <AboutPage/>  
                    {/* this is show my story  */}
                    <StoryPage />
                </div>
            </div>
        </main>
    )
}