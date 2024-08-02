interface Props {
  title: string;
}

export default function AppBasicCard({ title }: Props) {
  return (
    <div className="border rounded border-white text-white text-xl font-semibold p-4 my-2">
      {title}
    </div>
  );
}
