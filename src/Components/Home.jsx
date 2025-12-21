import Banner from "./Banner";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import LuxuryStats from "./LuxuryStats";
import FeaturedProperty from "./FeaturedProperty";
import FAQ from "./FAQ";

const Home = () => {
  return (
    <div>  
      <Banner></Banner>
      <FeaturedProperty/>
      <HowItWorks></HowItWorks>
      <LuxuryStats></LuxuryStats>
      <FAQ></FAQ>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
