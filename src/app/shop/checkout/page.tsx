"use client";

import { useState } from "react";
import Link from "next/link";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, CreditCard, Calendar, User } from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模擬提交訂單的過程
    setTimeout(() => {
      // 在實際應用中，這裡會處理訂單提交邏輯
      window.location.href = "/shop/checkout/success";
    }, 1500);
  };

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">結帳</h1>
          <Link href="/shop/cart" className="flex items-center text-muted-foreground hover:text-foreground">
            <ShoppingCart className="mr-2 h-4 w-4" />
            返回購物車
          </Link>
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 訂單摘要 */}
          <div className="lg:col-span-1 lg:order-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">訂單摘要</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>高效能筆記型電腦 × 1</span>
                    <span>NT$ 32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>無線降噪耳機 × 2</span>
                    <span>NT$ 15,600</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">小計</span>
                    <span>NT$ 47,600</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">折扣 (NEO10)</span>
                    <span className="text-green-600">- NT$ 4,760</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">運費</span>
                    <span>免運費</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>總計</span>
                    <span>NT$ 42,840</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 rounded-lg bg-muted/30 p-4 text-sm">
              <h3 className="mb-2 font-semibold">付款與配送說明</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 訂單確認後將在 1-3 個工作日內出貨</li>
                <li>• 台灣本島地區訂單滿 NT$ 1,000 享免運費</li>
                <li>• 信用卡付款將在訂單確認後立即扣款</li>
                <li>• 如有任何問題，請聯繫客服中心</li>
              </ul>
            </div>
          </div>
          
          {/* 結帳表單 */}
          <div className="lg:col-span-2 lg:order-1">
            <form onSubmit={handleSubmit}>
              {/* 配送資訊 */}
              <div className="rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">配送資訊</h2>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Label htmlFor="name">收件人姓名</Label>
                    <Input id="name" placeholder="請輸入姓名" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">電子郵件</Label>
                    <Input id="email" type="email" placeholder="example@mail.com" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">手機號碼</Label>
                    <Input id="phone" placeholder="0912345678" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">縣市</Label>
                    <select 
                      id="city" 
                      className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
                      required
                    >
                      <option value="">請選擇縣市</option>
                      <option value="台北市">台北市</option>
                      <option value="新北市">新北市</option>
                      <option value="桃園市">桃園市</option>
                      <option value="台中市">台中市</option>
                      <option value="台南市">台南市</option>
                      <option value="高雄市">高雄市</option>
                      {/* 其他縣市選項 */}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="district">區域</Label>
                    <Input id="district" placeholder="請輸入區域" required className="mt-1" />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">詳細地址</Label>
                    <Input id="address" placeholder="請輸入詳細地址" required className="mt-1" />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="notes">訂單備註 (選填)</Label>
                    <textarea
                      id="notes"
                      placeholder="有任何特殊需求請在此說明"
                      className="mt-1 w-full rounded-md border border-input px-3 py-2 text-sm"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              {/* 付款方式 */}
              <div className="mt-8 rounded-lg border p-6">
                <h2 className="mb-4 text-xl font-semibold">付款方式</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="credit-card" className="ml-2 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
                      信用卡付款
                    </label>
                  </div>
                  
                  {paymentMethod === "credit-card" && (
                    <div className="ml-6 rounded-md border p-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <Label htmlFor="card-number">卡號</Label>
                          <div className="mt-1 flex items-center rounded-md border border-input">
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className="border-0"
                              required
                            />
                            <div className="flex items-center gap-1 px-3">
                              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.75" y="0.75" width="22.5" height="14.5" rx="1.25" fill="white" stroke="#E2E8F0" strokeWidth="0.5"/>
                                <path d="M15.455 4.875H12.545V11.125H15.455V4.875Z" fill="#FF5F00"/>
                                <path d="M12.785 8C12.785 6.655 13.365 5.455 14.285 4.62C13.575 4.085 12.695 3.75 11.735 3.75C9.365 3.75 7.455 5.665 7.455 8C7.455 10.335 9.365 12.25 11.735 12.25C12.695 12.25 13.575 11.915 14.285 11.38C13.365 10.545 12.785 9.345 12.785 8Z" fill="#EB001B"/>
                                <path d="M20.455 8C20.455 10.335 18.545 12.25 16.175 12.25C15.215 12.25 14.335 11.915 13.625 11.38C14.545 10.545 15.125 9.345 15.125 8C15.125 6.655 14.545 5.455 13.625 4.62C14.335 4.085 15.215 3.75 16.175 3.75C18.545 3.75 20.455 5.665 20.455 8Z" fill="#F79E1B"/>
                              </svg>
                              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.75" y="0.75" width="22.5" height="14.5" rx="1.25" fill="white" stroke="#E2E8F0" strokeWidth="0.5"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.35 10.615L3.055 5.44H4.245L3.545 10.615H2.35ZM9.4 5.535C9.085 5.4 8.625 5.25 8.055 5.25C6.795 5.25 5.93 5.865 5.925 6.765C5.915 7.425 6.555 7.795 7.04 8.02C7.54 8.25 7.695 8.4 7.695 8.6C7.69 8.9 7.335 9.04 7.005 9.04C6.525 9.04 6.265 8.965 5.825 8.785L5.675 8.72L5.52 9.79C5.885 9.965 6.54 10.115 7.22 10.125C8.56 10.125 9.415 9.52 9.425 8.555C9.43 8.04 9.135 7.645 8.405 7.31C7.955 7.09 7.69 6.94 7.695 6.725C7.695 6.535 7.915 6.335 8.38 6.335C8.775 6.325 9.06 6.415 9.28 6.51L9.385 6.56L9.545 5.535H9.4ZM12.47 5.44H11.54C11.245 5.44 11.02 5.52 10.89 5.795L9.3 10.615H10.64C10.64 10.615 10.805 10.19 10.845 10.085C10.97 10.085 12.05 10.09 12.205 10.09C12.235 10.225 12.32 10.615 12.32 10.615H13.52L12.47 5.44ZM11.17 9.04C11.265 8.795 11.645 7.865 11.645 7.865C11.64 7.875 11.735 7.635 11.79 7.485L11.87 7.845C11.87 7.845 12.1 8.825 12.145 9.04H11.17ZM17.6 5.44H16.485C16.2 5.44 15.985 5.525 15.865 5.79L14.06 10.615H15.4C15.4 10.615 15.58 10.16 15.62 10.045H17.125C17.155 10.195 17.245 10.615 17.245 10.615H18.435L17.6 5.44ZM15.985 9.025C16.05 8.845 16.345 8.065 16.345 8.065C16.34 8.075 16.42 7.87 16.465 7.74L16.53 8.045C16.53 8.045 16.72 8.83 16.755 9.025H15.985ZM19.24 5.44L18.1 8.975L17.985 8.315C17.78 7.55 17.175 6.72 16.52 6.26L17.545 10.61H18.89L20.585 5.44H19.24Z" fill="#172B85"/>
                                <path d="M17.225 7.035H16.03C16.025 7.035 15.91 7.065 15.82 7.17L14.465 10.615H15.805L16.11 9.86L17.19 7.21C17.19 7.21 17.28 7.035 17.225 7.035Z" fill="#F9A533"/>
                                <path d="M16.57 5.77C16.136 5.617 15.679 5.539 15.218 5.54C14.103 5.54 13.28 6.045 13.275 6.79C13.275 7.36 13.85 7.675 14.3 7.865C14.755 8.06 14.915 8.185 14.91 8.36C14.905 8.625 14.57 8.75 14.26 8.75C13.814 8.755 13.372 8.67 12.96 8.5L12.815 8.44L12.665 9.455C13.069 9.605 13.498 9.683 13.93 9.685C15.12 9.685 15.93 9.185 15.94 8.39C15.945 7.925 15.67 7.57 15.015 7.295C14.62 7.115 14.37 6.995 14.375 6.8C14.375 6.625 14.575 6.44 15.015 6.44C15.378 6.429 15.739 6.492 16.075 6.625L16.19 6.67L16.345 5.695L16.57 5.77Z" fill="#F9A533"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="expiry">到期日</Label>
                          <div className="mt-1 flex items-center rounded-md border border-input">
                            <Calendar className="ml-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="expiry"
                              placeholder="MM / YY"
                              className="border-0"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="cvc">安全碼</Label>
                          <Input id="cvc" placeholder="CVC" required className="mt-1" />
                        </div>
                        
                        <div className="sm:col-span-2">
                          <Label htmlFor="card-name">持卡人姓名</Label>
                          <div className="mt-1 flex items-center rounded-md border border-input">
                            <User className="ml-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="card-name"
                              placeholder="持卡人姓名"
                              className="border-0"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="atm"
                      name="payment-method"
                      value="atm"
                      checked={paymentMethod === "atm"}
                      onChange={() => setPaymentMethod("atm")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="atm" className="ml-2">ATM 轉帳</label>
                  </div>
                  
                  {paymentMethod === "atm" && (
                    <div className="ml-6 rounded-md border p-4">
                      <p className="text-sm text-muted-foreground">
                        選擇 ATM 轉帳，我們將在訂單確認後發送轉帳資訊到您的電子郵件。
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="convenience-store"
                      name="payment-method"
                      value="convenience-store"
                      checked={paymentMethod === "convenience-store"}
                      onChange={() => setPaymentMethod("convenience-store")}
                      className="h-4 w-4 text-primary"
                    />
                    <label htmlFor="convenience-store" className="ml-2">超商付款</label>
                  </div>
                  
                  {paymentMethod === "convenience-store" && (
                    <div className="ml-6 rounded-md border p-4">
                      <p className="text-sm text-muted-foreground">
                        選擇超商付款，我們將生成一組付款條碼，您可在 7 天內至全台超商完成付款。
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "處理中..." : "確認付款"}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  點擊「確認付款」即表示您同意我們的
                  <Link href="/terms" className="ml-1 text-primary hover:underline">服務條款</Link>
                  和
                  <Link href="/privacy" className="ml-1 text-primary hover:underline">隱私政策</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
} 