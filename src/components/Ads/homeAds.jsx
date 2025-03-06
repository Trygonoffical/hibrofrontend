// 'use client'
// import Image from "next/image"
// import Link from "next/link"
// import { useEffect, useState } from "react";


// const HomeAds = () => {

//     const [loading, setLoading] = useState(true);
//     const [allAds, setSAllAds] = useState([]);
//     const [singleAd, setSingleAd] = useState([]);

//     const fetchAdvertisements = async () => {
//         try {
//             setLoading(true);
//             let url = `${process.env.NEXT_PUBLIC_API_URL}/advertisements/?type=MULTI`;
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log('ads fetch - ', data)
//             setSAllAds(data);
//         } catch (error) {
//             console.error('Error fetching advertisements:', error);
//             toast.error('Failed to load advertisements');
//         } finally {
//             setLoading(false);
//         }
//     };
//     const fetchAdvertisementsFull = async () => {
//         try {
//             setLoading(true);
//             let url = `${process.env.NEXT_PUBLIC_API_URL}/advertisements/?type=SINGLE`;
            
//             // // Add type filter if selected
//             // if (typeFilter) {
//             //     url += `?type=${typeFilter}`;
//             // }
            
//             const response = await fetch(url);
//             const data = await response.json();
//             console.log('ads fetch - ', data)
//             setSingleAd(data);
//         } catch (error) {
//             console.error('Error fetching advertisements:', error);
//             toast.error('Failed to load advertisements');
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(()=>{
    
//         fetchAdvertisements()
//         fetchAdvertisementsFull()
//     }, [])

//   return (
//     <>
//         <div className="max-w-7xl mx-auto px-4 py-8 md:flex md:justify-around">
//             {allAds.map((ad , idx)=>(
//                 <Link href={ad.link} key={idx} className="p-2"> 
//                     <Image src={ad.image_url} width={512} height={120} className="w-100 wx-auto " alt={ad.title} />
//                 </Link>
//             ))}
//         </div>
//         {singleAd && singleAd.map((ad , idx)=>(
//             <div className="max-w-7xl mx-auto w-full mb-4 px-4"  key={idx}>
//                 <Link href={ad.link} > 
//                     <Image src={ad.image_url} width={512} height={120} className="w-full wx-auto " alt={ad.title} />
//                 </Link>
//             </div>
//         ))}
        
//     </>
    
//   )
// }

// export default HomeAds

'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';

const HomeAds = () => {
    const [loading, setLoading] = useState(true);
    const [multipleAds, setMultipleAds] = useState([]);
    const [singleAd, setSingleAd] = useState([]);
    
    useEffect(() => {
        // Fetch both ad types on component mount
        fetchAds();
    }, []);
    
    const fetchAds = async () => {
        try {
            setLoading(true);
            
            // First fetch the multiple ads (MULTI type)
            const multiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/advertisements/`);
            
            if (!multiResponse.ok) {
                throw new Error(`Error fetching MULTI ads: ${multiResponse.status}`);
            }
            
            const multiData = await multiResponse.json();
            console.log('MULTI ads fetched:', multiData);
            let multiads = multiData.filter(x => x.type == 'MULTI')
            let singlads = multiData.filter(x => x.type == 'SINGLE')
            console.log('MULTI ads fetched filter :', multiads);
            console.log('singlads ads fetched singlads :', singlads);
            setMultipleAds(multiData);
            
            // Then fetch the single full-length ad (SINGLE type)
            const singleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/advertisements/?type=SINGLE&is_active=true`);
            
            if (!singleResponse.ok) {
                throw new Error(`Error fetching SINGLE ads: ${singleResponse.status}`);
            }
            
            const singleData = await singleResponse.json();
            console.log('SINGLE ads fetched:', singleData);
            setSingleAd(singleData);
            
        } catch (error) {
            console.error('Error fetching advertisements:', error);
            toast.error('Failed to load advertisements');
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="flex space-x-4">
                        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-16 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Multiple Ads Section (horizontal row of ads) */}
            {multipleAds.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {multipleAds.map((ad, idx) => (
                            <Link 
                                href={ad.link || '#'} 
                                key={idx} 
                                className="block hover:opacity-90 transition-opacity"
                                target={ad.link ? "_blank" : ""}
                                rel="noopener noreferrer"
                            >
                                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg shadow">
                                    <Image 
                                        src={ad.image_url} 
                                        alt={ad.title || 'Advertisement'} 
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Single Full-Width Ad Section */}
            {singleAd.length > 0 && (
                <div className="max-w-7xl mx-auto w-full mb-8 px-4">
                    {singleAd.map((ad, idx) => (
                        <Link 
                            href={ad.link || '#'} 
                            key={idx}
                            className="block hover:opacity-90 transition-opacity"
                            target={ad.link ? "_blank" : ""}
                            rel="noopener noreferrer"
                        >
                            <div className="relative aspect-[3/1] w-full overflow-hidden rounded-lg shadow">
                                <Image 
                                    src={ad.image_url} 
                                    alt={ad.title || 'Advertisement'} 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default HomeAds;