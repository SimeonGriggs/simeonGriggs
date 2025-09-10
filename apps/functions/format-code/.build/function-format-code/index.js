import { documentEventHandler } from "@sanity/functions";
import { createClient } from "@sanity/client";
import prettier from "prettier";
const handler = documentEventHandler(async ({ context, event }) => {
  console.log("Begin formatting code function...");
  const client = createClient({
    ...context.clientOptions,
    useCdn: false,
    apiVersion: "2025-08-21"
  });
  if (!event.data.content) {
    console.log("No content");
    return;
  }
  const codeBlocks = event.data.content.filter(
    (block) => block._type === "code"
  );
  if (!codeBlocks.length) {
    console.log("No code blocks");
    return;
  }
  try {
    const formattedCodeBlocks = await Promise.all(
      codeBlocks.map(async (block) => {
        if (block._type !== "code" || !block.code) {
          return block;
        }
        try {
          const parser = getParserForLanguage(block.language);
          const formattedCode = await prettier.format(block.code, {
            parser,
            semi: false,
            singleQuote: true,
            trailingComma: "es5",
            printWidth: 60,
            tabWidth: 2,
            useTabs: false
          });
          return {
            ...block,
            code: formattedCode
          };
        } catch (formatError) {
          console.warn(
            `Failed to format code block ${block._key}:`,
            formatError
          );
          return block;
        }
      })
    );
    const changedCodeBlocks = formattedCodeBlocks.filter((formattedBlock) => {
      const originalBlock = event.data.content.find(
        (block) => block._key === formattedBlock._key
      );
      return originalBlock && originalBlock._type === "code" && formattedBlock.code !== originalBlock.code;
    });
    if (!changedCodeBlocks.length) {
      console.log("No changed code blocks");
      return;
    }
    const transaction = client.transaction();
    for (const block of changedCodeBlocks) {
      const patch = client.patch(event.data._id).set({
        [`content[_key=="${block._key}"].code`]: block.code
      });
      transaction.patch(patch);
    }
    await transaction.commit();
    console.log(
      `Formatted ${changedCodeBlocks.length === 1 ? "1 code block" : `${changedCodeBlocks.length} code blocks`}`
    );
  } catch (error) {
    console.error("Error formatting code blocks:", error);
    throw error;
  }
});
function getParserForLanguage(language) {
  if (!language) return "babel";
  const languageMap = {
    tsx: "typescript",
    ts: "typescript",
    jsx: "babel",
    js: "babel",
    json: "json",
    css: "css",
    scss: "scss",
    less: "less",
    html: "html",
    vue: "vue",
    yaml: "yaml",
    markdown: "markdown",
    md: "markdown"
  };
  return languageMap[language] || "babel";
}
export {
  handler
};
//# sourceMappingURL=index.js.map
