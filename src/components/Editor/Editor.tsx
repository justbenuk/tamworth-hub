"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  CodeIcon,
  Heading01Icon,
  Heading02Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  LinkIcon,
  LinkOffIcon,
  ParagraphIcon,
  QuoteIcon,
  Redo02Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect } from "react";
import type { ReactNode } from "react";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
};

type ToolbarButtonProps = {
  editor: TiptapEditor;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function ToolbarButton({
  editor,
  label,
  active,
  disabled,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="icon-sm"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled || !editor.isEditable}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function EditorToolbar({ editor }: { editor: TiptapEditor }) {
  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", previousUrl ?? "");

    if (url === null) return;

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap gap-1 border-b bg-muted/40 p-1">
      <ToolbarButton
        editor={editor}
        label="Paragraph"
        active={editor.isActive("paragraph")}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <HugeiconsIcon icon={ParagraphIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Heading 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <HugeiconsIcon icon={Heading01Icon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Heading 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <HugeiconsIcon icon={Heading02Icon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Bold"
        active={editor.isActive("bold")}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <HugeiconsIcon icon={TextBoldIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Italic"
        active={editor.isActive("italic")}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <HugeiconsIcon icon={TextItalicIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Underline"
        active={editor.isActive("underline")}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <HugeiconsIcon icon={TextUnderlineIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Strikethrough"
        active={editor.isActive("strike")}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <HugeiconsIcon icon={TextStrikethroughIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <HugeiconsIcon icon={LeftToRightListBulletIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <HugeiconsIcon icon={LeftToRightListNumberIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <HugeiconsIcon icon={QuoteIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Code block"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <HugeiconsIcon icon={CodeIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Link"
        active={editor.isActive("link")}
        onClick={setLink}
      >
        <HugeiconsIcon icon={LinkIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Remove link"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <HugeiconsIcon icon={LinkOffIcon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Undo"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        <HugeiconsIcon icon={Undo02Icon} />
      </ToolbarButton>
      <ToolbarButton
        editor={editor}
        label="Redo"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        <HugeiconsIcon icon={Redo02Icon} />
      </ToolbarButton>
    </div>
  );
}

export default function Editor({
  value,
  onChange,
  onBlur,
  className,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "tiptap-content prose-editor min-h-72 w-full px-3 py-2 text-sm outline-none focus-visible:ring-0",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML());
    },
    onBlur,
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === value) return;

    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div
        className={cn(
          "min-h-72 w-full rounded-md border bg-background",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-input bg-background shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
        className,
      )}
    >
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
