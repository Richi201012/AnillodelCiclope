import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "../context/CartContext";
import { MapPin, Phone, User, Clock, CheckCircle } from "lucide-react";
import { createOrder } from "@/lib/orders"; // 👈 Firebase

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface OrderFormData {
  customerName: string;
  customerPhone: string;
  orderDetails: string;
}

export function OrderForm({ isOpen, onClose, onSuccess }: OrderFormProps) {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<OrderFormData>({
    customerName: "",
    customerPhone: "",
    orderDetails: "",
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderFormData> = {};
    if (!formData.customerName.trim()) newErrors.customerName = "El nombre es requerido";
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "El teléfono es requerido";
    } else if (formData.customerPhone.trim().length < 10) {
      newErrors.customerPhone = "El teléfono debe tener al menos 10 dígitos";
    }
    if (!formData.orderDetails.trim()) {
      newErrors.orderDetails = "La dirección de entrega es requerida";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        address: formData.orderDetails,
        total: getTotalPrice(),
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          customization: item.customization || "",
          specialInstructions: item.specialInstructions || "",
        })),
        createdAt: new Date(),
        status: "pending",
      };

      await createOrder(orderPayload);

      clearCart();
      setFormData({ customerName: "", customerPhone: "", orderDetails: "" });
      setErrors({});
      onClose();                 // 👈 cierra el modal de formulario
      setShowSuccessModal(true); // 👈 abre el modal de éxito
      onSuccess?.();
    } catch (error) {
      console.error("Error al enviar pedido:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ customerName: "", customerPhone: "", orderDetails: "" });
      setErrors({});
      onClose();
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <>
      {/* Modal de formulario */}
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Datos de Entrega
            </DialogTitle>
            <DialogDescription>Completa tus datos para finalizar el pedido</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6">
              {/* Resumen */}
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Resumen del Pedido
                </h4>
                <div className="space-y-2 text-sm">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col gap-1 border-b border-gray-600 pb-2">
                      <div className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      {item.customization && (
                        <p className="text-xs text-gray-400">🍴 Personalización: {item.customization}</p>
                      )}
                      {item.specialInstructions && (
                        <p className="text-xs text-gray-400">📝 Instrucciones: {item.specialInstructions}</p>
                      )}
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span className="text-accent">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> Nombre completo
                  </Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Tu nombre completo"
                    className={errors.customerName ? "border-red-500" : ""}
                  />
                  {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Teléfono
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="Número de teléfono"
                    className={errors.customerPhone ? "border-red-500" : ""}
                  />
                  {errors.customerPhone && <p className="text-red-500 text-sm">{errors.customerPhone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderDetails" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Dirección de entrega
                  </Label>
                  <Textarea
                    id="orderDetails"
                    value={formData.orderDetails}
                    onChange={(e) => handleInputChange("orderDetails", e.target.value)}
                    placeholder="Dirección completa, referencias, colonia, etc."
                    className={`min-h-[80px] ${errors.orderDetails ? "border-red-500" : ""}`}
                  />
                  {errors.orderDetails && <p className="text-red-500 text-sm">{errors.orderDetails}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1">
                    {isSubmitting ? "Procesando..." : "Confirmar Pedido"}
                  </Button>
                </div>
              </form>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Modal de éxito */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              ¡Pedido Realizado!
            </DialogTitle>
            <DialogDescription>
              Tu pedido ha sido enviado exitosamente 🎉  
              Te avisaremos cuando esté en curso 🚚
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setShowSuccessModal(false)}>Cerrar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
