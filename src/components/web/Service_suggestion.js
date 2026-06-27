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

    const skeletonStyle = {
        animation: 'pulse 1.5s infinite ease-in-out',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px'
    };

    return (
        <div className="wbsv">
            <style>{`
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `}</style>

            <div className="wbsvc">
                <ul>
                    {isLoading ? (
                        // Render 4 skeleton items to match your layout grid
                        Array.from({ length: 4 }).map((_, idx) => (
                            <li className='skeleton-wbsvc' key={`skeleton-${idx}`} style={{ display: 'flex', gap: '20px', marginBottom: '20px', aspectRatio: '1/1' }}>
                                <div className="box" style={{ flex: 1 }}>
                                    <div className="svl-action">
                                        <div className="svla-box df-c" style={{ display: 'flex', gap: '10px' }}>
                                            {/* Button Skeletons */}
                                            <div style={{ ...skeletonStyle, width: '100px', height: '35px', borderRadius: '20px' }} />
                                            <div style={{ ...skeletonStyle, width: '80px', height: '35px', borderRadius: '20px' }} />
                                        </div>
                                    </div>
                                </div>
                                {/* Image Skeleton */}
                                <div className="l-img" style={{ width: '150px', height: '150px',aspectRatio: '1/1' }}>
                                    <div style={{ ...skeletonStyle, width: '100%', height: '100%', borderRadius: '8px' }} />
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