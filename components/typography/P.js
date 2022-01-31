export default function P({ children, className }) {
  return (
    <p className={`dark:text-white text-bg-dark mt-1 mb-4  ${className}`}>
      {children}
    </p>
  );
}
