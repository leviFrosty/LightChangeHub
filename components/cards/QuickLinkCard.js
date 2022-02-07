import Image from "next/image";
import ThemeH2 from "../typography/ThemeH2";
import normalizeCardTitle from "../../lib/text_formatting/normalizeCardTitle";
import WarningTriangle from "../../public/icons/exclamation-triangle-solid.svg";
import Times from "../../public/icons/times-solid.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../lib/fbInstance";

export default function QuickLinkCard({ cardId, title, link, iconLink }) {
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
      className="relative dark:bg-bg-dark bg-slate-200 px-3 pt-4 pb-5  rounded-lg hover:opacity-60 transition-opacity"
      href={link}
      rel="noreferrer"
      target="_blank"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          deleteCard();
        }}
        className="absolute top-1 right-2 opacity-30 hover:opacity-100 transition-opacity"
      >
        <Times className="w-3 h-3" />
      </button>
      <div className="flex flex-col gap-2 max-w-[200px]">
        <ThemeH2 className="mx-auto break-all">
          {normalizeCardTitle(title)}
        </ThemeH2>
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
