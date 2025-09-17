import { Eye } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
              <Eye className="text-primary-foreground h-4 w-4" />
            </div>
            <span className="text-xl font-bold text-accent">El Anillo del Ciclope</span>
          </div>
          <p className="text-muted-foreground mb-4">
            © 2024 El Anillo del Ciclope. Todos los derechos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Diseñado con ❤️ para los amantes de los snacks únicos
          </p>
        </div>
      </div>
    </footer>
  );
}
