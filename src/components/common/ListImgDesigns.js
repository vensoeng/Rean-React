import { useState } from 'react';

export default function ListImgDesigns({ 
    img,
    index = 0,
}) {
    
    const [imgLoading, setImgLoading] = useState(true);
    return (
        <div key={index} className="rli">
            <div className="rli-box"
                style={{ 
                        position: 'relative', 
                        overflow: 'hidden',
                        minHeight: '200px' 
                    }}
                >
                {imgLoading && (
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
                            zIndex: 2,
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
                    className="img-co" 
                    src={img} 
                    alt={img || 'Design Image'}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                    style={{ opacity: imgLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
                    loading='lazy'
                />
            </div>
        </div>
    );
}