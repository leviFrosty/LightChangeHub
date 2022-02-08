import ToggleTheme from "../theme/ToggleTheme";
import SignOutLogo from "../../public/icons/sign-out-alt-solid.svg";
import ThemeButton from "../typography/ThemeButton";
import { useRouter } from "next/router";
import { signOutUser } from "../../lib/signOutUser";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";
import CardSearchBar from "../search/CardSearchBar";

export default function NavBar({ cards }) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <nav className="flex flex-col md:flex-row justify-between gap-3 md:gap-0 items-center my-5 mx-4">
      <button
        title="Home"
        className="text-3xl text-lc-green"
        onClick={() => {
          router.push("/");
        }}
      >
        LightChange
        <span className="pl-2 dark:text-white text-bg-dark">Hub</span>
      </button>
      {user ? (
        <div>
          <CardSearchBar cards={cards} />
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row gap-2 items-center">
        {user ? (
          <span className="dark:text-text-light text-bg-dark">
            {user.displayName}
          </span>
        ) : null}
        {user ? (
          <ThemeButton
            title="Sign Out"
            className="dark:bg-bg-dark bg-slate-300"
            onClick={() => signOutUser(router)}
          >
            <SignOutLogo className="h-5 w-5 inline dark:text-text-light text-bg-dark  hover:opacity-70 transition-opacity" />
          </ThemeButton>
        ) : null}
        <ThemeButton
          title="Toggle Theme"
          className="dark:bg-bg-dark bg-slate-300"
        >
          <ToggleTheme className="h-5 w-5 dark:text-text-light text-bg-dark  hover:opacity-70 transition-opacity" />
        </ThemeButton>
      </div>
    </nav>
  );
}
