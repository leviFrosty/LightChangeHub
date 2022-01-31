import { signInWithRedirect, OAuthProvider } from "firebase/auth";
import { auth } from "../../lib/fbInstance";
import ThemeButton from "../typography/ThemeButton";

export default function LoginForm({ router }) {
  const provider = new OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    tenant: "mylightchange.onmicrosoft.com",
  });
  const handleMicrosoftClick = () => {
    console.log("user clicked sign in!");
    signInWithRedirect(auth, provider)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        // Handle error.
        console.log("error signing in user");
        console.log(error);
      });
  };

  return (
    <div>
      <ThemeButton
        className="bg-bg-darker shadow-md text-text-light"
        onClick={handleMicrosoftClick}
      >
        Sign in with Microsoft
      </ThemeButton>
    </div>
  );
}
