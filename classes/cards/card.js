import { nanoid } from "nanoid";

export default class Card {
  name = "";
  link = "";
  image = "";
  customer = {};
  constructor(name, link, image, customer) {
    (this.id = nanoid()),
      (this.name = name),
      (this.link = link),
      (this.image = image),
      (this.customer = customer);
  }
}
