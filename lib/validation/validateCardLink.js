const validateCardLink = (link, seterror) => {
  if (link.length > 500) {
    seterror("Card link may not exceed 500 characters");
    return false;
  }
  if (seterror === undefined) {
    throw new Error("Invalid validateCardLink params, seterror undefined");
  }
  const containsHttp = new RegExp("^(http|https)://", "i");
  const normalizedlink = link.toLowerCase();
  const match = containsHttp.test(normalizedlink);
  if (!match) {
    seterror("Card link must begin with http:// or https://");
    return false;
  }
  return true;
};

export default validateCardLink;
