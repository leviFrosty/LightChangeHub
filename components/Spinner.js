import SpinnerIcon from "../public/icons/spinner-solid.svg";
export default function Spinner({ className }) {
  return (
    <SpinnerIcon
      className={`animate-spin dark:text-white text-bg-dark ${className}`}
    />
  );
}
