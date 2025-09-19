import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "../context/CartContext";

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    name: string;
    price: number;
    image?: string; // 👈 añadimos la imagen como opcional
  } | null;
}

export default function MenuItemModal({ isOpen, onClose, item }: MenuItemModalProps) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState(""); 
  const [specialInstructions, setSpecialInstructions] = useState(""); 

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      customization,
      specialInstructions,
      image: item.image, 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        {/* ✅ Imagen del producto */}
        {item.image && (
          <div className="w-full h-48 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <p className="text-gray-400">Precio: ${item.price}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="customization">Personalizaciones (opcional)</Label>
            <Textarea
              id="customization"
              placeholder="Ej: sin cebolla, extra queso..."
              value={customization}
              onChange={(e) => setCustomization(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="specialInstructions">Instrucciones especiales (opcional)</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Ej: bien dorado, poco picante..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="quantity">Cantidad</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleAddToCart}>
            Agregar al Pedido — ${(item.price * quantity).toFixed(2)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
