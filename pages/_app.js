import "../styles/globals.css";
import { UserProvider } from "../contexts/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/fbInstance";
import handleTheme from "../lib/handleTheme";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({ user: null, isLoading: true });
  const [currentTheme, setCurrentTheme] = useState();

  useEffect(() => {
    // Handles tailwindcss theme
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "dark");
    }

    handleTheme();
    setCurrentTheme(localStorage.getItem("theme"));
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
    <MantineProvider theme={{ colorScheme: currentTheme }}>
      <NotificationsProvider>
        <UserProvider value={user}>
          <Component {...pageProps} />
        </UserProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
