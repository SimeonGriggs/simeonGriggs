import { documentEventHandler } from "@sanity/functions";
import process from "node:process";
const { BOT_TOKEN, CHAT_ID } = process.env;
const handler = documentEventHandler(async ({ event }) => {
  const { _id, content: comment } = event.data;
  if (!comment) {
    console.log("No comment in event data");
    return;
  } else if (!BOT_TOKEN || !CHAT_ID) {
    console.log("Environment variables not set");
    return;
  }
  try {
    const message = `New comment received: ${comment}`;
    const studioUrl = `https://studio.simeongriggs.dev/structure/comment;${_id}`;
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        reply_markup: {
          inline_keyboard: [[{ text: "📝 Open in Sanity Studio", url: studioUrl }]]
        }
      })
    });
    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.status} ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Message sent successfully:", result);
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    throw error;
  }
});
export {
  handler
};
//# sourceMappingURL=index.js.map
