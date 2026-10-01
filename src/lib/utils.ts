import { createCn } from "cn/config"

// Custom type and shadow tokens must be registered, otherwise `text-label`
// is treated as a text color and dropped next to `text-muted-foreground`.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "title",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "label",
            "caption",
          ],
        },
      ],
      shadow: [{ shadow: ["card", "elevated", "modal"] }],
    },
  },
})
