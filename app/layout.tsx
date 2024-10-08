import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
  icons: {
    icon: "/assets/images/logo.svg",
    appleIcon: "/assets/images/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={undefined}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
