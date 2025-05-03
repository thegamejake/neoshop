"use client";

import Image from "next/image";
import { useState } from "react";
import { use } from "react";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2, Star, ArrowRight, Truck, RotateCcw, Shield } from "lucide-react";

// 模擬產品數據
const products = [
  {
    id: 1,
    name: "高效能筆記型電腦",
    category: "electronics",
    price: 32000,
    originalPrice: 35000,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    description: "這款高效能筆記型電腦採用最新第12代處理器，配備16GB RAM和512GB SSD，提供出色的多任務處理能力。輕薄設計，長效電池續航，適合專業人士和創意工作者使用。",
    features: [
      "最新第12代Intel Core i7處理器",
      "16GB RAM / 512GB SSD",
      "14吋2.8K OLED觸控螢幕",
      "長達12小時電池續航",
      "輕薄機身僅1.3kg",
      "內建高清攝像頭和杜比音效"
    ],
    images: [
      "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2670",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2592",
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5?q=80&w=2738",
      "https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?q=80&w=2738"
    ]
  }
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId) || products[0];
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-muted-foreground">
          <span>首頁</span> <span className="mx-2">/</span>
          <span>商品</span> <span className="mx-2">/</span>
          <span>
            {product.category === "electronics" && "電子產品"}
            {product.category === "clothing" && "服飾"}
            {product.category === "home" && "家居"}
          </span> <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 產品圖片 */}
          <div>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`relative aspect-square cursor-pointer overflow-hidden rounded-md border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - 圖片 ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 產品資訊 */}
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            
            <div className="mb-4 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} 則評價)
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-primary">NT$ {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  NT$ {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <p className="mb-4 text-muted-foreground">{product.description}</p>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-4" />
            
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center rounded-md border">
                  <button
                    onClick={decreaseQuantity}
                    className="flex h-10 w-10 items-center justify-center border-r text-lg"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="flex h-10 w-14 items-center justify-center text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="flex h-10 w-10 items-center justify-center border-l text-lg"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  庫存: {product.stock} 件
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" />
                加入購物車
              </Button>
              <Button variant="secondary" size="lg" className="flex-1">
                立即購買
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm">免費配送 (訂單滿NT$ 1,000)</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm">30天無條件退貨</span>
              </div>
              <div className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="text-sm">原廠保固 12 個月</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
} 