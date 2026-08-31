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
      <div className={`prose prose-slate max-w-none text-gray-800 ${className}`}>
        <p className="whitespace-pre-wrap leading-relaxed font-jakarta text-gray-800 text-[17px] leading-8">{content}</p>
      </div>
    );
  }

  const renderMarks = (text: string, marks?: TiptapNode["marks"]) => {
    if (!marks || marks.length === 0) return text;

    return marks.reduce((acc: React.ReactNode, mark) => {
      switch (mark.type) {
        case "bold":
          return <strong className="font-bold text-black font-jakarta">{acc}</strong>;
        case "italic":
          return <em className="italic text-slate-900 font-instrument font-normal text-[105%]">{acc}</em>;
        case "underline":
          return <u className="underline underline-offset-4 decoration-black/40">{acc}</u>;
        case "strike":
          return <s className="line-through text-gray-400">{acc}</s>;
        case "code":
          return (
            <code className="px-2 py-0.5 rounded-md bg-gray-100 border border-black/5 text-black font-mono text-xs font-semibold">
              {acc}
            </code>
          );
        case "highlight":
          return (
            <mark className="bg-amber-100 text-amber-950 px-2 py-0.5 rounded border border-amber-200 font-medium">
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
              className="text-black underline underline-offset-4 hover:text-slate-700 transition-colors font-semibold"
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
          <p key={index} className={`text-gray-800 text-[17px] leading-8 font-jakarta font-normal my-6 ${alignClass}`}>
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
            <h1 key={index} className={`text-3xl sm:text-4xl font-bold text-black font-syne mt-10 mb-4 tracking-tight leading-tight ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h1>
          );
        } else if (level === 2) {
          return (
            <h2 key={index} className={`text-2xl sm:text-3xl font-bold text-black font-syne mt-8 mb-4 tracking-tight leading-tight ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h2>
          );
        } else {
          return (
            <h3 key={index} className={`text-xl sm:text-2xl font-bold text-black font-syne mt-6 mb-3 tracking-tight leading-tight ${alignClass}`}>
              {node.content?.map(renderNode)}
            </h3>
          );
        }
      }

      case "bulletList":
        return (
          <ul key={index} className="list-disc pl-6 space-y-2.5 text-gray-800 my-6 font-jakarta text-[17px] leading-8">
            {node.content?.map(renderNode)}
          </ul>
        );

      case "orderedList":
        return (
          <ol key={index} className="list-decimal pl-6 space-y-2.5 text-gray-800 my-6 font-jakarta text-[17px] leading-8">
            {node.content?.map(renderNode)}
          </ol>
        );

      case "listItem":
        return <li key={index} className="leading-relaxed">{node.content?.map(renderNode)}</li>;

      case "taskList":
        return (
          <ul key={index} className="space-y-2.5 my-6 list-none pl-1 font-jakarta text-[17px] leading-8">
            {node.content?.map(renderNode)}
          </ul>
        );

      case "taskItem": {
        const checked = node.attrs?.checked || false;
        return (
          <li key={index} className="flex items-start gap-2.5 text-gray-800 my-1 font-jakarta">
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mt-1.5 accent-black rounded border-slate-300 cursor-default"
            />
            <div className={checked ? "line-through text-gray-400" : ""}>
              {node.content?.map(renderNode)}
            </div>
          </li>
        );
      }

      case "blockquote":
        return (
          <blockquote
            key={index}
            className="border-l-4 border-black pl-6 py-5 my-8 text-black bg-[#f4f4f4] rounded-r-3xl border-y border-r border-black/5 font-instrument text-xl sm:text-2xl italic leading-relaxed"
          >
            {node.content?.map(renderNode)}
          </blockquote>
        );

      case "codeBlock":
        return (
          <pre
            key={index}
            className="bg-[#111] border border-white/10 p-6 rounded-2xl font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto my-8 leading-relaxed shadow-xl"
          >
            <code>{node.content?.map(renderNode)}</code>
          </pre>
        );

      case "horizontalRule":
        return <hr key={index} className="border-gray-200 my-10" />;

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

        let layoutClasses = "w-full my-8 rounded-3xl border border-black/5 shadow-md overflow-hidden bg-gray-50";

        if (layout === "left") {
          // Desktop: Float left with text wrapping. Mobile: Full width stack.
          layoutClasses =
            "md:float-left md:mr-6 md:mb-4 md:max-w-[45%] w-full my-4 rounded-3xl border border-black/5 shadow-md overflow-hidden bg-gray-50";
        } else if (layout === "right") {
          // Desktop: Float right with text wrapping. Mobile: Full width stack.
          layoutClasses =
            "md:float-right md:ml-6 md:mb-4 md:max-w-[45%] w-full my-4 rounded-3xl border border-black/5 shadow-md overflow-hidden bg-gray-50";
        } else if (layout === "center") {
          // Centered block
          layoutClasses =
            "mx-auto block max-w-2xl my-8 rounded-3xl border border-black/5 shadow-md overflow-hidden bg-gray-50";
        } else {
          // Full width block
          layoutClasses =
            "w-full my-8 rounded-3xl border border-black/5 shadow-md overflow-hidden bg-gray-50";
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
              <figcaption className="p-3 text-center text-xs text-gray-500 italic bg-gray-50 border-t border-black/5 font-jakarta">
                {alt}
              </figcaption>
            )}
          </figure>
        );
      }

      case "table":
        return (
          <div key={index} className="overflow-x-auto my-8 clear-both rounded-2xl border border-black/5 shadow-xs">
            <table className="w-full border-collapse text-xs sm:text-sm font-jakarta">
              <tbody>{node.content?.map(renderNode)}</tbody>
            </table>
          </div>
        );

      case "tableRow":
        return <tr key={index}>{node.content?.map(renderNode)}</tr>;

      case "tableHeader":
        return (
          <th key={index} className="border border-black/5 bg-gray-100 p-3.5 font-bold text-left text-black font-syne">
            {node.content?.map(renderNode)}
          </th>
        );

      case "tableCell":
        return (
          <td key={index} className="border border-black/5 p-3.5 text-gray-800 bg-white">
            {node.content?.map(renderNode)}
          </td>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`space-y-3 font-jakarta ${className}`}>
      {doc.content.map(renderNode)}
      <div className="clear-both" />
    </div>
  );
}
