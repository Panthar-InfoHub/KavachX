import Image from "@tiptap/extension-image";

export type ImageLayout = "left" | "right" | "center" | "full";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      layout: {
        default: "full",
        parseHTML: (element) => element.getAttribute("data-layout") || "full",
        renderHTML: (attributes) => {
          if (!attributes.layout) return {};
          return {
            "data-layout": attributes.layout,
          };
        },
      },
    };
  },
});
