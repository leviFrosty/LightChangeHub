import Layout from "../components/layout/Index";
import LoginForm from "../components/login/Index";
import Container from "../components/Layout/Container";
import H1 from "../components/typography/H1";
import P from "../components/typography/P";
import SignOutLogo from "../public/icons/sign-out-alt-solid.svg";
import { useRouter } from "next/router";
import { signOutUser } from "../lib/signOutUser";
import Button from "../components/typography/Button";
import { useContext, useEffect } from "react";
import UserContext from "../contexts/userContext";

export default function login() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) router.replace("/");
    }
  }, [isLoading, user]);

  return (
    <Layout>
      <Container className="items-center justify-center">
        <div className="flex flex-col items-center dark:bg-bg-dark bg-slate-700 rounded-lg px-20 pb-32 pt-10 shadow-lg">
          <H1 className="mb-10 text-white">Login</H1>
          <div className="flex flex-col gap-3 mt-10">
            <LoginForm router={router} />
            <Button
              className="bg-bg-darker shadow-md text-text-light"
              onClick={() => signOutUser(router)}
            >
              Sign out <SignOutLogo className="h-5 w-5 inline" />
            </Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
