import AboutSection from "@/components/About/HomeAbout";
import HomeAds from "@/components/Ads/homeAds";
import AllCategories from "@/components/Categories/Categories";
import ClientCarousel from "@/components/ClientLogos/CllientLogo";
import BestSelling from "@/components/Products/HomeProducts";
import HeroSlider from "@/components/Sliders/HeroSlider";
import TestimonialSection from "@/components/Testimonials/Hometestimonials";

export default function Home() {
  return (
    <>
      <HeroSlider />
      < ClientCarousel />
      <HomeAds />
      <BestSelling title='Our Hot Selling Products' />
      <AllCategories />
      <AboutSection />
      <BestSelling  title='Feature Products' />
      <TestimonialSection />
    </>
  );
}
