import { type AppType } from "next/app";

import { Poppins } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const nunito = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={nunito.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
