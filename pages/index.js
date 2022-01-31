import PageLayout from "../components/layout/PageLayout";
import UserContext from "../contexts/userContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import Container from "../components/layout/Container";
import QuickLinkCard from "../components/cards/QuickLinkCard";
import CardGrid from "../components/layout/CardGrid";
import ThemeH2 from "../components/typography/ThemeH2";

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
    <PageLayout home>
      {isLoading || user === null ? (
        <SpinnerFullScreen />
      ) : (
        <Container className="max-w-full flex-col relative">
          <div></div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:pr-2 md:border-r-2 border-text-light border-opacity-10">
              <ThemeH2>Quick Links</ThemeH2>
              <CardGrid>
                <QuickLinkCard
                  title="Datto RMM"
                  link="https://concordrmm.centrastage.net/dashboard"
                  iconLink="https://firebasestorage.googleapis.com/v0/b/lightchangehub.appspot.com/o/icons%2Fdatto-logo-blue-datto.0f6cddcb.svg?alt=media&token=52a335ae-4fb2-4432-a890-e59404557a0d"
                />
              </CardGrid>
            </div>
            <div className="flex flex-col md:pl-2 w-full">
              <ThemeH2>Citizens Financial</ThemeH2>
              <CardGrid>
                <QuickLinkCard
                  title="Datto RMM"
                  link="https://concordrmm.centrastage.net/dashboard"
                  iconLink="https://firebasestorage.googleapis.com/v0/b/lightchangehub.appspot.com/o/icons%2Fdatto-logo-blue-datto.0f6cddcb.svg?alt=media&token=52a335ae-4fb2-4432-a890-e59404557a0d"
                />
              </CardGrid>
            </div>
          </div>
        </Container>
      )}
    </PageLayout>
  );
}
