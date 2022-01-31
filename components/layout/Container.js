export default function Container({ className, children, ...props }) {
  return (
    <div className={`mx-auto flex px-2 md:px-8 ${className}`} {...props}>
      {children}
    </div>
  );
}
