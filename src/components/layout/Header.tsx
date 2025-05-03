"use client";

import Link from "next/link";
import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold">
            NEOFashion
          </Link>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <Link href="/shop" className="hover:text-primary">
                  全部商品
                </Link>
              </li>
              <li>
                <Link href="/shop/products/category/mens" className="hover:text-primary">
                  男裝
                </Link>
              </li>
              <li>
                <Link href="/shop/products/category/womens" className="hover:text-primary">
                  女裝
                </Link>
              </li>
              <li>
                <Link href="/shop/products/category/accessories" className="hover:text-primary">
                  配飾
                </Link>
              </li>
              <li>
                <Link href="/shop/products/category/new" className="hover:text-primary">
                  新品上市
                </Link>
              </li>
              <li>
                <Link href="/shop/products/category/sale" className="hover:text-primary">
                  特價商品
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋服裝..."
              className="pl-8"
            />
          </div>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/shop/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 