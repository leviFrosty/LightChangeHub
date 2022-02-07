export default function ThemeH2({ children, className }) {
  return (
    <h1 className={`text-2xl dark:text-white text-bg-darker  ${className}`}>
      {children}
    </h1>
  );
}
