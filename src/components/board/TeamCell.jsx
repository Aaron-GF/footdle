export default function TeamCell({ logo, teamName }) {
  return (
    <img
      src={logo}
      alt="Team"
      title={teamName}
      className="size-full p-2 sm:p-4 object-contain"
    />
  );
}
