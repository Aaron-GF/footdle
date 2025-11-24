export default function PlayerCell({ name }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background rounded-md p-1">
      <span className="text-xs md:text-base font-bold text-center text-primary">
        {name}
      </span>
    </div>
  );
}
