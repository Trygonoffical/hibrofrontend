import Image from "next/image"
import Link from "next/link"


const HomeAds = () => {

    const allAds = [
        {
            url: '#',
            img: '/Images/ad1.png',
            name: 'ads'
        },
        {
            url: '#',
            img: '/Images/ad2.png',
            name: 'ads'
        },
        {
            url: '#',
            img: '/Images/ad2.png',
            name: 'ads'
        },
    ]
  return (
    <>
        <div className="max-w-7xl mx-auto px-4 py-8 md:flex md:justify-around">
            {allAds.map((ad , idx)=>(
                <Link href={ad.url} key={idx} className="p-2"> 
                    <Image src={ad.img} width={512} height={120} className="w-100 wx-auto " alt={ad.name} />
                </Link>
            ))}
        </div>
        <div className="max-w-7xl mx-auto w-full mb-4 px-4">
            <Link href='#' > 
                <Image src='/Images/ad3.png' width={512} height={120} className="w-full wx-auto " alt='ads' />
            </Link>
        </div>
    </>
    
  )
}

export default HomeAds