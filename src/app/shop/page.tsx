import Image from "next/image";
import Link from "next/link";
import { ShopLayout } from "@/components/layout/ShopLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// 模擬產品數據
const products = [
  {
    id: 1,
    name: "高效能筆記型電腦",
    category: "electronics",
    price: 32000,
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2670"
  },
  {
    id: 2,
    name: "智能手錶",
    category: "electronics",
    price: 5200,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672"
  },
  {
    id: 3,
    name: "經典款帽T",
    category: "clothing",
    price: 1600,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=2574"
  },
  {
    id: 4,
    name: "北歐風沙發",
    category: "home",
    price: 18500,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2670"
  },
  {
    id: 5,
    name: "無線降噪耳機",
    category: "electronics",
    price: 7800,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2646"
  },
  {
    id: 6,
    name: "高級防水登山靴",
    category: "clothing",
    price: 4200,
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=2670"
  },
  {
    id: 7,
    name: "多功能攪拌機",
    category: "home",
    price: 5900,
    image: "https://images.unsplash.com/photo-1581612129334-551cee80cdbd?q=80&w=2670"
  },
  {
    id: 8,
    name: "復古設計桌燈",
    category: "home",
    price: 2400,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2670"
  },
];

export default function ShopPage() {
  return (
    <ShopLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">所有商品</h1>
          <div className="mt-4 md:mt-0">
            <p className="text-muted-foreground">顯示 {products.length} 個商品</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 側邊篩選 */}
          <div className="order-2 md:order-1">
            <div className="sticky top-4 rounded-lg border p-4">
              <h2 className="mb-4 text-lg font-semibold">篩選商品</h2>
              
              <div className="mb-4">
                <Label htmlFor="search" className="mb-2 block">關鍵字搜尋</Label>
                <Input id="search" placeholder="搜尋商品..." />
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-4">
                <Label htmlFor="category" className="mb-2 block">商品分類</Label>
                <select 
                  id="category" 
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                >
                  <option value="all">所有分類</option>
                  <option value="electronics">電子產品</option>
                  <option value="clothing">服飾</option>
                  <option value="home">家居</option>
                </select>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-4">
                <Label htmlFor="price" className="mb-2 block">價格範圍</Label>
                <select 
                  id="price" 
                  className="w-full rounded-md border border-input px-3 py-2 text-sm"
                >
                  <option value="all">所有價格</option>
                  <option value="0-1000">NT$ 0 - 1,000</option>
                  <option value="1000-5000">NT$ 1,000 - 5,000</option>
                  <option value="5000-10000">NT$ 5,000 - 10,000</option>
                  <option value="10000+">NT$ 10,000 以上</option>
                </select>
              </div>
              
              <Separator className="my-4" />
              
              <div className="mb-4">
                <Label htmlFor="sort" className="mb-2 block">排序方式</Label>
                <select 
                  id="sort"
                  className="w-full rounded-md border border-input px-3 py-2 text-sm" 
                >
                  <option value="popular">熱門程度</option>
                  <option value="newest">最新上架</option>
                  <option value="price-low">價格由低至高</option>
                  <option value="price-high">價格由高至低</option>
                </select>
              </div>
              
              <Button className="mt-4 w-full">套用篩選</Button>
            </div>
          </div>

          {/* 產品列表 */}
          <div className="order-1 md:order-2 md:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <Link href={`/shop/products/${product.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-1 text-sm text-muted-foreground">
                        {product.category === "electronics" && "電子產品"}
                        {product.category === "clothing" && "服飾"}
                        {product.category === "home" && "家居"}
                      </div>
                      <div className="mb-2 font-medium">{product.name}</div>
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-primary">NT$ {product.price.toLocaleString()}</div>
                        <Button variant="outline" size="sm">
                          查看詳情
                        </Button>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ShopLayout>
  );
} 