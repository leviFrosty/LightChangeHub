import ToggleTheme from "../theme/ToggleTheme";
import SignOutLogo from "../../public/icons/sign-out-alt-solid.svg";
import Button from "../typography/Button";
import { useRouter } from "next/router";
import { signOutUser } from "../../lib/signOutUser";
import { useContext } from "react";
import UserContext from "../../contexts/userContext";

export default function Nav() {
  const { user, isLoading } = useContext(UserContext);

  const router = useRouter();
  return (
    <nav className="flex flex-col md:flex-row justify-between items-center my-5 mx-4">
      <button
        className="text-4xl text-lc-green"
        onClick={() => {
          router.push("/");
        }}
      >
        LightChange
        <span className="pl-2 dark:text-white text-bg-dark">Hub</span>
      </button>
      <div className="flex flex-col md:flex-row gap-3 items-center">
        {user ? (
          <span className="dark:text-text-light text-bg-dark">
            {user.displayName}
          </span>
        ) : null}
        {user ? (
          <Button
            className="dark:bg-bg-dark "
            onClick={() => signOutUser(router)}
          >
            <SignOutLogo className="h-6 w-6 inline text-text-light hover:opacity-70" />
          </Button>
        ) : null}
        <Button className="dark:bg-bg-dark">
          <ToggleTheme className="h-6 w-6 hover:opacity-70" />
        </Button>
      </div>
    </nav>
  );
}
