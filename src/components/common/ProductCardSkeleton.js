export function ProductCardSkeleton() {
    return (
        <li className="product-card skeleton-card-wrapper" style={{ listStyle: 'none',gridColumn: 'span 1',  }}>
            <div className="skeleton-pulse" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div 
                    className="skeleton-block rect" 
                    style={{ 
                        width: '100%', 
                        aspectRatio: '1.6', 
                        borderRadius: '0.8rem',
                        backgroundColor: '#e2e8f0'
                    }}
                ></div>
                <div style={{ padding: '1rem 0.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    
                    <div>
                        <div 
                            className="skeleton-block line" 
                            style={{ width: '40%', height: '1.25rem', borderRadius: '4px', marginBottom: '0.75rem', backgroundColor: '#e2e8f0' }}
                        ></div>
                        
                        <div 
                            className="skeleton-block line" 
                            style={{ width: '90%', height: '0.85rem', borderRadius: '4px', marginBottom: '0.5rem', backgroundColor: '#e2e8f0' }}
                        ></div>
                        
                        <div 
                            className="skeleton-block line" 
                            style={{ width: '65%', height: '0.85rem', borderRadius: '4px', marginBottom: '1.25rem', backgroundColor: '#e2e8f0' }}
                        ></div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.25rem' }}>
                            <div className="skeleton-block circle" style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#e2e8f0' }}></div>
                            <div className="skeleton-block line" style={{ width: '50px', height: '0.85rem', borderRadius: '4px', backgroundColor: '#e2e8f0' }}></div>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '0.5rem 0', width: '100%' }}></div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <div>
                            <div className="skeleton-block line" style={{ width: '30px', height: '0.7rem', marginBottom: '4px', backgroundColor: '#e2e8f0' }}></div>
                            <div className="skeleton-block line" style={{ width: '60px', height: '1.2rem', borderRadius: '4px', backgroundColor: '#e2e8f0' }}></div>
                        </div>
                        <div className="skeleton-block line" style={{ width: '70px', height: '1rem', borderRadius: '4px', backgroundColor: '#e2e8f0' }}></div>
                    </div>

                </div>
            </div>
        </li>
    );
}