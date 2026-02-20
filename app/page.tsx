import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import CoreFeatures from "@/components/sections/CoreFeatures";
import SecondaryFeatures from "@/components/sections/SecondaryFeatures";
import SocialProof from "@/components/sections/SocialProof";
import Pricing from "@/components/sections/Pricing";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <CoreFeatures />
        <SecondaryFeatures />
        <SocialProof />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
