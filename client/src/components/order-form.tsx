import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertOrderSchema, type InsertOrder } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, User, Clock } from "lucide-react";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderForm({ isOpen, onClose }: OrderFormProps) {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertOrder>({
    resolver: zodResolver(insertOrderSchema),
    defaultValues: {
      customerName: "",
      customerPhone: "",
      orderDetails: "",
    },
  });

  const handleSubmit = async (data: InsertOrder) => {
    setIsSubmitting(true);
    
    // Create order details from cart
    const orderDetails = cart.items.map(item => {
      let itemLine = `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
      if (item.customizations) {
        itemLine += `\n  Personalizaciones: ${item.customizations}`;
      }
      if (item.specialInstructions) {
        itemLine += `\n  Instrucciones: ${item.specialInstructions}`;
      }
      return itemLine;
    }).join('\n\n');

    const finalOrderDetails = `${orderDetails}\n\nTOTAL: $${cart.total.toFixed(2)}`;

    try {
      // Here you would normally send to backend API
      // For now, we'll simulate the order creation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "¡Pedido realizado exitosamente!",
        description: `Pedido para ${data.customerName} ha sido enviado. Te contactaremos pronto.`,
      });

      // Clear cart and close form
      clearCart();
      form.reset();
      onClose();
      
    } catch (error) {
      toast({
        title: "Error al realizar pedido",
        description: "Hubo un problema al procesar tu pedido. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh]" data-testid="order-form-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Datos de Entrega
          </DialogTitle>
          <DialogDescription>
            Completa tus datos para finalizar el pedido
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Resumen del Pedido
              </h4>
              <div className="space-y-2 text-sm">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-accent">${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nombre completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tu nombre completo"
                          data-testid="input-customer-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Teléfono
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Número de teléfono"
                          type="tel"
                          data-testid="input-customer-phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="orderDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Dirección de entrega
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Dirección completa, referencias, colonia, etc."
                          className="min-h-[80px]"
                          data-testid="input-delivery-address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1"
                    data-testid="button-cancel-order"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                    data-testid="button-submit-order"
                  >
                    {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}