import Image from "next/image";
import Link from "next/link";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <ShopLayout>
      {/* 主橫幅 */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070"
          alt="電商首頁橫幅"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex h-full flex-col items-start justify-center p-8 md:p-16">
          <h1 className="mb-4 max-w-xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            探索最新科技與潮流好物
          </h1>
          <p className="mb-8 max-w-md text-lg text-white/90">
            NEOShop 為您嚴選全球優質商品，一站式購物體驗，輕鬆成就質感生活
          </p>
          <Button asChild size="lg">
            <Link href="/shop">立即選購</Link>
          </Button>
        </div>
      </section>

      {/* 特色分類 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">熱門分類</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/shop/products/category/electronics" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1593344484962-796055d4a3a4?q=80&w=2574"
                  alt="電子產品"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">電子產品</h3>
                  <p className="text-white/80">最新科技一手掌握</p>
                </div>
              </div>
            </Link>
            <Link href="/shop/products/category/clothing" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670"
                  alt="服飾"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">服飾</h3>
                  <p className="text-white/80">時尚穿搭提案</p>
                </div>
              </div>
            </Link>
            <Link href="/shop/products/category/home" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1520453714493-d3eff80e3379?q=80&w=2525"
                  alt="家居"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">家居</h3>
                  <p className="text-white/80">打造質感生活空間</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色商品 */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">精選商品</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={`https://picsum.photos/seed/${item}/400/300`}
                    alt={`特色商品 ${item}`}
                    fill
                    className="object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="mb-2 font-medium">精選商品 {item}</div>
                  <div className="mb-4 text-sm text-muted-foreground">
                    高品質精選商品，限時特價
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-primary">NT$ {(1000 * item).toLocaleString()}</div>
                    <Button variant="outline" size="sm">
                      查看詳情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 特色服務 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">我們的承諾</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">品質保證</h3>
              <p className="text-muted-foreground">
                嚴格把關每件商品品質，提供最高品質的購物體驗
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">專業服務</h3>
              <p className="text-muted-foreground">
                貼心客服團隊，為您解決購物過程中的任何問題
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <rect width="16" height="13" x="4" y="2" rx="2" />
                  <path d="M2 15h20" />
                  <path d="M6 19h12" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">安全付款</h3>
              <p className="text-muted-foreground">
                多元安全支付選擇，交易資料全程加密保護
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">快速配送</h3>
              <p className="text-muted-foreground">
                全台物流網絡覆蓋，迅速送達您指定的地點
              </p>
            </div>
          </div>
        </div>
      </section>
    </ShopLayout>
  );
}
