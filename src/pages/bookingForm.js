
import './../assets/css/booking-form.css';
import { 
    ArrowLeft,
    Category, 
    SecurityUser,
    User,
    CallCalling,
    Message,
    Global,
    Box,
    Cd,
    MoneyRecive,
    Calendar,
} from 'iconsax-reactjs';

import Footer from '../components/layout/footer';

export default function BookingForm()
{
    const handleBack = () => {
        window.history.back();
    }
    return (
    <div className="bok-form">
        <div className="wbkm-box">
            {/* <!-- this is nav  --> */}
            <nav className="db-c wkf-n">
                <div className="box df-s">
                    <div className="row df-l">
                        <div className="icon icon-ra icon-sm" onClick={handleBack}>
                            <ArrowLeft />
                        </div>
                        <h1>កក់សេវ៉ាកម្ម</h1>
                    </div>
                    <div className="row">
                        <div className="icon icon-ra icon-sm">
                            <Category />
                        </div>
                    </div>
                </div>
            </nav>
            {/* <!-- this is cont --> */}
            <div className="wbkm-c">
                <div className="box">
                    {/* this is userinformation */}
                    <div className="head df-l">
                        <div className="icon icon-sm icon-ra">
                            <SecurityUser />
                        </div>
                        <h2>ព័ត៌មានទំនាក់ទំនង</h2>
                    </div>
                    <div className="infor">
                        <ul className="if-box">
                            <li>
                                <div className="li-box">
                                    <label for="#">ឈ្មោះរបស់អ្នក</label>
                                    <div className="db-c">
                                        <User />
                                        <input type="text" placeholder="Ex: Vensoeng" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">លេខទូរស័ព្ទ</label>
                                    <div className="db-c">
                                        <CallCalling />
                                        <input type="text" placeholder="+855 000-000-000" />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">គណនីអ៊ីម៉ែល</label>
                                    <div className="db-c">
                                        <Message />
                                        <input type="text" placeholder="example@gmail.com" />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* this is other contact */}
                    <div className="head df-l">
                        <div className="icon icon-sm icon-ra">
                            <Global />
                        </div>
                        <h2>ជ្រើសរើសមធ្យោបាយផ្សេងដើម្បីទំនាក់ទំនង</h2>
                    </div>
                    <div className="other-ct">
                        <ul className="df-s">
                            <li>
                                <div className="ocl-box btn">
                                    <div className="db-c">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
                                        </svg>
                                        <p>Telegram</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="ocl-box btn">
                                    <div className="db-c">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-messenger" viewBox="0 0 16 16">
                                            <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                                        </svg>
                                        <p>Facebook</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="ocl-box btn">
                                    <div className="db-c">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-outbound" viewBox="0 0 16 16">
                                            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                        <p>Call me</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="ocl-box btn">
                                    <div className="db-c">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                        </svg>
                                        <p>Email</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- this is infor service --> */}
                    <div className="head df-l">
                        <div className="icon icon-sm icon-ra">
                            <Box />
                        </div>
                        <h2>ព័ត៌មានសេវ៉ាកម្ម</h2>
                    </div>
                    <div className="ifs">
                        <ul className="ifs-box">
                            <li>
                                <div className="li-box">
                                    <label for="#">ឈ្មោះសេវ៉ាកម្ម</label>
                                    <div className="db-c">
                                        <Box />
                                        <select>
                                            <option value="#">ការរចនារូបភាព</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">ប្រភេទទាក់ទង</label>
                                    <div className="db-c">
                                       <Cd/>
                                        <select>
                                            <option value="1">កក់សេរវ៉ាកម្ម</option>
                                            <option value="0">ពិភាក្សាសេវ៉ាកម្ម</option>
                                        </select>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">តម្លៃសេវ៉ាកម្ម</label>
                                    <div className="db-c">
                                       <MoneyRecive />
                                        <input type="text" placeholder="......." />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">ថ្ងៃខែកក់</label>
                                    <div className="db-c">
                                        <Calendar />
                                        <input type="date" placeholder="......." />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="li-box">
                                    <label for="#">ពិពណ៌នាបន្លែម</label>
                                    <div className="db-c">
                                        <textarea name="#" id="#" placeholder=""></textarea>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- this is check privercy and term --> */}
                    <div className="txt-prit">
                        <div className="tpi df-l">
                            <input type="checkbox" />
                            <div className="txt">
                                <p>ខ្ញុំយល់ព្រមតាមលក្ខណប្រើប្រាស និងគោលការណ៍ឯកជនភាព។</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="foot">
                    <div className="fbox">
                        <button className="btn" type="submit">បញ្ចូនការកក់</button>
                    </div>
                </div>
            </div>
        </div>
        {/* this is footer */}
        <Footer />
    </div>
    );
}