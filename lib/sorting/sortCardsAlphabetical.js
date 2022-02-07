const sortCardsAlphabetical = (cards) => {
  if (cards.length === 0) {
    return cards;
  }
  const sorted = cards.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return sorted;
};

export default sortCardsAlphabetical;
