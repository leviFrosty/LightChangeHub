import Footer from "./Footer";
import Nav from "./Nav";
import React from "react";
import GoHome from "../GoHome";

export default function Layout({ home, children }) {
  return (
    <React.Fragment>
      <div className="flex flex-col dark:bg-bg-darker min-h-screen">
        <Nav />
        <main className="flex-grow">{children}</main>
        {!home && <GoHome />}
        <Footer />
      </div>
    </React.Fragment>
  );
}
