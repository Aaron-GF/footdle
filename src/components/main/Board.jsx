export default function Board() {
  return (
    <div className="grid grid-cols-4 grid-rows-4 bg-main w-full max-w-md rounded-xl">
      {Array.from({ length: 16 }).map((_, i) => (
        <div
          key={i}
          className="aspect-square text-bg flex items-center justify-center"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
