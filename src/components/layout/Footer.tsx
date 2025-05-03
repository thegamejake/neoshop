import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">關於我們</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  品牌故事
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  加入我們
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:underline">
                  永續發展
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:underline">
                  門市資訊
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">購物指南</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sizeguide" className="hover:underline">
                  尺寸指南
                </Link>
              </li>
              <li>
                <Link href="/care" className="hover:underline">
                  衣物保養
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  常見問題
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  聯絡客服
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">服務條款</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="hover:underline">
                  使用條款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  隱私政策
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  退換貨政策
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:underline">
                  運送資訊
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">訂閱電子報</h3>
            <p className="mb-4 text-sm">
              訂閱我們的電子報，搶先獲取最新服飾資訊和獨家優惠
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="您的電子郵件"
                className="w-full rounded-md border px-3 py-2 text-sm"
                required
              />
              <button
                type="submit"
                className="w-full rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
              >
                訂閱
              </button>
            </form>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NEOFashion. 版權所有。
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
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
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
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
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Pinterest</span>
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
                className="h-5 w-5"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="8" r="2" />
                <path d="M9.109 15.093C9.337 15.398 9.702 15.597 10.102 15.597C11.159 15.597 12.1 14.851 12.1 12.871C12.1 11.121 11.044 10.154 9.609 10.154C7.706 10.154 6.5 11.621 6.5 13.412C6.5 14.384 7.081 15.156 7.706 15.461C7.95 15.561 8.007 15.511 8.034 15.364C8.062 15.17 8.193 14.668 8.251 14.467C8.271 14.398 8.268 14.339 8.213 14.273C7.95 13.975 7.781 13.472 7.781 13.011C7.781 11.901 8.579 10.703 9.508 10.703C10.387 10.703 10.906 11.484 10.906 12.487C10.906 13.468 10.537 14.392 9.968 14.392C9.647 14.392 9.418 14.13 9.5 13.819C9.599 13.443 9.793 13.05 9.793 12.766C9.793 12.283 9.537 12.016 9.022 12.016C8.414 12.016 7.925 12.62 7.925 13.421C7.925 13.979 8.1 14.345 8.1 14.345L7.539 16.781C7.389 17.487 7.553 18.397 7.568 18.478C7.578 18.521 7.628 18.534 7.653 18.5C7.689 18.445 8.178 17.789 8.353 17.107L8.634 16.092C8.787 16.339 9.109 16.55 9.446 16.55C10.758 16.55 11.7 15.23 11.7 13.566C11.7 12.121 10.578 10.798 9.028 10.798C7.356 10.798 6.2 12.085 6.2 13.49C6.2 14.268 6.531 14.982 7.053 15.337" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 