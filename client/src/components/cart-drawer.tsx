import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { OrderForm } from "@/components/order-form";

export function CartDrawer() {
  const { cart, updateQuantity, removeItem, clearCart, isOpen, setIsOpen } = useCart();
  const { toast } = useToast();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleRemoveItem = (itemId: string, itemName: string) => {
    removeItem(itemId);
    toast({
      title: "Item eliminado",
      description: `${itemName} eliminado del pedido`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Pedido vaciado",
      description: "Todos los items han sido eliminados del pedido",
    });
  };

  const handlePlaceOrder = () => {
    if (cart.items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega items al carrito antes de realizar el pedido",
        variant: "destructive",
      });
      return;
    }
    setIsOrderFormOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="relative flex items-center gap-2"
          data-testid="button-open-cart"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Mi Pedido</span>
          {cart.itemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
              data-testid="badge-cart-count"
            >
              {cart.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col" data-testid="cart-drawer">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Mi Pedido</span>
            {cart.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-muted-foreground hover:text-destructive"
                data-testid="button-clear-cart"
              >
                <Trash2 className="h-5 w-5 mr-1" />
                Vaciar
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            {cart.items.length === 0 
              ? "Tu pedido está vacío" 
              : `${cart.itemCount} ${cart.itemCount === 1 ? 'item' : 'items'} en tu pedido`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-auto"> {/* Contenedor scrolleable */}
          {cart.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No hay items en tu pedido</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Selecciona items del menú para comenzar
                </p>
              </div>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4" data-testid={`cart-item-${item.id}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm" data-testid={`cart-item-name-${item.id}`}>
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground" data-testid={`cart-item-description-${item.id}`}>
                            {item.description}
                          </p>
                          {item.customizations && (
                            <p className="text-xs text-accent mt-1" data-testid={`cart-item-customizations-${item.id}`}>
                              <strong>Personalizaciones:</strong> {item.customizations}
                            </p>
                          )}
                          {item.specialInstructions && (
                            <p className="text-xs text-accent mt-1" data-testid={`cart-item-instructions-${item.id}`}>
                              <strong>Instrucciones:</strong> {item.specialInstructions}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-muted-foreground hover:text-destructive h-6 w-6 p-0"
                          data-testid={`button-remove-item-${item.id}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-6 w-6 p-0"
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[1.5rem] text-center" data-testid={`quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-medium text-sm" data-testid={`item-total-${item.id}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </div>

        {/* Botón fijo en la parte inferior */}
        <div className="sticky bottom-0 left-0 right-0 border-t bg-background pt-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-2xl font-bold text-accent" data-testid="cart-total">
              ${cart.total.toFixed(2)}
            </span>
          </div>
          <Button 
            onClick={handlePlaceOrder} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg"
            size="lg"
            data-testid="button-place-order"
          >
            <ShoppingCart className="h-5 w-5" />
            Realizar Pedido ${cart.total.toFixed(2)}
          </Button>
        </div>
      </SheetContent>
      
      {/* Order Form Modal */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />
    </Sheet>
  );
}