import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Minus, Plus, ArrowLeft, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/ui/animated-text";
import { getProductBySlug, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <section className="pt-32 md:pt-40 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <Link to="/shop" className="text-muted-foreground hover:text-foreground underline">
              Return to Shop
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "You must select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      size: selectedSize,
    }, quantity);
    
    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} (Size ${selectedSize}) added to your cart.`,
    });
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-28 md:pt-36 pb-4 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </motion.button>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                className="aspect-square bg-muted rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
              </motion.div>
              
              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? "border-foreground"
                          : "border-transparent hover:border-muted-foreground/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <FadeInUp>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-foreground text-background text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2">
                  {product.name}
                </h1>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="border-t border-b border-border py-6 space-y-6">
                  {/* Size Selection */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors ${
                            selectedSize === size
                              ? "bg-foreground text-background border-foreground"
                              : "border-border hover:border-foreground"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <motion.button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 hover:bg-muted transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="h-4 w-4" />
                        </motion.button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <motion.button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 hover:bg-muted transition-colors"
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-foreground text-background hover:bg-foreground/90 h-14 text-base"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <motion.button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? "bg-red-500 border-red-500 text-white"
                        : "border-border hover:border-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </motion.button>
                </div>
              </FadeInUp>

              {/* Features */}
              <FadeInUp delay={0.5}>
                <div className="pt-6">
                  <h3 className="font-semibold mb-4">Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 md:py-20 bg-muted">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeInUp>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Products</h2>
            </FadeInUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relProduct) => (
                <motion.div
                  key={relProduct.id}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link to={`/shop/${relProduct.slug}`}>
                    <div className="bg-background rounded-2xl overflow-hidden shadow-elegant hover:shadow-luxury transition-shadow">
                      <div className="aspect-square overflow-hidden">
                        <motion.img
                          src={relProduct.image}
                          alt={relProduct.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {relProduct.category}
                        </span>
                        <h3 className="font-semibold mt-1">{relProduct.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{relProduct.price}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
