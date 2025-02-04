"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Carousel from "react-multi-carousel"
import 'react-multi-carousel/lib/styles.css';

import { useHomeData } from '@/hooks/useHomeData';



const HeroSlider = () => {

    const sliders = useHomeData('sliders');
        if (sliders.loading) {
            return <div>Loading...</div>;
        }
        if (sliders.error) {
            return <div>Error: {sliders.error}</div>;
        }
        // Find the specific page with matching slug
        const slides = sliders.data || [];
        
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
     
  return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
            {slides && slides.map((slider, idx) => (
              <Link href={slider.link} key={slider.order}>
                  <Image 
                    src={`${slider.mobile_image
                    }`} 
                    alt={slider.title} 
                    width={1400}
                    height={445}
                    style={{  width: '100%', height: 'auto' }}
                    priority={false}
                    className="md:hidden"
                  />
                  <Image 
                    src={`${slider.desktop_image}`} 
                    alt={slider.title} 
                    width={1400}
                    height={445}
                    style={{  width: '100%', height: 'auto' }}
                    priority={false}
                    className="hidden md:block"
                  />
              </Link>
            ))}
            
        </Carousel>
  )
}

export default HeroSlider

