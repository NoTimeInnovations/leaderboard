import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // console.log('Document Cookie:', document?.cookie)
  const response = NextResponse.next()
  const request_cookie = request.cookies.get('pb_auth')

  if (request_cookie || '') {
    try {
      console.log('Loadinng cookie:', request_cookie)

      const cookie = { pb_auth: request_cookie?.value || '' }
      let encodedCookie = ''
      for (const [key, value] of Object.entries(cookie)) {
        encodedCookie += `${encodeURIComponent(key)}=${encodeURIComponent(
          value,
        )}; `
      }
      console.log('Encoded Cookie: ', encodedCookie)
      pb.authStore.loadFromCookie(encodedCookie.trimEnd())
      // console.log('Model: ', pb.authStore)
    } catch (error) {
      console.log('Error Loading from cookie: ', error)
      pb.authStore.clear()
      response.headers.set(
        'set-cookie',
        pb.authStore.exportToCookie({ httpOnly: false }),
      )
    }
  }

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh())
    console.log('authstore is valid')
    // console.log('authstore:', pb.authStore)
  } catch (err) {
    console.log('Invalid authstore: ', err)
    // clear the auth store on failed refresh
    pb.authStore.clear()
    response.headers.set(
      'set-cookie',
      pb.authStore.exportToCookie({ httpOnly: false }),
    )
  }

  // console.log('Model: ', pb.authStore)
//   if (!pb.authStore.model && !request.nextUrl.pathname.startsWith('/login')) {
//     const redirect_to = new URL('/login', request.url)
//     if (request.nextUrl.pathname) {
//       redirect_to.search = new URLSearchParams({
//         next: request.nextUrl.pathname,
//       }).toString()
//     } else {
//       redirect_to.search = new URLSearchParams({
//         next: '/',
//       }).toString()
//     }
//     console.log('No Model and not on login. Redirectinng to: ', redirect_to)
//     return NextResponse.redirect(redirect_to)
//   }

//   if (pb.authStore.model && request.nextUrl.pathname.startsWith('/login')) {
//     const next_url = request.headers.get('next-url') 
//     if (next_url) {
//       const redirect_to = new URL(next_url, request.url)
//       return NextResponse.redirect(redirect_to)
//     }
//     const redirect_to = new URL(`/`, request.url)
//     return NextResponse.redirect(redirect_to)
//   }

  return response
}

export const config = {
  //Regex used to allow nextjs routes through
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
