import React, { useState } from "react";
import Spinner from "../Spinner";
import TimesSolid from "../../public/icons/times-solid.svg";

export default function ImageInput({
  title,
  name,
  accept,
  state,
  handleState,
  children,
  seterror,
  ...props
}) {
  const [processing, setprocessing] = useState(false);

  const imageUpload = async (event) => {
    setprocessing(true);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onerror = (err) => seterror(err);
    reader.onabort = (err) => seterror(err);
    if (theFile && theFile.type.match("image.*")) {
      reader.readAsDataURL(theFile);
    } else {
      return handleState("");
    }
    reader.onloadend = (finishedEvent) => {
      const {
        target: { result },
      } = finishedEvent;
      handleState(result);
      setprocessing(false);
    };
    reader.onprogress = () => {
      setprocessing(true);
    };
  };

  const handleClearPhoto = () => {
    const element = document.querySelector(`#${name}`);
    handleState("");
    element.value = null;
  };

  return (
    <div className="relative">
      <input
        id={name}
        title={title}
        name={name}
        type="file"
        accept={accept}
        required
        onChange={imageUpload}
        {...props}
      >
        {children}
      </input>
      {processing ? (
        <Spinner className="absolute top-0 right-4 h-5 w-5" />
      ) : null}
      {state ? (
        <TimesSolid
          onClick={() => handleClearPhoto()}
          className="w-5 h-5 absolute top-2 right-4 text-text-light opacity-70 hover:opacity-100 cursor-pointer"
        />
      ) : null}
    </div>
  );
}
