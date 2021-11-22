import Layout from "../components/Layout";
import { StoreProvider } from "../util/store";

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <StoreProvider>
      <Component {...pageProps} />
      </StoreProvider>
    </Layout>
  )
}