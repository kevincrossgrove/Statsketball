interface Props {
  title: string;
  actions?: React.ReactNode;
}

export default function AppHeader({ title, actions }: Props) {
  return (
    <div className="flex justify-between items-center p-4 bg-background text-text">
      <h1 className="text-3xl font-semibold">{title}</h1>
      {actions}
    </div>
  );
}
