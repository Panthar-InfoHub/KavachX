"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { BubbleMenu as BubbleMenuExtension } from "@tiptap/extension-bubble-menu";
import { StarterKit } from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { TextAlign } from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { TaskList } from "@tiptap/extension-task-list";
import { TaskItem } from "@tiptap/extension-task-item";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Placeholder } from "@tiptap/extension-placeholder";

import { EditorToolbar } from "./editor-toolbar";
import { CustomImage, ImageLayout } from "./custom-image-extension";

interface BlogEditorProps {
  content: string;
  onChange: (serializedJson: string) => void;
  placeholder?: string;
}

export function BlogEditor({
  content,
  onChange,
  placeholder = "Start writing your blog content...",
}: BlogEditorProps) {
  // Parse incoming content safely (JSON or string)
  const parseInitialContent = (rawContent: string) => {
    if (!rawContent || !rawContent.trim()) return "";
    try {
      if (rawContent.trim().startsWith("{")) {
        return JSON.parse(rawContent);
      }
    } catch {
      // Return raw string if JSON parsing fails
    }
    return rawContent;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-violet-400 underline underline-offset-4 hover:text-violet-300 transition-colors",
        },
      }),
      CustomImage.configure({
        HTMLAttributes: {
          class: "rounded-xl border border-white/10 shadow-lg my-4 max-w-full transition-all",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse border border-white/20 my-4 text-xs font-sans",
        },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-white/20 bg-white/10 p-2.5 font-bold text-left text-white",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-white/20 p-2.5 text-white/80",
        },
      }),
      TaskList.configure({
        HTMLAttributes: {
          class: "space-y-1.5 my-3 list-none pl-1",
        },
      }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: {
          class: "flex items-start gap-2 text-white/90",
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-amber-400/30 text-amber-200 px-1 py-0.5 rounded",
        },
      }),
      Subscript,
      Superscript,
      Placeholder.configure({
        placeholder,
      }),
      BubbleMenuExtension,
    ],
    content: parseInitialContent(content),
    onUpdate: ({ editor }) => {
      const jsonStr = JSON.stringify(editor.getJSON());
      onChange(jsonStr);
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[320px] p-6 text-sm text-white/90 leading-relaxed font-sans font-normal antialiased",
      },
    },
  });

  const setImageLayout = (layout: ImageLayout) => {
    if (!editor) return;
    editor.chain().focus().updateAttributes("image", { layout }).run();
  };

  const deleteImage = () => {
    if (!editor) return;
    editor.chain().focus().deleteSelection().run();
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden shadow-2xl focus-within:border-violet-500/50 transition-all relative">
      <EditorToolbar editor={editor} />

      {/* Bubble Menu for Image Node Layout Controls */}
      {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor }) => editor.isActive("image")}
          className="flex items-center gap-1 p-1.5 rounded-xl bg-zinc-900/95 border border-white/15 backdrop-blur-md shadow-2xl text-xs font-mono"
        >
          <span className="text-[10px] text-white/40 uppercase tracking-wider px-1.5 font-mono">
            Layout
          </span>

          <button
            type="button"
            onClick={() => setImageLayout("left")}
            className={`px-2 py-1 rounded-lg transition-all ${
              editor.getAttributes("image").layout === "left"
                ? "bg-violet-600 text-white font-bold"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            title="Float Left (Text Wrap)"
          >
            ← Left
          </button>

          <button
            type="button"
            onClick={() => setImageLayout("center")}
            className={`px-2 py-1 rounded-lg transition-all ${
              editor.getAttributes("image").layout === "center"
                ? "bg-violet-600 text-white font-bold"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            title="Center Block"
          >
            Center
          </button>

          <button
            type="button"
            onClick={() => setImageLayout("right")}
            className={`px-2 py-1 rounded-lg transition-all ${
              editor.getAttributes("image").layout === "right"
                ? "bg-violet-600 text-white font-bold"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            title="Float Right (Text Wrap)"
          >
            Right →
          </button>

          <button
            type="button"
            onClick={() => setImageLayout("full")}
            className={`px-2 py-1 rounded-lg transition-all ${
              editor.getAttributes("image").layout === "full" || !editor.getAttributes("image").layout
                ? "bg-violet-600 text-white font-bold"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            title="Full Width Block"
          >
            Full
          </button>

          <div className="w-px h-4 bg-white/15 my-auto mx-0.5" />

          <button
            type="button"
            onClick={deleteImage}
            className="px-2 py-1 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all"
            title="Delete Image"
          >
            Delete
          </button>
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />

      {/* Editor CSS overrides for tiptap elements */}
      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: rgba(255, 255, 255, 0.3);
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror img[data-layout="left"] {
          float: left;
          margin-right: 1.5rem;
          margin-bottom: 1rem;
          max-width: 45%;
        }
        .ProseMirror img[data-layout="right"] {
          float: right;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          max-width: 45%;
        }
        .ProseMirror img[data-layout="center"] {
          display: block;
          margin-left: auto;
          margin-right: auto;
          max-width: 75%;
        }
        .ProseMirror img[data-layout="full"] {
          display: block;
          width: 100%;
        }
        .ProseMirror h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #ffffff;
          font-family: var(--font-syne), sans-serif;
        }
        .ProseMirror h2 {
          font-size: 1.35rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
          font-family: var(--font-syne), sans-serif;
        }
        .ProseMirror h3 {
          font-size: 1.15rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
          font-family: var(--font-syne), sans-serif;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.25rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid rgba(139, 92, 246, 0.6);
          padding-left: 1rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.7);
        }
        .ProseMirror pre {
          background-color: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          padding: 1rem;
          font-family: monospace;
          margin-top: 1rem;
          margin-bottom: 1rem;
          color: #a7f3d0;
          overflow-x: auto;
        }
        .ProseMirror hr {
          border-color: rgba(255, 255, 255, 0.1);
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .ProseMirror ul[data-type="taskList"] li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
        .ProseMirror ul[data-type="taskList"] li input[type="checkbox"] {
          margin-top: 0.25rem;
          cursor: pointer;
          accent-color: #8b5cf6;
        }
      `}</style>
    </div>
  );
}
