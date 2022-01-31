import Image from "next/image";
import H2 from "../typography/H2";
import normalizeCardTitle from "../../lib/text_formatting/normalizeCardTitle";

export default function QuickLinkCard({ title, link, iconLink, description }) {
  return (
    <a
      className="bg-bg-dark px-3 pt-4 pb-5 rounded-lg hover:opacity-60 transition-opacity"
      href={link}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex flex-col gap-2 max-w-[200px]">
        <H2 className="mx-auto break-all">{normalizeCardTitle(title)}</H2>
        <div className="relative h-10">
          <Image src={iconLink} alt={title} layout="fill" />
        </div>
      </div>
    </a>
  );
}
