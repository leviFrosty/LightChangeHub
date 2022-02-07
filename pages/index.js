import PageLayout from "../components/layout/PageLayout";
import UserContext from "../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SpinnerFullScreen from "../components/SpinnerFullScreen";
import Container from "../components/layout/Container";
import QuickLinkCard from "../components/cards/QuickLinkCard";
import CardGrid from "../components/layout/CardGrid";
import ThemeH2 from "../components/typography/ThemeH2";
import PlusIcon from "../public/icons/plus-solid.svg";
import NewCard from "../components/cards/NewCard";
import { db } from "../lib/fbInstance";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import CompanyCardsSection from "../components/cards/CompanyCardsSection";
import Head from "next/head";
import sortCardsAlphabetical from "../lib/sorting/sortCardsAlphabetical";
export const quicklinksId = "quicklinks";
export const SITE_TITLE_PREFIX = "LightChange Hub -";

export default function Home({ cards, customers }) {
  const { user, isLoading } = useContext(UserContext);
  const [isNewCardOpen, setisNewCardOpen] = useState(false);
  const [quickLinks, setquickLinks] = useState([]);
  const [otherCards, setotherCards] = useState([]);
  const router = useRouter();

  const diveyOutCards = (allCards) => {
    const filteredArray = allCards.filter(
      (card) => card.customer.id == quicklinksId
    );
    const filteredotherCards = allCards.filter(
      (obj) => obj.customer.id !== quicklinksId
    );

    setquickLinks(sortCardsAlphabetical(filteredArray));
    setotherCards(filteredotherCards);
  };

  useEffect(() => {
    const q = query(collection(db, "cards"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedCards = [];
      querySnapshot.forEach((doc) => {
        fetchedCards.push(doc.data());
      });
      diveyOutCards(fetchedCards);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      if (!user) {
        router.push("/login");
      }
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    diveyOutCards(cards);
  }, [cards]);

  return (
    <PageLayout home>
      <Head>
        <title>{SITE_TITLE_PREFIX} Dashboard</title>
      </Head>
      {isLoading || user === null ? (
        <SpinnerFullScreen />
      ) : (
        <Container className="max-w-full flex-col relative">
          <div className="flex flex-col relative">
            <div className="flex flex-row justify-end">
              {isNewCardOpen ? null : (
                <button
                  onClick={() => setisNewCardOpen(!isNewCardOpen)}
                  className="flex flex-row gap-1 text-lg items-center hover:underline text-lc-green-light hover:opacity-80 cursor-pointer"
                >
                  New Card
                  <PlusIcon className="w-5 h-5 inline" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-center">
            {isNewCardOpen ? (
              <NewCard
                customers={customers}
                className="max-w-2xl"
                setisNewCardOpen={setisNewCardOpen}
                isNewCardOpen={isNewCardOpen}
              />
            ) : null}
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col w-full md:pr-2 md:border-r-2 border-text-light border-opacity-10">
              <ThemeH2>Quick Links</ThemeH2>
              <CardGrid>
                {quickLinks.map((quickLink) => (
                  <QuickLinkCard
                    cardId={quickLink.id}
                    key={quickLink.id}
                    title={quickLink.name}
                    link={quickLink.link}
                    iconLink={quickLink.image}
                  />
                ))}
              </CardGrid>
            </div>
            <div className="flex flex-col md:pl-2 w-full">
              {customers
                .filter((customer) => customer.id !== quicklinksId)
                .map((customer) => (
                  <CompanyCardsSection
                    key={customer.id}
                    customer={customer}
                    cards={otherCards}
                  />
                ))}
            </div>
          </div>
        </Container>
      )}
    </PageLayout>
  );
}

export async function getServerSideProps() {
  // Gets all cards from database
  const q = query(collection(db, "cards"));
  const querySnapshot = await getDocs(q);
  const cards = [];
  querySnapshot.forEach((doc) => cards.push(doc.data()));
  // Gets all customers from database
  const docRef = await doc(db, "customers", "customerList");
  const res = await getDoc(docRef);
  const { data } = await res.data();

  // Passes to component
  return {
    props: {
      cards,
      customers: data,
    },
  };
}
