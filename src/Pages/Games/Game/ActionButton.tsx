interface Props {
  title: string;
  onClick: () => void;
}

export default function ActionButton({ title, onClick }: Props) {
  return (
    <button
      className="rounded-sm border bg-white cursor-pointer px-2"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {title}
    </button>
  );
}
