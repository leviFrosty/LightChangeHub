import Spinner from "./Spinner";

export default function SpinnerFullScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner className="h-10 w-10" />
    </div>
  );
}
