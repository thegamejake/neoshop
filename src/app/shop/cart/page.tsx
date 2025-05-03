"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, MinusCircle, PlusCircle } from "lucide-react";

// 模擬購物車數據
const initialCartItems = [
  {
    id: 1,
    name: "高效能筆記型電腦",
    category: "electronics",
    price: 32000,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2670"
  },
  {
    id: 5,
    name: "無線降噪耳機",
    category: "electronics",
    price: 7800,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2646"
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [error, setError] = useState("");
  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 1000 ? 0 : 100;
  const total = subtotal - discount + shipping;
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "neo10") {
      setPromoApplied(true);
      setError("");
    } else {
      setPromoApplied(false);
      setError("無效的優惠碼");
    }
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">購物車</h1>
        
        {cartItems.length === 0 ? (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <h2 className="mb-4 text-xl">您的購物車是空的</h2>
            <p className="mb-6 text-muted-foreground">去選購您喜愛的商品吧！</p>
            <Button asChild>
              <Link href="/shop">繼續購物</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* 購物車商品列表 */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border">
                <div className="grid grid-cols-12 gap-4 border-b p-4 font-medium text-muted-foreground">
                  <div className="col-span-6">商品資訊</div>
                  <div className="col-span-2 text-center">單價</div>
                  <div className="col-span-2 text-center">數量</div>
                  <div className="col-span-2 text-right">小計</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 items-center gap-4 border-b p-4 last:border-0">
                    <div className="col-span-6">
                      <div className="flex items-center">
                        <div className="relative mr-4 h-20 w-20 overflow-hidden rounded">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link href={`/shop/products/${item.id}`} className="font-medium hover:text-primary">
                            {item.name}
                          </Link>
                          <div className="mt-1 text-sm text-muted-foreground">
                            分類：
                            {item.category === "electronics" && "電子產品"}
                            {item.category === "clothing" && "服飾"}
                            {item.category === "home" && "家居"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      NT$ {item.price.toLocaleString()}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <MinusCircle className="h-5 w-5" />
                        </button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <PlusCircle className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-end gap-2">
                      <span className="font-medium">
                        NT$ {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-between">
                <Button variant="outline" asChild>
                  <Link href="/shop">繼續購物</Link>
                </Button>
                <Button variant="ghost" onClick={() => setCartItems([])}>
                  清空購物車
                </Button>
              </div>
            </div>
            
            {/* 訂單摘要 */}
            <div>
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">訂單摘要</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">小計</span>
                    <span>NT$ {subtotal.toLocaleString()}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">折扣 (10%)</span>
                      <span className="text-green-600">- NT$ {discount.toLocaleString()}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">運費</span>
                    <span>
                      {shipping === 0 ? "免運費" : `NT$ ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>總計</span>
                    <span>NT$ {total.toLocaleString()}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label htmlFor="promo" className="text-sm">優惠碼</label>
                    {promoApplied && <span className="text-xs text-green-600">已套用</span>}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="promo"
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        setError("");
                      }}
                      placeholder="輸入優惠碼"
                    />
                    <Button 
                      variant="outline" 
                      onClick={applyPromoCode}
                      disabled={!promoCode || promoApplied}
                    >
                      套用
                    </Button>
                  </div>
                  {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
                  {!error && !promoApplied && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      使用 "NEO10" 獲得 10% 折扣
                    </p>
                  )}
                </div>
                
                <Button className="mt-4 w-full" size="lg" asChild>
                  <Link href="/shop/checkout">前往結帳</Link>
                </Button>
              </div>
              
              <div className="mt-4 rounded-lg border p-4">
                <h3 className="mb-2 font-medium">接受的付款方式</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="rounded border bg-muted/20 px-2 py-1 text-xs">信用卡</div>
                  <div className="rounded border bg-muted/20 px-2 py-1 text-xs">ATM轉帳</div>
                  <div className="rounded border bg-muted/20 px-2 py-1 text-xs">超商付款</div>
                  <div className="rounded border bg-muted/20 px-2 py-1 text-xs">LINE Pay</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ShopLayout>
  );
} 