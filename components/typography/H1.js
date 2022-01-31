export default function H1({ children, className }) {
  return (
    <h1 className={`text-4xl dark:text-white mt-1 mb-4  ${className}`}>
      {children}
    </h1>
  );
}
