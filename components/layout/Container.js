export default function Container({ className, children, ...props }) {
  return (
    <div
      className={`mx-auto flex flex-col px-2 md:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
