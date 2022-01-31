const normalizeCardTitle = (title) => {
  if (!typeof title == "string") return ""; // Rejects non-string inputs
  const maxlen = 12;
  if (title.length > maxlen) {
    const normalized = `${title.substring(0, maxlen)}...`;
    return normalized;
  }
  return title;
};

export default normalizeCardTitle;
