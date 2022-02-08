import React, { useEffect, useState } from "react";
import SearchSolid from "../../public/icons/search-solid.svg";
import Times from "../../public/icons/times-solid.svg";
import QuickLinkCard from "../cards/QuickLinkCard";

export default function CardSearchBar({ cards }) {
  const [search, setsearch] = useState("");
  const [hits, sethits] = useState([]);

  useEffect(() => {
    const filteredCards = cards.filter((card) => {
      // Normalized search entry
      const normalizedSearch = search.toLowerCase();
      // Search options
      const normalizedName = card.name.toLowerCase();
      const normalizedURL = card.link.toLowerCase();
      const normalizedCustomerName = card.customer.name.toLowerCase();
      return (
        normalizedName.includes(normalizedSearch) ||
        normalizedURL.includes(normalizedSearch) ||
        normalizedCustomerName.includes(normalizedSearch)
      );
    });
    sethits(filteredCards);
  }, [search, cards]);

  return (
    <div className="relative w-[250px]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="rounded-lg w-full bg-text-light px-2 py-1"
          value={search}
          onChange={(e) => {
            const {
              target: { value },
            } = e;
            setsearch(value);
          }}
        />
        {search == "" ? (
          <button className="cursor-default">
            <SearchSolid className="w-5 h-5 absolute right-2 top-[15%] text-bg-dark opacity-50" />
          </button>
        ) : null}
      </form>
      {search !== "" ? (
        <div className="absolute top-10 z-10 w-full bg-bg-darker border-2 border-text-light border-opacity-50 bg-opacity-100 p-3 rounded-lg">
          {hits.length == 0 ? (
            <p className="text-text-light">No cards founds</p>
          ) : null}
          {hits.length !== 0 ? (
            <div className="flex flex-col gap-2">
              {hits.map((hit) => (
                <QuickLinkCard
                  title={hit.name}
                  key={hit.id}
                  link={hit.link}
                  iconLink={hit.iconLink}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {search !== "" ? (
        <div className="absolute right-2 top-[15%] text-bg-dark">
          <button onClick={() => setsearch("")}>
            <Times className="w-4 h-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
