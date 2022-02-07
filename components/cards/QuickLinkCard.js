import Image from "next/image";
import ThemeH2 from "../typography/ThemeH2";
import normalizeCardTitle from "../../lib/text_formatting/normalizeCardTitle";
import WarningTriangle from "../../public/icons/exclamation-triangle-solid.svg";

export default function QuickLinkCard({ title, link, iconLink }) {
  return (
    <a
      className="bg-bg-dark px-3 pt-4 pb-5 rounded-lg hover:opacity-60 transition-opacity"
      href={link}
      rel="noreferrer"
      target="_blank"
    >
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
