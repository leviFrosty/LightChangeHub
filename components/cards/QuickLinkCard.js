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
import CopyButton from "../buttons/CopyButton";

export default function QuickLinkCard({
  cardId,
  title,
  link,
  iconLink,
  customer,
}) {
  const [isediting, setisediting] = useState(false);
  const [editedTitle, seteditedTitle] = useState(title);
  const [editedURI, setEditedURI] = useState(link);

  const handleTitleSave = async () => {
    if (editedTitle === title) return;
    const docRef = doc(db, "cards", cardId);
    await setDoc(docRef, { name: editedTitle }, { merge: true });
  };
  const handleURISave = async () => {
    if (editedURI === link) return;
    const docRef = doc(db, "cards", cardId);
    await setDoc(docRef, { link: editedURI }, { merge: true });
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
      className={`relative dark:bg-bg-dark bg-slate-200 px-3 pt-3 pb-4 opacity-80 rounded-lg ${
        isediting ? "hover:opacity-80" : "hover:opacity-100"
      } transition-opacity`}
      href={link}
      rel="noreferrer"
      target="_blank"
      draggable={false}
    >
      <div className="flex flex-row justify-between">
        <div className="relative flex flex-row items-center">
          <CopyButton link={link} />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleTitleSave();
              handleURISave();
              setisediting(!isediting);
            }}
            className="opacity-30 hover:opacity-100 dark:text-text-light transition-opacity"
          >
            {isediting ? (
              <Floppy className="w-4 h-4" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteCard();
            }}
            className="opacity-30 hover:opacity-100 dark:text-text-light transition-opacity"
          >
            <Times className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-w-[200px]">
        {isediting ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTitleSave();
              setisediting(!isediting);
            }}
            className="w-full my-2 flex flex-col gap-2"
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
              className="hover:opacity-100 w-full active:opacity-100 rounded-lg px-1 py-1 text-lg"
            />
            <input
              type="text"
              value={editedURI}
              onChange={(e) => {
                // Sets state from input
                const {
                  target: { value },
                } = e;
                setEditedURI(value);
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className="hover:opacity-100 w-full active:opacity-100 rounded-lg px-1 py-1 text-lg"
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
              <Image priority src={iconLink} alt={title} layout="fill" />
            </div>
          ) : (
            <WarningTriangle className="h-10 text-text-light" />
          )}
        </div>
      </div>
      {customer ? (
        <div className="flex flex-row justify-center dark:text-text-light text-bg-dark">
          {customer}
        </div>
      ) : null}
    </a>
  );
}
