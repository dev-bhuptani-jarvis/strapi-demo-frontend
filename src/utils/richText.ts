import { RichTextBlock } from "../types/page.types";

export function richTextToPlainText(
    blocks: RichTextBlock[]
): string {
    return blocks
        ?.map((block) =>
            block.children
                ?.map((child) => child.text)
                .join("")
        )
        .join("\n");
}