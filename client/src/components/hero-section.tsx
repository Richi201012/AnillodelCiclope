import { Button } from "@/components/ui/button";
import { Utensils, Phone } from "lucide-react";
import mascot from "./imagenes/image copy.png";



export default function HeroSection() {
  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contacto');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 text-shadow">
              <span className="text-accent">EL ANILLO</span><br />
              <span className="text-primary">DEL CICLOPE</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Descubre una experiencia gastronómica única con sabores extraordinarios que despertarán todos tus sentidos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={scrollToMenu}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg h-auto"
                data-testid="button-ver-menu"
              >
                <Utensils className="mr-2 h-5 w-5" />
                Ver Menú
              </Button>
              <Button 
                onClick={scrollToContact}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg h-auto"
                data-testid="button-ordenar-ahora"
              >
                <Phone className="mr-2 h-5 w-5" />
                Ordenar Ahora
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="cyclope-float">
 <img
  src={mascot}
  alt="Personaje mascota del Cíclope"
  className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-full border-4 border-accent shadow-2xl"
  data-testid="img-mascot"
/>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
