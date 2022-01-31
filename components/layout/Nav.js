import ToggleTheme from "../theme/ToggleTheme";
import SignOutLogo from "../../public/icons/sign-out-alt-solid.svg";
import Button from "../typography/Button";
import { useRouter } from "next/router";
import { signOutUser } from "../../lib/signOutUser";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function Nav() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center my-5 mx-4">
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
      <div className="flex flex-col md:flex-row gap-1 items-center">
        {user ? (
          <span className="dark:text-text-light text-bg-dark">
            {user.displayName}
          </span>
        ) : null}
        {user ? (
          <Button
            title="Sign Out"
            className="dark:bg-bg-dark "
            onClick={() => signOutUser(router)}
          >
            <SignOutLogo className="h-6 w-6 inline text-text-light hover:opacity-70" />
          </Button>
        ) : null}
        <Button title="Toggle Theme" className="dark:bg-bg-dark">
          <ToggleTheme className="h-5 w-5 hover:opacity-70" />
        </Button>
      </div>
    </nav>
  );
}
