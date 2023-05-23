import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
    </>
  );
}
