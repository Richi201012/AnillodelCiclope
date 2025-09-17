import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    orderDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to submit the order
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "¡Pedido enviado!",
        description: "Te contactaremos pronto para confirmar tu pedido.",
      });
      
      setFormData({
        customerName: "",
        customerPhone: "",
        orderDetails: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu pedido. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              <span className="text-accent">Visita</span> <span className="text-primary">Nuestro Reino</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ven y descubre un mundo de sabores únicos donde la magia y el sabor se encuentran.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="text-primary-foreground text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Ubicación</h3>
                  <p className="text-muted-foreground">Calle Principal #123, Centro de la Ciudad</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="text-primary-foreground text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Teléfono</h3>
                  <p className="text-muted-foreground">+52 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Clock className="text-primary-foreground text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Horarios</h3>
                  <p className="text-muted-foreground">Lun - Dom: 12:00 PM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-8">
              <Button 
                size="icon" 
                className="w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                data-testid="social-whatsapp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </Button>
              <Button 
                size="icon" 
                className="w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                data-testid="social-instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.349-1.051-2.349-2.348 0-1.297 1.052-2.349 2.349-2.349 1.297 0 2.348 1.052 2.348 2.349 0 1.297-1.051 2.348-2.348 2.348z"/>
                </svg>
              </Button>
              <Button 
                size="icon" 
                className="w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                data-testid="social-facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
              <Button 
                size="icon" 
                className="w-12 h-12 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                data-testid="social-tiktok"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Button>
            </div>
          </div>

          <Card className="bg-background border-border">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-accent mb-6">Realiza tu Pedido</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="customerName" className="text-sm font-medium text-foreground mb-2 block">
                    Nombre Completo
                  </Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Tu nombre completo"
                    className="bg-card border-border text-foreground"
                    required
                    data-testid="input-customer-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerPhone" className="text-sm font-medium text-foreground mb-2 block">
                    Número de Teléfono
                  </Label>
                  <Input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder="+52 (555) 123-4567"
                    className="bg-card border-border text-foreground"
                    required
                    data-testid="input-customer-phone"
                  />
                </div>
                
                <div>
                  <Label htmlFor="orderDetails" className="text-sm font-medium text-foreground mb-2 block">
                    Tu Pedido
                  </Label>
                  <Textarea
                    id="orderDetails"
                    name="orderDetails"
                    value={formData.orderDetails}
                    onChange={handleInputChange}
                    placeholder="Describe tu pedido aquí..."
                    className="bg-card border-border text-foreground resize-none"
                    rows={4}
                    required
                    data-testid="textarea-order-details"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 text-lg h-auto"
                  data-testid="button-submit-order"
                >
                  <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M14 18a2 2 0 100 4 2 2 0 000-4zM5 18a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  {isSubmitting ? "Enviando..." : "Enviar Pedido"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
