import React, { useState, useEffect } from "react";
import sortCardsAlphabetical from "../../lib/sorting/sortCardsAlphabetical";
import CardGrid from "../layout/CardGrid";
import ThemeH2 from "../typography/ThemeH2";
import ChevronRight from "../../public/icons/chevron-right-solid.svg";
import QuickLinkCard from "./QuickLinkCard";

export default function CompanyCardsSection({ customer, cards }) {
  const [isopen, setisopen] = useState(false);
  const [customerCards, setcustomerCards] = useState([]);

  useEffect(() => {
    // Filters cards from all available to match customer, then sorts them alphabetically
    const filteredCards = cards.filter(
      (card) => card.customer.id === customer.id
    );
    const sorted = sortCardsAlphabetical(filteredCards);
    setcustomerCards(sorted);
  }, [cards, customer.id]);

  return (
    <React.Fragment>
      <div>
        <button
          className={`transition-opacity ${
            isopen ? "opacity-100" : "opacity-60"
          }`}
          onClick={() => setisopen(!isopen)}
        >
          <ThemeH2>
            {customer.name}
            <ChevronRight
              className={`ml-2 w-4 h-4 transition-transform inline ${
                isopen ? "rotate-90" : "rotate-0"
              }`}
            />
          </ThemeH2>
        </button>
      </div>
      {isopen ? (
        <CardGrid>
          {customerCards.map((card) => (
            <QuickLinkCard
              cardId={card.id}
              key={card.id}
              title={card.name}
              link={card.link}
              iconLink={card.image}
            />
          ))}
        </CardGrid>
      ) : null}
    </React.Fragment>
  );
}
