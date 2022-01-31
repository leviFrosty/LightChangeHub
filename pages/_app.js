import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/fbInstance";
import handleTheme from "../lib/handleTheme";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ user: null, isLoading: true });

  useEffect(() => {
    // Handles tailwindcss theme
    console.log(localStorage.getItem("theme"));
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "dark");
    }

    handleTheme();
    // Listens for auth state changes then sets global context
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ user, isLoading: false });
      } else {
        setUser({ user: null, isLoading: false });
      }
    });
  }, []);

  return (
    <UserProvider value={user}>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
