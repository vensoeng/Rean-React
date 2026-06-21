import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../utils/auth';

// import WebLoader from '../components/common/WebLoader';
import ProductCard from '../components/common/productCard'; 
import Slider from '../components/common/Slider'; 
import { ProductCardSkeleton } from '../components/common/ProductCardSkeleton';

import './../assets/css/shop.css';

const slideImages = [
    API_URL + "/storage/data/url/1782051406170.webp",
    API_URL + "/storage/data/url/1782051422404.webp",
    API_URL + "/storage/data/url/1782051437348.webp",
];

const fetchProdcutFromServer = async () => {
    const res = await fetch(`${API_URL}/products?status=true`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const resData = await res.json();
    console.log(resData);
    return resData?.data || [];
};

const fetchCategoryFromServer = async () => {
    const res = await fetch(`${API_URL}/categorys?status=true`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const resData = await res.json();
    console.log(resData);
    return resData?.data || [];
};

function Shopping() {

    // 2. React Query
    const queryResult = useQuery({
        queryKey: ['products', 'all'],          
        queryFn: fetchProdcutFromServer,  
        staleTime: 5 * 60 * 1000, 
    });

    const queryCategoryResult = useQuery({
        queryKey: ['category', 'categoryAll'],          
        queryFn: fetchCategoryFromServer,  
        staleTime: 5 * 60 * 1000, 
    });

    const products = queryResult.data || [];
    const isLoading = queryResult.isLoading;
    const categorys = queryCategoryResult.data || [];

    return (
        <main className="wb-shop" id='wb-shop'>
            {/* <!-- this is nav  --> */}
            <nav className="wbsh-nav">
                <div className="wbshn-box df-s">
                    {/* */}
                    <button className="icon icon-ra icon-sm btn-back">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path stroke="#FF8A65" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67"></path>
                        </svg>
                    </button>
                    {/* */}
                    <div className="wbshn-search">
                        <div className="wbshns-box df-s">
                            <label htmlFor="search" className="icon icon-ra icon-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                                    <path d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2" stroke="#FF8A65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </label>
                            <input type="text" id="search" placeholder="VenSoeng - Search for product...."/>
                            <button className="btn btn-search">ស្វែងរក</button>
                        </div>
                    </div>
                    {/* */}
                    <button className="icon icon-ra icon-sm btn-contact">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <path d="M22 6.5h-6M6 6.5H2M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 17.5h-4M8 17.5H2M14 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="#FF8A65" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <div className="wbsh-c">
                <div className="wbshc-box">
                    {/* <!-- this is slide  --> */}
                    <Slider images={slideImages}/>
                    {/* <!-- this is nav for content --> */}
                    <div className="wshcn">
                        <div className="wbshcn-box">
                            <ul className="df-l">
                                <li>
                                    <button  href="/all" className="btn active">
                                        All
                                    </button>
                                </li>
                                {
                                    [...categorys].map((item, index) => (
                                        <li key={index}>
                                            <button className="btn">
                                                {item.title}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/* <!-- this is content for shop --> */}
                    <div className="wbshcc">
                        <ul className="wshb-card">
                            {
                                isLoading ? (
                                    Array(6).fill(0).map((_, index) => (
                                        <ProductCardSkeleton key={index} />
                                    ))
                                ) : products.length === 0 ? (
                                    <li style={{ 
                                        textAlign: 'center', 
                                        padding: '50px 10px', 
                                        color: '#64748b',
                                        gridColumn: 'span 3', 
                                        width: '100%'
                                    }}>
                                        សូមអភ័យទោស! មិនមានទិន្នន័យផលិតឡើយ។
                                    </li>
                                ) : (
                                    [...products].map((item, index) => (
                                        <ProductCard
                                            key={item.id || index}
                                            product={item}
                                        />
                                    ))
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );   
}

export default Shopping;