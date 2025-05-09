import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

// 此函數可在請求完成之前運行
export async function middleware(request: NextRequest) {
  // 獲取相對路徑
  const path = request.nextUrl.pathname

  // 定義受保護的路由（僅管理員可訪問的路由）
  const isAdminRoute = path.startsWith('/admin')
  
  // 公開路由（無需身份驗證）
  const isPublicRoute = 
    path === '/auth/login' || 
    path === '/auth/register' || 
    path === '/auth/forgot-password' ||
    path.startsWith('/api/auth') ||
    path.startsWith('/api/test') ||
    path === '/' ||
    path.startsWith('/_next') ||
    path.includes('.') || 
    path.startsWith('/favicon')

  // 如果是公開路由，則直接放行
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // 獲取認證令牌
  const token = request.cookies.get('auth_token')?.value

  // 驗證未登入的情況
  if (!token) {
    // 如果是管理路由，則重定向到登入頁面
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    // 其他非公開路由也重定向到登入頁面
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  try {
    // 驗證令牌 - 使用 jose 替代 jsonwebtoken
    const jwtSecret = process.env.JWT_SECRET || 'neoshop_jwt_secret_key_2024'
    const secretKey = new TextEncoder().encode(jwtSecret)
    
    // 使用 jose.jwtVerify 驗證令牌
    const { payload } = await jose.jwtVerify(
      token as string,
      secretKey,
      {
        algorithms: ['HS256']
      }
    )
    
    const decoded = payload as unknown as {
      id: number
      email: string
      role: string
      name: string
    }

    // 對於管理員路由，檢查用戶是否為管理員
    if (isAdminRoute && decoded.role !== 'admin') {
      // 非管理員用戶嘗試訪問管理員路由，重定向到首頁
      return NextResponse.redirect(new URL('/', request.url))
    }

    // 將用戶信息添加到請求頭中
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', decoded.id.toString())
    requestHeaders.set('x-user-email', decoded.email)
    requestHeaders.set('x-user-role', decoded.role)
    requestHeaders.set('x-user-name', decoded.name || '')
    
    // 繼續處理請求
    return NextResponse.next({
      headers: requestHeaders,
    })
  } catch (error) {
    // 令牌無效或過期
    // 清除無效的令牌
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.set({
      name: 'auth_token',
      value: '',
      expires: new Date(0),
      path: '/',
    })
    
    return response
  }
}

// 配置中間件應用的路由
export const config = {
  matcher: [
    /*
     * 匹配所有請求路徑，除了:
     * - api 路由 (除了 /api/auth/*)
     * - 靜態文件，如圖片、字體等
     * - favicon.ico
     */
    '/((?!api/(?!auth))[^.]*)',
  ],
} 