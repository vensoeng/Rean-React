import { useQuery } from '@tanstack/react-query';
import { API_URL, STORAGE} from '../../utils/auth'; 
import imgTest from '../../assets/img/defualt_img.webp';
import ServiceCard from '../common/ServiceCard_Sug';
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
                        // Render 4 skeleton items to match your layout grid
                        Array.from({ length: 5 }).map((_, idx) => (
                            <li class="wbsl-load-an">
                                <div class="bla-box">
                                    <div class="mian-txt"></div>
                                    <div class="sub-txt"></div>
                                    <div class="row-btn df-c">
                                        <div class="btn"></div>
                                        <div class="btn"></div>
                                    </div>
                                    <div class="img-an"></div>
                                </div>
                            </li>
                        ))
                    ) : servicSugs.length === 0 ? (
                        <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                            មិនមានទិន្នន័យអត្ថបទឡើយ។
                        </li>
                    ) : (
                        servicSugs.map((s, index) => (
                            <ServiceCard 
                                key={s.id || index}
                                service={s}
                                fallbackImg={imgTest}
                                apiUrl={API_URL}
                                storageUrl={STORAGE}
                            />
                        ))
                    )}
                    
                </ul>
            </div>
        </div>
    );
}