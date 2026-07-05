import BrandLogos from "../components/HomePage/BrandLogos";
import Categories from "../components/HomePage/Categories";
import FeaturedProducts from "../components/HomePage/FeatureProducts";
import HeroSection from "../components/HomePage/HeroSection";
import Testimonials from "../components/HomePage/Testimonials";
import WhyChooseUs from "../components/HomePage/WhyChooseUs";

const HomePage = () => {
  return (
    <>
      <div>
        <HeroSection />
        <Categories />
        <FeaturedProducts />
        <WhyChooseUs />
        <BrandLogos />
        <Testimonials />
      </div>
    </>
  );
};

export default HomePage;
