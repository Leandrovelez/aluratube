import { CSSReset } from "../source/components/CSSReset";

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <CSSReset/>
            <Component {...pageProps} />
        </>
    )
  }