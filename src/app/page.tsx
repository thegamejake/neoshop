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
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070"
          alt="服裝電商首頁橫幅"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 flex h-full flex-col items-start justify-center p-8 md:p-16">
          <h1 className="mb-4 max-w-xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            探索最新時尚服飾
          </h1>
          <p className="mb-8 max-w-md text-lg text-white/90">
            NEOFashion 為您精選全球優質服裝，展現個人風格，彰顯獨特魅力
          </p>
          <Button asChild size="lg">
            <Link href="/shop">立即選購</Link>
          </Button>
        </div>
      </section>

      {/* 特色分類 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">服裝分類</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/shop/products/category/mens" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2574"
                  alt="男裝"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">男裝</h3>
                  <p className="text-white/80">簡約風格，質感穿搭</p>
                </div>
              </div>
            </Link>
            <Link href="/shop/products/category/womens" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021"
                  alt="女裝"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">女裝</h3>
                  <p className="text-white/80">時尚流行，優雅風格</p>
                </div>
              </div>
            </Link>
            <Link href="/shop/products/category/accessories" className="group block overflow-hidden rounded-lg">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1625591339971-4c9a87a66871?q=80&w=2070"
                  alt="配飾"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">配飾</h3>
                  <p className="text-white/80">完美細節，畫龍點睛</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 特色商品 */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">本季精選</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1992"
                  alt="經典白襯衫"
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 font-medium">經典簡約白襯衫</div>
                <div className="mb-4 text-sm text-muted-foreground">
                  百搭款式，高品質面料
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary">NT$ 1,200</div>
                  <Button variant="outline" size="sm">
                    查看詳情
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1974"
                  alt="丹寧牛仔褲"
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 font-medium">修身丹寧牛仔褲</div>
                <div className="mb-4 text-sm text-muted-foreground">
                  舒適彈性，完美剪裁
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary">NT$ 1,500</div>
                  <Button variant="outline" size="sm">
                    查看詳情
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936"
                  alt="針織毛衣"
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 font-medium">柔軟針織毛衣</div>
                <div className="mb-4 text-sm text-muted-foreground">
                  保暖舒適，多色可選
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary">NT$ 1,800</div>
                  <Button variant="outline" size="sm">
                    查看詳情
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1970"
                  alt="時尚外套"
                  fill
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="mb-2 font-medium">時尚休閒外套</div>
                <div className="mb-4 text-sm text-muted-foreground">
                  率性風格，秋冬必備
                </div>
                <div className="flex items-center justify-between">
                  <div className="font-bold text-primary">NT$ 2,200</div>
                  <Button variant="outline" size="sm">
                    查看詳情
                  </Button>
                </div>
              </CardContent>
            </Card>
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
              <h3 className="mb-2 text-xl font-semibold">優質面料</h3>
              <p className="text-muted-foreground">
                精選高品質面料，舒適觸感，持久耐穿
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
              <h3 className="mb-2 text-xl font-semibold">時尚設計</h3>
              <p className="text-muted-foreground">
                緊跟國際潮流，提供最新款式與設計
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
