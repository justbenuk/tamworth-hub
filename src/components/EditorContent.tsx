import { cn } from "@/lib/utils";

type TiptapContentProps = {
  content: string;
  className?: string;
};

export default function EditorContent({
  content,
  className,
}: TiptapContentProps) {
  if (!content) return null;

  return (
    <div
      className={cn("tiptap-content text-lead space-y-4", className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
