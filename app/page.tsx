import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Steps from "@/components/sections/Steps";
import KitsSection from "@/components/sections/KitsSection";
import PopularKits from "@/components/sections/PopularKits";
import PromoBanner from "@/components/sections/PromoBanner";
import Testimonials from "@/components/sections/Testimonials";
import CustomBox from "@/components/sections/CustomBox";
import PressLogos from "@/components/sections/PressLogos";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Steps />
      <KitsSection />
      <PopularKits />
      <PromoBanner />
      <Testimonials />
      <CustomBox />
      <PressLogos />
      <Footer />
    </main>
  );
}
