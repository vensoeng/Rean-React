import React, { useState } from 'react';

export default function ServiceCard({ service, fallbackImg, apiUrl, storageUrl }) {
    const [isFullyLoaded, setIsFullyLoaded] = useState(false);

    const imageUrl = service.img ? `${apiUrl}${storageUrl}${service.img}` : fallbackImg;

    return (
        <li>
            <div className="box">
                <blockquote>
                    <h2>{service.title_kh || "ប្រព័ន្ធគ្រប់គ្រងបែប Premium"}</h2>
                    <p>
                        {service.description_kh || 
                        "ជួយបង្កើនប្រសិទ្ធភាពការងារប្រចាំថ្ងៃរបស់អ្នកដោយប្រព័ន្ធគ្រប់គ្រងទិន្នន័យផ្ទាល់ខ្លួន និងមានសុវត្ថិភាព។"}
                    </p>
                </blockquote>
                <div className="svl-action">
                    <div className="svla-box df-c">
                        <a href={'/services/detail/' + service.id} className="btn">ព័ត៌មានលំអិត</a>
                        <button className="btn">ការកក់</button>
                    </div>
                </div>
            </div>

            {/* Image Wrapper Container */}
            <div className="l-img img-box"  style={!isFullyLoaded ? { position: 'relative', overflow: 'hidden', aspectRatio: '1 /1', } : { position: 'relative', overflow: 'hidden' } }  >
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
                            aspectRatio: 1 /1,
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
                    className="img-c"
                    src={imageUrl}
                    alt={service.title_kh || "service image"}
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
        </li>
    );
}