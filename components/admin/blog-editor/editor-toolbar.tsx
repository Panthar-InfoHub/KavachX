"use client";

import { useState } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  SquareCode,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Highlighter,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Undo,
  Redo,
  Plus,
  Trash2,
} from "lucide-react";
import { LinkModal } from "./link-modal";
import { ImageModal } from "./image-modal";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);

  if (!editor) {
    return null;
  }

  const btnClass = (isActive: boolean) =>
    `p-1.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center border ${
      isActive
        ? "bg-violet-600/30 border-violet-500/50 text-violet-300 shadow-sm"
        : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
    }`;

  const handleLinkConfirm = (url: string) => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleLinkRemove = () => {
    editor.chain().focus().unsetLink().run();
  };

  const handleImageConfirm = ({ src, alt, layout }: { src: string; alt: string; layout?: string }) => {
    editor.chain().focus().setImage({ src, alt, layout } as any).run();
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-1.5 p-2 bg-black/60 border-b border-white/10 rounded-t-2xl sticky top-0 z-20 backdrop-blur-md">
        {/* History Group */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-white/10">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={btnClass(false)}
            title="Undo (Ctrl+Z)"
            aria-label="Undo"
          >
            <Undo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={btnClass(false)}
            title="Redo (Ctrl+Y)"
            aria-label="Redo"
          >
            <Redo className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-white/10">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={btnClass(editor.isActive("paragraph"))}
            title="Paragraph"
            aria-label="Paragraph"
          >
            <Pilcrow className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={btnClass(editor.isActive("heading", { level: 1 }))}
            title="Heading 1"
            aria-label="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={btnClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
            aria-label="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={btnClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
            aria-label="Heading 3"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Basic Text Formatting */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-white/10">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
            title="Bold (Ctrl+B)"
            aria-label="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
            title="Italic (Ctrl+I)"
            aria-label="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={btnClass(editor.isActive("underline"))}
            title="Underline (Ctrl+U)"
            aria-label="Underline"
          >
            <UnderlineIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={btnClass(editor.isActive("strike"))}
            title="Strikethrough"
            aria-label="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={btnClass(editor.isActive("code"))}
            title="Inline Code"
            aria-label="Inline Code"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={btnClass(editor.isActive("highlight"))}
            title="Highlight Text"
            aria-label="Highlight Text"
          >
            <Highlighter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            className={btnClass(editor.isActive("subscript"))}
            title="Subscript"
            aria-label="Subscript"
          >
            <SubscriptIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            className={btnClass(editor.isActive("superscript"))}
            title="Superscript"
            aria-label="Superscript"
          >
            <SuperscriptIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Alignment */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-white/10">
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={btnClass(editor.isActive({ textAlign: "left" }))}
            title="Align Left"
            aria-label="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={btnClass(editor.isActive({ textAlign: "center" }))}
            title="Align Center"
            aria-label="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={btnClass(editor.isActive({ textAlign: "right" }))}
            title="Align Right"
            aria-label="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={btnClass(editor.isActive({ textAlign: "justify" }))}
            title="Justify Text"
            aria-label="Justify Text"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Lists & Blocks */}
        <div className="flex items-center gap-1 pr-1.5 border-r border-white/10">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnClass(editor.isActive("bulletList"))}
            title="Bullet List"
            aria-label="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnClass(editor.isActive("orderedList"))}
            title="Ordered List"
            aria-label="Ordered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            className={btnClass(editor.isActive("taskList"))}
            title="Task List"
            aria-label="Task List"
          >
            <ListTodo className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnClass(editor.isActive("blockquote"))}
            title="Blockquote"
            aria-label="Blockquote"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={btnClass(editor.isActive("codeBlock"))}
            title="Code Block"
            aria-label="Code Block"
          >
            <SquareCode className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={btnClass(false)}
            title="Horizontal Rule"
            aria-label="Horizontal Rule"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Inserts: Link, Image, Table */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLinkModalOpen(true)}
            className={btnClass(editor.isActive("link"))}
            title="Insert/Edit Link"
            aria-label="Insert/Edit Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setImageModalOpen(true)}
            className={btnClass(false)}
            title="Insert Image"
            aria-label="Insert Image"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>

          {/* Table Action Controls */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTableMenuOpen(!tableMenuOpen)}
              className={btnClass(editor.isActive("table"))}
              title="Table Options"
              aria-label="Table Options"
            >
              <TableIcon className="w-3.5 h-3.5" />
            </button>

            {tableMenuOpen && (
              <div className="absolute top-full left-0 mt-2 z-30 w-44 rounded-xl border border-white/10 bg-zinc-950 p-1.5 shadow-2xl space-y-1 text-xs text-white">
                <button
                  type="button"
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                      .run();
                    setTableMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-violet-400" /> Insert 3x3 Table
                </button>
                {editor.isActive("table") && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().addRowAfter().run();
                        setTableMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left transition-all"
                    >
                      Add Row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().addColumnAfter().run();
                        setTableMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 text-left transition-all"
                    >
                      Add Column
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteRow().run();
                        setTableMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 text-left transition-all"
                    >
                      Delete Row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteColumn().run();
                        setTableMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 text-left transition-all"
                    >
                      Delete Column
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        editor.chain().focus().deleteTable().run();
                        setTableMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-400 text-left font-semibold transition-all border-t border-white/10 mt-1 pt-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Table
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Link Modal */}
      <LinkModal
        isOpen={linkModalOpen}
        initialUrl={editor.getAttributes("link").href || ""}
        onConfirm={handleLinkConfirm}
        onRemove={handleLinkRemove}
        onClose={() => setLinkModalOpen(false)}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={imageModalOpen}
        onConfirm={handleImageConfirm}
        onClose={() => setImageModalOpen(false)}
      />
    </>
  );
}
