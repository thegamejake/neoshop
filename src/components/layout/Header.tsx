"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  
  useEffect(() => {
    // 獲取當前用戶信息
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('獲取用戶信息失敗:', error);
      }
    };
    
    fetchUserData();
  }, []);
  
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      // 登出後重新載入頁面
      window.location.href = '/';
    } catch (error) {
      console.error('登出失敗:', error);
    }
  };

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
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name}</span>
              <Link href="/account">
                <Button variant="ghost" size="icon" title="我的帳戶">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="登出">
                <LogOut className="h-5 w-5" />
              </Button>
              <Link href="/shop/cart">
                <Button variant="ghost" size="icon" className="relative" title="購物車">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    0
                  </span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">登入</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">註冊</Button>
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
          )}
        </div>
      </div>
    </header>
  );
} 