import Link from "next/link";

export default function GoHome() {
  return (
    <Link href="/">
      <a className="dark:text-white text-bg-dark text-lg font-bold hover:underline px-3 py-1 rounded-lg w-fit">
        ← Go Home
      </a>
    </Link>
  );
}
