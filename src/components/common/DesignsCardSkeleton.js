export function DesignsCardSkeleton() {
    return (
        <li className="skeleton-card-wrapper">
            <div className="dsl-box skeleton-pulse">
                {/* Header Skeleton */}
                <div className="dsl-h df-l">
                    <div className="dslh-pr icon icon-sm skeleton-block circle"></div>
                    <div className="dslh-txt" style={{ flex: 1 }}>
                        <div className="skeleton-block line head" style={{ width: '60%' }}></div>
                        <div className="skeleton-block line sub" style={{ width: '30%', marginTop: '8px' }}></div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="dsl-c">
                    <div className="dslc-box">
                        <div className="img-box skeleton-block rect" style={{ height: '220px', width: '100%' }}></div>
                        <blockquote className="txt-box" style={{ padding: '15px 0 0 0' }}>
                            <div className="skeleton-block line title" style={{ width: '40%', height: '20px' }}></div>
                            <div className="skeleton-block line desc" style={{ width: '90%', marginTop: '10px' }}></div>
                            <div className="skeleton-block line desc" style={{ width: '75%', marginTop: '6px' }}></div>
                        </blockquote>
                        <div className="dslc-hs" style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                            <div className="skeleton-block badge" style={{ width: '60px', height: '26px', borderRadius: '4px' }}></div>
                            <div className="skeleton-block badge" style={{ width: '80px', height: '26px', borderRadius: '4px' }}></div>
                            <div className="skeleton-block badge" style={{ width: '50px', height: '26px', borderRadius: '4px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Slider Skeleton */}
                <div className="dsl-s" style={{ marginTop: '15px' }}>
                    <div className="dsls-box df-l" style={{ gap: '10px' }}>
                        <div className="skeleton-block rect" style={{ width: '120px', height: '80px', borderRadius: '6px', flexShrink: 0 }}></div>
                        <div className="skeleton-block rect" style={{ width: '120px', height: '80px', borderRadius: '6px', flexShrink: 0 }}></div>
                    </div>
                </div>

                {/* Footer Skeleton */}
                <div className="dsl-f" style={{ marginTop: '15px', paddingTop: '10px' }}>
                    <div className="dslf-box df-s">
                        <div className="dslfb-row df-l" style={{ gap: '10px' }}>
                            <div className="skeleton-block line" style={{ width: '70px', height: '24px' }}></div>
                            <div className="skeleton-block line" style={{ width: '70px', height: '24px' }}></div>
                        </div>
                        <div className="skeleton-block line" style={{ width: '80px', height: '30px', borderRadius: '20px' }}></div>
                    </div>
                </div>
            </div>
        </li>
    );
}