import Layout from "../components/layout/Index";
import H2 from "../components/typography/H2";
import LoginForm from "../components/login/Index";
import UserContext from "../contexts/userContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import H1 from "../components/typography/H1";
import Spinner from "../components/Spinner";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import Container from "../components/Layout/Container";

export default function Home() {
  const { user, isLoading } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoading === false) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [isLoading]);

  return (
    <Layout home>
      {isLoading || user === null ? (
        <SpinnerFullScreen />
      ) : (
        <Container className="max-w-full">
          <H2>Quick Links</H2>
        </Container>
      )}
    </Layout>
  );
}
