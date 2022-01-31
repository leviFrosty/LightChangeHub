import Footer from "./Footer";
import NavBar from "./NavBar";
import React from "react";
import GoHome from "../GoHome";

export default function PageLayout({ home, children }) {
  return (
    <React.Fragment>
      <div className="flex flex-col dark:bg-bg-darker min-h-screen">
        <NavBar />
        <main className="flex-grow">{children}</main>
        {!home && <GoHome />}
        <Footer />
      </div>
    </React.Fragment>
  );
}
