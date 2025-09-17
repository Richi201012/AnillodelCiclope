export default function GallerySection() {
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Nachos coloridos con múltiples toppings"
    },
    {
      src: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Alitas de pollo gourmet con salsas"
    },
    {
      src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Hamburguesa artesanal con presentación creativa"
    },
    {
      src: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Bowls de smoothie coloridos con frutas frescas"
    },
    {
      src: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Papas de camote cargadas con toppings"
    },
    {
      src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Milkshake gourmet con toppings elaborados"
    },
    {
      src: "https://images.unsplash.com/photo-1509722747041-616f39b57569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Sandwich creativo con ingredientes únicos"
    },
    {
      src: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      alt: "Jugos de frutas coloridos en contenedores de vidrio"
    }
  ];

  return (
    <section id="galeria" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-accent">Galería</span> <span className="text-primary">de Sabores</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubre la magia visual de nuestros snacks únicos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="menu-card aspect-square overflow-hidden rounded-xl"
              data-testid={`gallery-item-${index}`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                data-testid={`gallery-image-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
