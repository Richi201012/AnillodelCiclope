import Navigation from "./navigation";
import HeroSection from "./hero-section";
import MenuSection from "./menu-section";
import GallerySection from "./gallery-section";
import ContactSection from "./contact-section";
import Footer from "./footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </>
  );
}
