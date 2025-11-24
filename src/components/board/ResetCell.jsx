export default function ResetCell({ onReset }) {
  return (
    <button
      aria-label="Reiniciar"
      title="Reiniciar"
      onClick={(e) => {
        e.stopPropagation();
        onReset();
      }}
      className="size-18 flex items-center justify-center bg-background text-primary rounded-md hover:bg-secondary/80 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </svg>
    </button>
  );
}
