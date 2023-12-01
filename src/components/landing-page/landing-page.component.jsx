'use client';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import useLandingPage from './use-landing-page.hook';
import Header from './components/header/header.component';
import Hero from './components/hero/hero.component';
import Partners from './components/partners/partners.component';
import SmartSolutions from './components/smartsolutions/smartsolutions.component';
import WhyQuicksteps from './components/whyquicksteps/whyquicksteps.component';
import HowItWorks from './components/howitworks/howitworks.component';
import Testimonials from './components/testimonials/testimonials.component';
import AvailServices from './components/availservice/availservice.component';
import Footer from './components/footer/footer.component';
/**
 * create landing page component
 * @returns component
 */
function LandingPage() {
  const { open, setOpen, auth, setAuth, router } = useLandingPage();

  return (
    <>
      {/* <Header /> */}
      <div className="home-wrapper" data-auto-select="true">
        <Header />
        <Hero />
        <div className="container">
          <Partners />
          <SmartSolutions />
          <WhyQuicksteps />
          <HowItWorks />
        </div>
        <Testimonials />
        <div className="container">
          <AvailServices />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
