import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { MenuItemData } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface MenuItemModalProps {
  item: MenuItemData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MenuItemModal({ item, isOpen, onClose }: MenuItemModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [customizations, setCustomizations] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  if (!item) return null;

  const handleAddToCart = () => {
    addItem(item, customizations || undefined, specialInstructions || undefined, quantity);
    
    toast({
      title: "¡Agregado al pedido!",
      description: `${quantity} x ${item.name} ${quantity > 1 ? 'agregados' : 'agregado'} al pedido`,
    });

    // Reset form and close modal
    setQuantity(1);
    setCustomizations("");
    setSpecialInstructions("");
    onClose();
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const total = item.price * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-md" data-testid="menu-item-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-accent" data-testid="modal-item-name">
            {item.name}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground" data-testid="modal-item-description">
            {item.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          {item.image && (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
                data-testid="modal-item-image"
              />
            </div>
          )}

          {/* Category and Day */}
          <div className="flex gap-2">
            {item.category && (
              <Badge variant="outline" data-testid="modal-item-category">
                {item.category}
              </Badge>
            )}
            {item.day && (
              <Badge className="bg-primary text-primary-foreground" data-testid="modal-item-day">
                {item.day}
              </Badge>
            )}
            {item.flavor && (
              <Badge variant="secondary" data-testid="modal-item-flavor">
                {item.flavor}
              </Badge>
            )}
          </div>

          {/* Customizations */}
          <div className="space-y-2">
            <Label htmlFor="customizations">Personalizaciones (opcional)</Label>
            <Textarea
              id="customizations"
              placeholder="Ej: Sin cebolla, extra queso, etc."
              value={customizations}
              onChange={(e) => setCustomizations(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-customizations"
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Instrucciones especiales (opcional)</Label>
            <Textarea
              id="instructions"
              placeholder="Ej: Bien dorado, que esté caliente, etc."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-instructions"
            />
          </div>

          {/* Quantity Selection */}
          <div className="flex items-center justify-between">
            <Label>Cantidad</Label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                data-testid="button-decrease-quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium text-lg min-w-[2rem] text-center" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(1)}
                data-testid="button-increase-quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-2xl font-bold text-accent" data-testid="text-total-price">
                ${total}
              </div>
            </div>
            <Button onClick={handleAddToCart} className="flex items-center gap-2" data-testid="button-add-to-cart">
              <ShoppingCart className="h-4 w-4" />
              Agregar al Pedido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}