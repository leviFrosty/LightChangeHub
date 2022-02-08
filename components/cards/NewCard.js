import ThemeH2 from "../typography/ThemeH2";
import TimesIcon from "../../public/icons/times-solid.svg";
import ImageInput from "../typography/ImageInput";
import { useState } from "react";
import { db, storage } from "../../lib/fbInstance";
import { doc, setDoc } from "firebase/firestore";
import Card from "../../classes/cards/card";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Spinner from "../Spinner";

export default function NewCard({
  isNewCardOpen,
  setisNewCardOpen,
  customers,
  className,
  ...props
}) {
  const [card, setcard] = useState(new Card("", "", "", {}));
  const [error, seterror] = useState("");
  const [isuploading, setisuploading] = useState(false);
  const [uploadSession, setuploadSession] = useState({
    hasAttemptedUpload: false,
    success: false,
    uploadCount: 0,
  });

  const resetForm = (success) => {
    setisuploading(false);
    setcard(new Card("", "", "", "quicklinks"));
    document.querySelector("#fileuploadicon").value = "";
    const obj = { ...uploadSession };
    if (success === true) {
      obj.hasAttemptedUpload = true;
      obj.uploadCount = obj.uploadCount + 1;
      obj.success = true;
    } else {
      obj.hasAttemptedUpload = true;
      obj.success = false;
    }
    setuploadSession(obj);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisuploading(true);
    seterror("");
    const checkcustomer = () => {
      if (typeof card.customer === "string") return JSON.parse(card.customer);
      return card.customer;
    };
    const customer = checkcustomer();
    try {
      const storageRef = ref(storage, `cards/${customer.id}/${card.id}`);
      const uploadResult = await uploadString(
        storageRef,
        card.image,
        "data_url"
      );
      const imageurl = await getDownloadURL(storageRef);
      const { id, name, link } = card;
      const newCard = {
        id,
        name,
        link,
        image: imageurl,
        customer: {
          id: customer.id,
          name: customer.name,
        },
      };
      const firestoreRef = doc(db, "cards", id);
      setDoc(firestoreRef, newCard).then(() => {
        resetForm(true);
      });
    } catch (err) {
      resetForm(false);
      seterror(err.message);
    }
  };

  const setcustomer = (e) => {
    const {
      target: { value },
    } = e;
    const obj = { ...card };
    obj.customer = value;
    setcard(obj);
  };
  const setname = (e) => {
    const {
      target: { value },
    } = e;
    const obj = { ...card };
    obj.name = value;
    setcard(obj);
  };
  const setlink = (e) => {
    const {
      target: { value },
    } = e;
    const obj = { ...card };
    obj.link = value;
    setcard(obj);
  };
  const setimage = (value) => {
    const obj = { ...card };
    obj.image = value;
    setcard(obj);
  };

  return (
    <div
      className={`dark:bg-bg-dark bg-slate-200 rounded-lg px-4 py-4 pb-5 mb-4 ${className} text-text-light`}
      {...props}
    >
      <div className="flex flex-col">
        <div className="flex flex-row relative">
          <ThemeH2 className="mx-auto">
            New Card{" "}
            {uploadSession.hasAttemptedUpload ? (
              <span
                className={
                  uploadSession.success === true
                    ? "text-lc-green"
                    : "text-red-500"
                }
              >
                {uploadSession.success === true ? "✔️" : "❌"}
              </span>
            ) : null}
          </ThemeH2>
          <TimesIcon
            className="h-5 w-5 opacity-80 hover:opacity-100 absolute right-0 cursor-pointer"
            onClick={() => setisNewCardOpen(!isNewCardOpen)}
          />
        </div>
        <div className="flex flex-col items-center my-2">
          {uploadSession.hasAttemptedUpload && uploadSession.uploadCount > 0 ? (
            <span className="flex flex-row gap-2 font-bold">
              Uploaded:{" "}
              <span className="text-lc-green">{uploadSession.uploadCount}</span>
            </span>
          ) : null}
        </div>
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="dark:text-text-light text-bg-dark" htmlFor="cardName">
          Category
        </label>
        <select
          type="text"
          name="cardName"
          value={card.customer}
          onChange={setcustomer}
          required
          className="bg-bg-darker hover:bg-neutral-900 transition-colors rounded-lg px-4 py-1"
        >
          <option value="">-- Select Category --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={JSON.stringify(customer)}>
              {customer.name}
            </option>
          ))}
        </select>
        <label className="dark:text-text-light text-bg-dark" htmlFor="cardName">
          Name
        </label>
        <input
          type="text"
          name="cardName"
          value={card.name}
          onChange={setname}
          required
          className="bg-bg-darker hover:bg-neutral-900 transition-colors rounded-lg px-4 py-1"
        />
        <label className="dark:text-text-light text-bg-dark" htmlFor="cardLink">
          Link
        </label>
        <input
          type="text"
          name="cardLink"
          value={card.link}
          onChange={setlink}
          required
          className="bg-bg-darker hover:bg-neutral-900 transition-colors rounded-lg px-4 py-1"
        />
        <label className="dark:text-text-light text-bg-dark" htmlFor="cardLink">
          Icon
        </label>
        <ImageInput
          title="Image"
          name="fileuploadicon"
          type="file"
          accept="image/*"
          required
          state={card.image}
          handleState={setimage}
          seterror={seterror}
        />
        <button
          className="rounded-lg bg-lc-green font-semibold hover:bg-lc-green-light transition-colors text-bg-darker my-3 px-3 py-1"
          type="submit"
        >
          Submit!
        </button>
      </form>
      <p className="text-lg text-red-500 font-semibold">{error}</p>
      {isuploading ? (
        <span className="flex flex-row justify-center">
          <Spinner className="w-5 h-5" />
        </span>
      ) : null}
    </div>
  );
}
