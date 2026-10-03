import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FundraisingProgress from "@/components/FundraisingProgress";
import NicoStory from "@/components/NicoStory";
import HowItWorks from "@/components/HowItWorks";
import AboutStarlight from "@/components/AboutStarlight";
import Hospitals from "@/components/Hospitals";
import WhereMoneyGoes from "@/components/WhereMoneyGoes";
import RecentDonations from "@/components/RecentDonations";
import DonationForm from "@/components/DonationForm";
import ImpactSection from "@/components/ImpactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyDonate from "@/components/StickyDonate";
export default function Page() {
  return (<>
    <Navbar />
    <main>
      <Hero /><FundraisingProgress /><NicoStory /><HowItWorks />
      <AboutStarlight /><Hospitals /><WhereMoneyGoes /><RecentDonations /><DonationForm />
      <ImpactSection /><FinalCTA />
    </main>
    <Footer /><StickyDonate />
  </>);
}
