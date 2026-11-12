import DatabaseIcon from "@/components/Shared/DatabaseIcon";

export default function CategoryIcon({ name }: { name: string | undefined }) {
  return <DatabaseIcon name={name} size="small" className="size-3" />;
}
