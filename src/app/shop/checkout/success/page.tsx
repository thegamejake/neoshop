import Link from "next/link";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Package, ShoppingBag, FileText } from "lucide-react";

export default function CheckoutSuccessPage() {
  const orderNumber = "NEO" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString("zh-TW");

  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 rounded-full bg-primary/10 p-4">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold">訂單已成功送出！</h1>
            <p className="mb-8 text-muted-foreground">
              感謝您的購買，我們已收到您的訂單並將盡快處理
            </p>
            
            <Card className="mb-8 w-full p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">訂單編號</p>
                  <p className="font-medium">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">訂單日期</p>
                  <p className="font-medium">{orderDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">付款方式</p>
                  <p className="font-medium">信用卡付款</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">訂單狀態</p>
                  <p className="font-medium">處理中</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">訂單摘要</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>高效能筆記型電腦 × 1</span>
                    <span>NT$ 32,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>無線降噪耳機 × 2</span>
                    <span>NT$ 15,600</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>總計</span>
                    <span>NT$ 42,840</span>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">訂單確認信</h3>
                <p className="text-sm text-muted-foreground">
                  已發送至您的電子郵件
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">出貨通知</h3>
                <p className="text-sm text-muted-foreground">
                  訂單處理完成後將發送通知
                </p>
              </div>
              <div className="rounded-lg border p-4 text-center">
                <div className="mb-3 flex justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">查看訂單</h3>
                <p className="text-sm text-muted-foreground">
                  在帳戶頁面查看所有訂單
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/shop">繼續購物</Link>
              </Button>
              <Button asChild>
                <Link href="/account/orders">查看我的訂單</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
} 