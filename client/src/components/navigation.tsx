import { useState } from "react";
import { Menu } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CartDrawer } from "@/components/cart-drawer";
import mascot from "./imagenes/image copy.png";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  const NavLinks = () => (
  <>
    <button
      onClick={() => scrollToSection("inicio")}
      className="transition-transform duration-300 hover:scale-110 hover:backdrop-blur-sm text-foreground hover:text-accent"
      data-testid="nav-inicio"
    >
      Inicio
    </button>
    <button
      onClick={() => scrollToSection("menu")}
      className="transition-transform duration-300 hover:scale-110 hover:backdrop-blur-sm text-foreground hover:text-purple-500"
      data-testid="nav-menu"
    >
      Menú
    </button>
    <button
      onClick={() => scrollToSection("galeria")}
      className="transition-transform duration-300 hover:scale-110 hover:backdrop-blur-sm text-foreground hover:text-accent"
      data-testid="nav-galeria"
    >
      Galería
    </button>
    <button
      onClick={() => scrollToSection("contacto")}
      className="transition-transform duration-300 hover:scale-110 hover:backdrop-blur-sm text-foreground hover:text-purple-500"
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
          {/* Logo Desktop */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent shadow-lg flex items-center justify-center">
              <img
                src={mascot}
                alt="Logo Cíclope"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold text-accent">
              El Anillo del Ciclope
            </span>
          </div>

          {/* Links en escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <CartDrawer />
          </div>

          {/* Menu en móvil */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                data-testid="mobile-menu-trigger"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-8">
                {/* Logo en móvil */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent shadow-lg flex items-center justify-center">
                    <img 
                      src={mascot} 
                      alt="Logo Cíclope" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-lg font-bold text-accent">
                    El Anillo del Ciclope
                  </span>
                </div>

                {/* Links y carrito */}
                <div className="flex flex-col space-y-4">
                  <NavLinks />
                </div>
                <div className="pt-4 border-t">
                  <CartDrawer />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

