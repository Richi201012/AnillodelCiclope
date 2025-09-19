import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Drumstick, Box, Coffee, Utensils } from "lucide-react";
import MenuItemModal, { MenuItemData } from "./menu-item-modal";


export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: MenuItemData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const categories = [
    { id: "all", name: "Todas las categorías", icon: Utensils },
    { id: "promociones", name: "Promociones Diarias", icon: Star },
    { id: "snacks", name: "Snacks", icon: Drumstick },
    { id: "paquetes", name: "Paquetes", icon: Box },
    { id: "bebidas", name: "Bebidas y Postres", icon: Coffee },
    { id: "crepiburgers", name: "Crepiburgers", icon: Utensils }
  ];
  
  const promociones = [
    { id: "promo-1", day: "Domingo", name: "7 Cerebros y Brebaje", description: "Dracuin o Medusín", price: 139 },
    { id: "promo-2", day: "Lun. & Mie.", name: "14 Cerebros, papas muertas y 2 refrescos", description: "Boing 250 ml y/o refresco 250 ml. Agrega limón pimienta o cambio de papas +$15.", price: 224 },
    { id: "promo-3", day: "Martes", name: "Crepiburger, papas muertas y refresco", description: "Elige tu crepiburger favorita y agrega limón pimienta o cambio de papas +$15.", price: 99 },
    { id: "promo-4", day: "Jue. & Sáb.", name: "1KG Cerebros", description: "3 salsas a elección", price: 299 },
    { id: "promo-5", day: "Viernes", name: "2 Pociones clásicas", description: "Materia Gris, Sangre de Hada, Lodo del Pantano, Baba de Ogro.", price: 125 }
  ];

  const snacks = [
    { id: "snack-1", name: "Papas Muertas", description: "Papas a la francesa (250 g) acompañadas de catsup y queso.", price: 70, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "snack-2", name: "Papas Enigma", description: "Papas Duffy (250 g) acompañadas de catsup y queso.", price: 70, image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "snack-3", name: "Papas del Abismo", description: "Papas a la francesa (250 g) bañadas con tocino ahumado y queso.", price: 85, image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "snack-4", name: "Papas Colmillo", description: "Papas gajo (250 g) semi saladas con un toque delicioso.", price: 70, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" }
  ];

  const paquetes = [
    { id: "paquete-1", name: "Cerebritos", description: "Mini boneless (100 g) acompañados de 2 salsas de queso y papas muertas (125 g).", price: 98, image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "paquete-2", name: "Ciclope", description: "Boneless (240 g) con papas muertas (95 g) y boing chico o refresco.", price: 149, image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "paquete-3", name: "Aguelarre", description: "1kg boneless papas Duffy (125 g), papas gajo hot (125 g), 3 salsas de queso y 3 boing chicos.", price: 469, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" }
  ];

  const bebidas = [
    { category: "Pociones Clásicas", items: [
      { id: "bebida-1", name: "Baba de Ogro", flavor: "Vainilla", price: 75 },
      { id: "bebida-2", name: "Materia Gris", flavor: "Oreo", price: 75 },
      { id: "bebida-3", name: "Sangre de Hada", flavor: "Fresa", price: 75 },
      { id: "bebida-4", name: "Lodo del Pantano", flavor: "Chocolate", price: 75 }
    ]},
    { category: "Pociones Especiales", items: [
      { id: "bebida-5", name: "Abducción", flavor: "Chocomenta", price: 80 },
      { id: "bebida-6", name: "Sirena Cósmica", flavor: "Avellanas", price: 80 },
      { id: "bebida-7", name: "Gansito Hechizado", flavor: "Gansito", price: 80 },
      { id: "bebida-8", name: "Mazaurio", flavor: "Mazapán", price: 80 }
    ]},
    { category: "Bebidas Especiales", items: [
      { id: "bebida-9", name: "Dracuin", flavor: "Frutas Rojas", price: 59 },
      { id: "bebida-10", name: "Troll", flavor: "Mora Azul", price: 59 },
      { id: "bebida-11", name: "Medusín", flavor: "Manzana Verde", price: 59 },
      { id: "bebida-12", name: "Yeti", flavor: "Agua de Horchata", price: 45 }
    ]},
    { category: "Refrescos", items: [
      { id: "bebida-13", name: "Rusas", flavor: "400ml", price: 39 },
      { id: "bebida-14", name: "Refresco", flavor: "PepsiCo 400ml", price: 15 },
      { id: "bebida-15", name: "Boing", flavor: "500ml", price: 20 },
      { id: "bebida-16", name: "Boing", flavor: "250ml", price: 15 },
      { id: "bebida-17", name: "Agua", flavor: "350ml", price: 15 },
      { id: "bebida-18", name: "Té", flavor: "350ml", price: 25 }
    ]}
  ];

  const crepiburgers = [
    { id: "crepi-1", name: "Minotauro", description: "Crepiburger de res (150 g), lechuga BBQ, catsup, queso gouda, acompañado de papas.", price: 89, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "crepi-2", name: "Dragón", description: "Crepiburger de pollo (100 gr), lechuga mayonesa BBQ, queso gouda, catsup, acompañado de papas.", price: 89, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" },
    { id: "crepi-3", name: "Zombie", description: "Crepiburger de boneless (80 gr), lechuga acereso ranch de queso gouda, acompañado de papas.", price: 89, image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250" }
  ];

  return (
    <section id="menu" className="py-20 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-accent">Nuestro</span> <span className="text-primary">Menú</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explora nuestra selección de snacks únicos, bebidas refrescantes y postres deliciosos
          </p>
          
          {/* Category Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 text-white transition-all duration-300 transform hover:scale-110 hover:backdrop-blur-sm
                    ${index % 2 === 0 
                      ? "hover:bg-yellow-500" 
                      : "hover:bg-purple-500"}`}
                  data-testid={`button-category-${category.id}`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>

       
        <div className="grid gap-16">
          
          {/* Promociones Diarias */}
          {(selectedCategory === "all" || selectedCategory === "promociones") && (
          <div className="menu-section">
            <h3 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4 flex items-center">
              <Star className="mr-3 h-8 w-8" />
              Promociones Diarias
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {promociones.map((promo, index) => (
                <Card 
                  key={promo.id} 
                  className="menu-card bg-white/10 backdrop-blur-md border border-white/20 
                             shadow-lg hover:shadow-xl cursor-pointer 
                             transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleItemClick({ 
                    id: promo.id,
                    name: promo.name, 
                    description: promo.description, 
                    price: promo.price, 
                    category: "Promociones",
                    day: promo.day 
                  })}
                  data-testid={`card-promo-${index}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <Badge className="bg-primary text-primary-foreground mb-2">
                          {promo.day}
                        </Badge>
                        <h4 className="text-xl font-bold text-accent mb-2" data-testid={`promo-name-${index}`}>
                          {promo.name}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`promo-description-${index}`}>
                          {promo.description}
                        </p>
                      </div>
                      <span className="text-2xl font-bold text-accent ml-4" data-testid={`promo-price-${index}`}>
                        ${promo.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Snacks */}
          {(selectedCategory === "all" || selectedCategory === "snacks") && (
          <div className="menu-section">
            <h3 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4 flex items-center">
              <Drumstick className="mr-3 h-8 w-8" />
              Snacks
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {snacks.map((snack, index) => (
                <Card 
                  key={snack.id} 
                  className="menu-card bg-white/10 backdrop-blur-md border border-white/20 
                             shadow-lg hover:shadow-xl overflow-hidden cursor-pointer 
                             transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleItemClick({ 
                    id: snack.id,
                    name: snack.name, 
                    description: snack.description, 
                    price: snack.price, 
                    category: "Snacks",
                    image: snack.image 
                  })}
                  data-testid={`card-snack-${index}`}
                >
                  <img 
                    src={snack.image}
                    alt={snack.name}
                    className="w-full h-48 object-cover"
                    data-testid={`snack-image-${index}`}
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-accent mb-1" data-testid={`snack-name-${index}`}>
                          {snack.name}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`snack-description-${index}`}>
                          {snack.description}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-accent ml-2" data-testid={`snack-price-${index}`}>
                        ${snack.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Paquetes */}
          {(selectedCategory === "all" || selectedCategory === "paquetes") && (
          <div className="menu-section">
            <h3 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4 flex items-center">
              <Box className="mr-3 h-8 w-8" />
              Paquetes
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paquetes.map((paquete, index) => (
                <Card 
                  key={paquete.id} 
                  className="menu-card bg-white/10 backdrop-blur-md border border-white/20 
                             shadow-lg hover:shadow-xl overflow-hidden cursor-pointer 
                             transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleItemClick({ 
                    id: paquete.id,
                    name: paquete.name, 
                    description: paquete.description, 
                    price: paquete.price, 
                    category: "Paquetes",
                    image: paquete.image 
                  })}
                  data-testid={`card-package-${index}`}
                >
                  <img 
                    src={paquete.image}
                    alt={paquete.name}
                    className="w-full h-48 object-cover"
                    data-testid={`package-image-${index}`}
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-accent mb-1" data-testid={`package-name-${index}`}>
                          {paquete.name}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`package-description-${index}`}>
                          {paquete.description}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-accent ml-2" data-testid={`package-price-${index}`}>
                        ${paquete.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}

          {/* Bebidas y Postres */}
  {/* Bebidas y Postres */}
{(selectedCategory === "all" || selectedCategory === "bebidas") && (
  <div className="menu-section">
    <h3 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4 flex items-center">
      <Coffee className="mr-3 h-8 w-8" />
      Bebidas y Postres
    </h3>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {bebidas.map((category, categoryIndex) => (
        <Card 
          key={categoryIndex} 
          className="menu-card bg-white/10 backdrop-blur-md border border-white/20 
                     shadow-lg hover:shadow-xl cursor-pointer 
                     transform transition-transform duration-300 hover:scale-105"
        >
          <CardContent className="p-4">
            <h4 className="text-lg font-bold text-accent mb-4" data-testid={`beverage-category-${categoryIndex}`}>
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center text-sm p-2 rounded cursor-pointer 
                             transition-all duration-300 
                             hover:bg-white/20 hover:backdrop-blur-sm hover:scale-105"
                  onClick={() => handleItemClick({ 
                    id: item.id,
                    name: item.name, 
                    description: `${item.flavor} - ${category.category}`, 
                    price: item.price, 
                    category: "Bebidas y Postres",
                    flavor: item.flavor 
                  })}
                  data-testid={`card-beverage-${categoryIndex}-${itemIndex}`}
                >
                  <div className="flex-1">
                    <span className="text-foreground font-medium" data-testid={`beverage-name-${categoryIndex}-${itemIndex}`}>
                      {item.name}
                    </span>
                    <span className="text-muted-foreground ml-1" data-testid={`beverage-flavor-${categoryIndex}-${itemIndex}`}>
                      {item.flavor}
                    </span>
                  </div>
                  <span className="text-accent font-semibold ml-2" data-testid={`beverage-price-${categoryIndex}-${itemIndex}`}>
                    ${item.price}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}


          {/* Crepiburgers */}
          {(selectedCategory === "all" || selectedCategory === "crepiburgers") && (
          <div className="menu-section">
            <h3 className="text-3xl font-bold text-primary mb-8 border-l-4 border-primary pl-4 flex items-center">
              <Utensils className="mr-3 h-8 w-8" />
              Crepiburgers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {crepiburgers.map((crepi, index) => (
                <Card 
                  key={crepi.id} 
                  className="menu-card bg-white/10 backdrop-blur-md border border-white/20 
                             shadow-lg hover:shadow-xl overflow-hidden cursor-pointer 
                             transform transition-transform duration-300 hover:scale-105"
                  onClick={() => handleItemClick({ 
                    id: crepi.id,
                    name: crepi.name, 
                    description: crepi.description, 
                    price: crepi.price, 
                    category: "Crepiburgers",
                    image: crepi.image 
                  })}
                  data-testid={`card-crepi-${index}`}
                >
                  <img 
                    src={crepi.image}
                    alt={crepi.name}
                    className="w-full h-48 object-cover"
                    data-testid={`crepi-image-${index}`}
                  />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-accent mb-1" data-testid={`crepi-name-${index}`}>
                          {crepi.name}
                        </h4>
                        <p className="text-sm text-muted-foreground" data-testid={`crepi-description-${index}`}>
                          {crepi.description}
                        </p>
                      </div>
                      <span className="text-xl font-bold text-accent ml-2" data-testid={`crepi-price-${index}`}>
                        ${crepi.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Menu Item Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </section>
  );
}
