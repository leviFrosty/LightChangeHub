export default function CardGrid({ children, ...props }) {
  return (
    <div
      className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 my-2 mb-6"
      {...props}
    >
      {children}
    </div>
  );
}
