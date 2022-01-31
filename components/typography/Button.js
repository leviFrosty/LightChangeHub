export default function Button({ className, children, ...props }) {
  return (
    <button
      className={`hover:underline text-text-light rounded-lg dark:bg-bg-darker bg-slate-600 px-3 py-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
