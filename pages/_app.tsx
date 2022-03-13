import { useEffect } from 'react'
import { NextComponentType } from 'next'
import '../stylesG/globals.css'
import { useRouter } from 'next/router'
import type { AppProps, AppInitialProps, AppContext } from 'next/app'
import Chatting from 'components/Chatting'
import { RecoilRoot } from 'recoil'
import Footer from 'layout/Footer'
import 'antd/dist/antd.css'
import 'swiper/css'
import HomeHeader from 'layout/HomeHeader'
import cookies from 'next-cookies'
import { setToken } from 'shared/token-manager'
import SocketProvider from 'components/SocketProvider'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  const location = useRouter()
  return (
    <RecoilRoot>
      <SocketProvider>
        <HomeHeader />
        <Component {...pageProps} />
        <Chatting />
        <Footer />
      </SocketProvider>
    </RecoilRoot>
  )
}
MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<AppInitialProps> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  const allCookies = cookies(ctx)
  // console.log(allCookies)
  const accessTokenByCookie = allCookies['accessToken']
  // console.log(accessTokenByCookie)
  if (!accessTokenByCookie) {
  } else {
  }
  setToken(accessTokenByCookie as string)

  return { pageProps }
}
export default MyApp

// MyApp.getInitialProps = async (appContext: AppInitialProps) => {
//   const appProps = await MyApp.getInitialProps(appContext)
//   return { ...appProps }
// }
