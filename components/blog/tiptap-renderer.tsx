import React from "react";

interface TiptapNode {
  type: string;
  text?: string;
  attrs?: Record<string, any>;
  marks?: Array<{ type: string; attrs?: Record<string, any> }>;
  content?: TiptapNode[];
}

interface TiptapRendererProps {
  content: string;
  className?: string;
}

export function TiptapRenderer({ content, className = "" }: TiptapRendererProps) {
  if (!content) return null;

  let doc: TiptapNode | null = null;

  try {
    if (content.trim().startsWith("{")) {
      doc = JSON.parse(content);
    }
  } catch {
    doc = null;
  }

  // Fallback for raw text/HTML if content is not JSON AST
  if (!doc || doc.type !== "doc" || !Array.isArray(doc.content)) {
    return (
      <div className={`prose prose-invert max-w-none text-white/90 ${className}`}>
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    );
  }

  const renderMarks = (text: string, marks?: TiptapNode["marks"]) => {
    if (!marks || marks.length === 0) return text;

    return marks.reduce((acc: React.ReactNode, mark) => {
      switch (mark.type) {
        case "bold":
          return <strong className="font-bold text-white">{acc}</strong>;
        case "italic":
          return <em className="italic">{acc}</em>;
        case "underline":
          return <u className="underline underline-offset-4">{acc}</u>;
        case "strike":
          return <s className="line-through text-white/50">{acc}</s>;
        case "code":
          return (
            <code className="px-1.5 py-0.5 rounded bg-white/10 text-violet-300 font-mono text-xs">
              {acc}
            </code>
          );
        case "highlight":
          return (
            <mark className="bg-amber-400/30 text-amber-200 px-1 py-0.5 rounded">
              {acc}
            </mark>
          );
        case "subscript":
          return <sub>{acc}</sub>;
        case "superscript":
          return <sup>{acc}</sup>;
        case "link":
          const href = mark.attrs?.href || "#";
          // Security check: disallow javascript: and vbscript: protocols
          const safeHref =
            href.toLowerCase().startsWith("javascript:") ||
            href.toLowerCase().startsWith("vbscript:")
              ? "#"
              : href;

          return (
            <a
              href={safeHref}
              target={safeHref.startsWith("http") ? "_blank" : undefined}
              rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-violet-400 underline underline-offset-4 hover:text-violet-300 transition-colors font-medium"
            >
              {acc}
            </a>
          );
        default:
          return acc;
      }
    }, text);
  };

  const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
    switch (node.type) {
      case "text":
        return <React.Fragment key={index}>{renderMarks(node.text || "", node.marks)}</React.Fragment>;

      case "paragraph": {
        const align = node.attrs?.textAlign;
        const alignClass = align ? `text-${align}` : "";
        return (
          <p key={index} className={`leading-relaxed text-white/80 my-4 text-base ${alignClass}`}>
            {node.content?.map(renderNode)}
          </p>
        );
      }

      case "heading": {
        const level = node.attrs?.level || 1;
        const align = node.attrs?.textAlign;
        const alignClass = align ? `text-${align}` : "";

        if (level === 1) {
          return (
            <h1 key={index} className={`text-2xl sm:text-3xl font-bold text-white font-syne mt-8 mb-4 ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h1>
          );
        } else if (level === 2) {
          return (
            <h2 key={index} className={`text-xl sm:text-2xl font-bold text-white font-syne mt-7 mb-3 ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h2>
          );
        } else {
          return (
            <h3 key={index} className={`text-lg sm:text-xl font-bold text-white font-syne mt-6 mb-2 ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h3>
          );
        }
      }

      case "bulletList":
        return (
          <ul key={index} className="list-disc pl-6 space-y-2 text-white/80 my-4">
            {node.content?.map(renderNode)}
          </ul>
        );

      case "orderedList":
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2 text-white/80 my-4">
            {node.content?.map(renderNode)}
          </ol>
        );

      case "listItem":
        return <li key={index}>{node.content?.map(renderNode)}</li>;

      case "taskList":
        return (
          <ul key={index} className="space-y-2 my-4 list-none pl-1">
            {node.content?.map(renderNode)}
          </ul>
        );

      case "taskItem": {
        const checked = node.attrs?.checked || false;
        return (
          <li key={index} className="flex items-start gap-2.5 text-white/90 my-1">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1 accent-violet-600 rounded cursor-default"
            />
            <div className={checked ? "line-through text-white/50" : ""}>
              {node.content?.map(renderNode)}
            </div>
          </li>
        );
      }

      case "blockquote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-violet-500/60 pl-4 py-2 my-6 italic text-white/70 bg-violet-600/5 rounded-r-2xl"
          >
            {node.content?.map(renderNode)}
          </blockquote>
        );

      case "codeBlock":
        return (
          <pre
            key={index}
            className="bg-black/80 border border-white/10 p-4 rounded-xl font-mono text-xs text-emerald-400 overflow-x-auto my-6 leading-relaxed"
          >
            <code>{node.content?.map(renderNode)}</code>
          </pre>
        );

      case "horizontalRule":
        return <hr key={index} className="border-white/10 my-8" />;

      case "image": {
        const src = node.attrs?.src || "";
        const alt = node.attrs?.alt || "Blog image";
        const layout = node.attrs?.layout || "full";

        // Security check: disallow javascript: and vbscript: protocols
        if (
          src.toLowerCase().startsWith("javascript:") ||
          src.toLowerCase().startsWith("vbscript:")
        ) {
          return null;
        }

        let layoutClasses = "w-full my-6 rounded-2xl border border-white/10 shadow-2xl";

        if (layout === "left") {
          // Desktop: Float left with text wrapping. Mobile: Full width stack.
          layoutClasses =
            "md:float-left md:mr-6 md:mb-4 md:max-w-[45%] w-full my-4 rounded-2xl border border-white/10 shadow-2xl overflow-hidden";
        } else if (layout === "right") {
          // Desktop: Float right with text wrapping. Mobile: Full width stack.
          layoutClasses =
            "md:float-right md:ml-6 md:mb-4 md:max-w-[45%] w-full my-4 rounded-2xl border border-white/10 shadow-2xl overflow-hidden";
        } else if (layout === "center") {
          // Centered block
          layoutClasses =
            "mx-auto block max-w-2xl my-6 rounded-2xl border border-white/10 shadow-2xl overflow-hidden";
        } else {
          // Full width block
          layoutClasses =
            "w-full my-6 rounded-2xl border border-white/10 shadow-2xl overflow-hidden";
        }

        return (
          <figure key={index} className={layoutClasses}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="w-full h-auto object-cover"
            />
            {alt && (
              <figcaption className="p-2 text-center text-xs text-white/50 italic bg-black/60 border-t border-white/5">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }

      case "table":
        return (
          <div key={index} className="overflow-x-auto my-6 clear-both">
            <table className="w-full border-collapse border border-white/20 text-xs">
              <tbody>{node.content?.map(renderNode)}</tbody>
            </table>
          </div>
        );

      case "tableRow":
        return <tr key={index}>{node.content?.map(renderNode)}</tr>;

      case "tableHeader":
        return (
          <th key={index} className="border border-white/20 bg-white/10 p-3 font-bold text-left text-white">
            {node.content?.map(renderNode)}
          </th>
        );

      case "tableCell":
        return (
          <td key={index} className="border border-white/20 p-3 text-white/80">
            {node.content?.map(renderNode)}
          </td>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {doc.content.map(renderNode)}
      <div className="clear-both" />
    </div>
  );
}
