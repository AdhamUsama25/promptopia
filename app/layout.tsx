import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Promptobia",
  describetion: "Discover & Share AI Prombts",
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
