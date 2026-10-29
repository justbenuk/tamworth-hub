import { cn } from "@/lib/utils";
import DOMPurify from "isomorphic-dompurify";

type TiptapContentProps = {
  content: string;
  className?: string;
};

export default function EditorContent({
  content,
  className,
}: TiptapContentProps) {
  if (!content) return null;

  const sanitized = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={cn("tiptap-content text-lead space-y-4", className)}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
