import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_URL, STORAGE} from '../../utils/auth'; 
import imgTest from '../../assets/img/defualt_img.webp';
import '../../assets/css/designs_sug.css';

const fetchDesignsSugFromServer = async () => {
    const res = await fetch(`${API_URL}/designs?limit=6&status=true`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};


function DesignCard({ item }) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);
    const imageUrl = item.img ? `${API_URL}${STORAGE}${item.img}` : imgTest;

    return (
        <li className="dsl-09-item">
            <div className="dsli09-box">
                {/* Image Wrapper Container */}
                <div 
                    className="dsl-09-img" 
                    style={{ 
                        position: 'relative', 
                        overflow: 'hidden',
                    }}
                >
                    {!isFullyLoaded && (
                        <div 
                            className="img-loader-placeholder" 
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                aspectRatio: '3 / 4',
                                backgroundColor: '#f8fafc'
                            }}
                        >
                            <div className="spinner"></div>
                            <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                                កំពុងផ្ទុក...
                            </span>
                        </div>
                    )}
                    
                    <img 
                        src={imageUrl} 
                        className="img-c" 
                        alt={item.main_ti || "designs_images"} 
                        onLoad={() => setIsFullyLoaded(true)}
                        style={{
                            opacity: isFullyLoaded ? 1 : 0,
                            transition: 'opacity 0.4s ease-in-out',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                <blockquote>
                    <h2>{item.main_ti}</h2>
                    <p>{item.title}</p>
                </blockquote>

                <div className="action">
                    <div className="btn">មើលបន្ថែម</div>
                </div>
            </div>
        </li>
    );
}

// =========For Export===================

export default function DesignSuggestion() {

    const { data: responseData, isLoading } = useQuery({
        queryKey: ['designSuggestion'],
        queryFn: fetchDesignsSugFromServer,
        staleTime: 5 * 60 * 1000,
    });

    const designsSugs = Array.isArray(responseData) 
        ? responseData 
        : (responseData?.data && Array.isArray(responseData.data)) 
            ? responseData.data 
            : [];

    return (
        <div className="ds-09">
            <div className="ds-09-box">
                <div className="ds-09-head">
                    <blockquote>
                        <h2>ចំណង់ចំណូចចិត្តប្រចាំថ្ងៃ</h2>
                        <p>ក្រៅពីការសរសេរកូដ ខ្ញុំក៏ចូលចិត្តការរចនាក្រាហ្វិក និងការថតរូបផងដែរ</p>
                    </blockquote>
                    <div className="action df-c">
                        <a href='/services/detail/7' className="btn">សេវ៉ាកម្ម</a>
                        <a href='/booking/service/7' className="btn">កក់ឥឡូវ</a>
                    </div>
                </div>
                <div className="dsl-09">
                    <ul className="dsl-09-box">
                        {isLoading ? (
                            // Render 4 skeleton items to match your layout grid
                            Array.from({ length: 6 }).map((_, idx) => (
                                <li  className="dsl-09-item dsl-sk-an09">
                                    <div className="dsli09-box">
                                        <div className="dsl-09-img"></div>
                                        <blockquote>
                                            <h2>&nbsp;</h2>
                                            <p>&nbsp;</p>
                                        </blockquote>
                                        <div className="action">
                                            <div className="btn"></div>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : designsSugs.length === 0 ? (
                            <li style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                                មិនមានទិន្នន័យអត្ថបទឡើយ។
                            </li>
                        ) : (
                            designsSugs.map((d, index) => (
                                <DesignCard key={d.id || index} item={d} />
                            ))
                        )}
                    </ul>
                </div>
                <div className="dsf-09">
                    <div className="dsf09-box df-c">
                        <a href="/designs" className="btn">
                            មើលការរចនាទាំងអស់ 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}