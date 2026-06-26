import { useQuery } from '@tanstack/react-query';
import { API_URL, STORAGE} from '../../utils/auth'; 
import imgTest from '../../assets/img/defualt_img.webp';
import WebLoader from '../../components/common/WebLoader';
import '../../assets/css/service_suggestion.css';

const fetchServiceSugFromServer = async () => {
    const res = await fetch(`${API_URL}/services?list_id=4`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

export default function ServiceSuggestion() {

    const { data: responseData, isLoading } = useQuery({
        queryKey: ['serviceSuggestion'],
        queryFn: fetchServiceSugFromServer,
        staleTime: 5 * 60 * 1000,
    });

    const servicSugs = Array.isArray(responseData) 
        ? responseData 
        : (responseData?.data && Array.isArray(responseData.data)) 
            ? responseData.data 
            : [];

    return (
        <div className="wbsv">
            <div className="wbsvc">
                <ul>
                    {isLoading ? (
                        <WebLoader>
                            សូមរងចាំយើងកំពុងទាញយកទិន្នន័យ
                        </WebLoader>
                    ) : servicSugs.length === 0 ? (
                        <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            មិនមានទិន្នន័យអត្ថបទឡើយ។
                        </li>
                    ) : (
                        servicSugs.map((s, index) => (
                            <li key={s.id || index}> 
                                <div className="box">
                                    <blockquote>
                                        <h2>{s.title_kh || "ប្រព័ន្ធគ្រប់គ្រងបែប Premium"}</h2>
                                        <p>{s.description_kh || "ជួយបង្កើនប្រសិទ្ធភាពការងារប្រចាំថ្ងៃរបស់អ្នកដោយប្រព័ន្ធគ្រប់គ្រងទិន្នន័យផ្ទាល់ខ្លួន និងមានសុវត្ថិភាព។"}</p>
                                    </blockquote>
                                    <div className="svl-action">
                                        <div className="svla-box df-c">
                                            <button className="btn">ព័ត៌មានលំអិត</button>
                                            <button className="btn">ការកក់</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="l-img">
                                    <img src={API_URL + STORAGE + s.img || imgTest } className="img-c" alt="service images" />
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}