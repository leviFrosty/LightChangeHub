import React, { useState } from "react";
import CopySolid from "../../public/icons/copy-solid.svg";

export default function CopyButton({ link }) {
  // Component needs to be wrapped with a container with position: relative
  const [iscopied, setiscopied] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(link);
        // Enables copy state then 300ms later disables
        setiscopied(true);
        setTimeout(() => {
          setiscopied(false);
        }, 300);
      }}
      // Creates seudo element after button to display the copy state and tooltip
      className={`${
        iscopied ? "after:content-['Copied!']" : "after:content-['Copy_URL']"
      } after:whitespace-nowrap after:absolute after:-top-6 after:-left-4 after:rounded-lg after:opacity-0 after:hover:opacity-100 after:px-2 after:block after:bg-lc-green after:text-text-light after:font-semibold opacity-30 hover:opacity-100 dark:text-text-light transition-opacity`}
    >
      <CopySolid className="w-4 h-4" />
    </button>
  );
}
