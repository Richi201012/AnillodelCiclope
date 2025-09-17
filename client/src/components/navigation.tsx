import { useState } from "react";
import { Eye, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const NavLinks = () => (
    <>
      <button 
        onClick={() => scrollToSection('inicio')}
        className="text-foreground hover:text-accent transition-colors"
        data-testid="nav-inicio"
      >
        Inicio
      </button>
      <button 
        onClick={() => scrollToSection('menu')}
        className="text-foreground hover:text-accent transition-colors"
        data-testid="nav-menu"
      >
        Menú
      </button>
      <button 
        onClick={() => scrollToSection('galeria')}
        className="text-foreground hover:text-accent transition-colors"
        data-testid="nav-galeria"
      >
        Galería
      </button>
      <button 
        onClick={() => scrollToSection('contacto')}
        className="text-foreground hover:text-accent transition-colors"
        data-testid="nav-contacto"
      >
        Contacto
      </button>
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Eye className="text-primary-foreground text-lg" />
            </div>
            <span className="text-xl font-bold text-accent">El Anillo del Ciclope</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Eye className="text-primary-foreground text-sm" />
                  </div>
                  <span className="text-lg font-bold text-accent">El Anillo del Ciclope</span>
                </div>
                <div className="flex flex-col space-y-4">
                  <NavLinks />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
