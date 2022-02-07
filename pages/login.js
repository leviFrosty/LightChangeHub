import PageLayout from "../components/layout/PageLayout";
import LoginForm from "../components/login/LoginForm";
import Container from "../components/layout/Container";
import ThemeH1 from "../components/typography/ThemeH1";
import SignOutLogo from "../public/icons/sign-out-alt-solid.svg";
import { useRouter } from "next/router";
import { signOutUser } from "../lib/signOutUser";
import ThemeButton from "../components/typography/ThemeButton";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import Head from "next/head";
import { SITE_TITLE_PREFIX } from ".";

export default function Login() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) router.replace("/");
    }
  }, [isLoading, user]);

  return (
    <PageLayout>
      <Head>
        <title>{SITE_TITLE_PREFIX} Login</title>
      </Head>
      <Container className="items-center justify-center">
        {isLoading ? (
          <SpinnerFullScreen />
        ) : (
          <div className="flex flex-col items-center dark:bg-bg-dark bg-slate-700 rounded-lg px-20 pb-32 pt-10 shadow-lg">
            <ThemeH1 className="mb-10 text-white">Login</ThemeH1>
            <div className="flex flex-col gap-3 mt-10">
              <LoginForm router={router} />
              {user ? (
                <ThemeButton
                  className="bg-bg-darker shadow-md text-text-light"
                  onClick={() => signOutUser(router)}
                >
                  Sign out <SignOutLogo className="h-5 w-5 inline" />
                </ThemeButton>
              ) : null}
            </div>
          </div>
        )}
      </Container>
    </PageLayout>
  );
}
