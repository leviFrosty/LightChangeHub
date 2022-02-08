import Image from "next/image";
import ThemeH2 from "../typography/ThemeH2";
import normalizeCardTitle from "../../lib/text_formatting/normalizeCardTitle";
import WarningTriangle from "../../public/icons/exclamation-triangle-solid.svg";
import Times from "../../public/icons/times-solid.svg";
import Pencil from "../../public/icons/pencil-alt-solid.svg";
import Floppy from "../../public/icons/save-solid.svg";
import { doc, deleteDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";
import { useState } from "react";

export default function QuickLinkCard({ cardId, title, link, iconLink }) {
  const [isediting, setisediting] = useState(false);
  const [editedTitle, seteditedTitle] = useState(title);

  const handleTitleSave = async () => {
    if (editedTitle === title) return;
    const docRef = doc(db, "cards", cardId);
    await setDoc(docRef, { name: editedTitle }, { merge: true });
  };

  const deleteCard = async () => {
    const isUserSure = window.confirm(
      `Are you sure you want to delete ${title}?\nSite link: ${link}`
    );
    if (!isUserSure) return;
    const docRef = doc(db, "cards", cardId);
    await deleteDoc(docRef);
  };

  return (
    <a
      className={`relative dark:bg-bg-dark bg-slate-200 px-3 pt-4 pb-5  rounded-lg ${
        isediting ? "hover:opacity-100" : "hover:opacity-60"
      } transition-opacity`}
      href={link}
      rel="noreferrer"
      target="_blank"
    >
      <div className="absolute top-1 right-2 flex flex-row gap-1 items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleTitleSave();
            setisediting(!isediting);
          }}
          className="opacity-30 hover:opacity-100 transition-opacity"
        >
          {isediting ? (
            <Floppy className="w-3 h-3" />
          ) : (
            <Pencil className="w-3 h-3" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            deleteCard();
          }}
          className="opacity-30 hover:opacity-100 transition-opacity"
        >
          <Times className="w-3 h-3" />
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2 max-w-[200px]">
        {isediting ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTitleSave();
              setisediting(!isediting);
            }}
            className="w-full"
          >
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => {
                // Sets state from input
                const {
                  target: { value },
                } = e;
                seteditedTitle(value);
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="hover:opacity-100 w-full active:opacity-100 rounded-lg px-1 mt-1 py-1 text-lg"
            />
          </form>
        ) : (
          <ThemeH2 className="mx-auto break-all">
            {normalizeCardTitle(title)}
          </ThemeH2>
        )}
        <div className="relative text-text-light flex flex-row justify-center">
          {iconLink ? (
            <div className="h-12 w-12 relative">
              <Image src={iconLink} alt={title} layout="fill" />
            </div>
          ) : (
            <WarningTriangle className="h-10 text-text-light" />
          )}
        </div>
      </div>
    </a>
  );
}
