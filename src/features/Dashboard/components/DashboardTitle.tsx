type Props = {
  title: string;
  description: string;
  name?: string;
};
export default function DashboardTitle({ title, description, name }: Props) {
  return (
    <div className="leading-4">
      <h1 className="font-semibold">
        {title} {name}
      </h1>
      <span className="text-secondary-foreground text-xs">{description}</span>
    </div>
  );
}
