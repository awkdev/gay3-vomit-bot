import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import prompts, { PromptType } from "prompts";
import UpdateNewChannelMessage = Api.UpdateNewChannelMessage;
import PeerChannel = Api.PeerChannel;

const apiId: number | undefined = process.env.API_ID ? parseInt(process.env.API_ID, 10) : undefined
const apiHash: string | undefined = process.env.API_HASH ?? undefined;
const stringSession = new StringSession(""); // fill this later with the value from session.save()

interface Question {
  type: PromptType;
  name: string;
  message: string;
}

const questions: Question[] = [
  {
    type: "text",
    name: "number",
    message: "What is your registered number with Telegram?",
  },
  {
    type: "password",
    name: "password",
    message: "Enter your Telegram password...",
  },
  {
    type: "text",
    name: "code",
    message: "Enter the code you received on Telegram/SMS",
  },
];

const questionFactory = (q: Question) => {
  return async () => {
    const response = await prompts(q);
    return response[q.name];
  }
}


(async () => {
  if (!apiHash || !apiId) {
    console.error("Export API_ID & API_HASH as environment variables before starting");
    process.exit(1);
  }
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: questionFactory(questions[0]),
    password: questionFactory(questions[1]),
    phoneCode: questionFactory(questions[2]),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again
  await client.sendMessage("me", { message: "Connected!" });

  const handleMessage = async (e: UpdateNewChannelMessage) => {
    try {
      if (e.className !== "UpdateNewChannelMessage")
        return;

      const channelId = (e.message.peerId as PeerChannel).channelId.toString();
      if (!["1652363718", "1775666438"].includes(channelId))
        return

      await client.invoke(
        new Api.messages.SendReaction({
          msgId: e.message.id,
          peer: channelId,
          reaction: "🤮"
        })
      );
      const date = new Date();
      console.info(`[REACTED] Channel ID: ${channelId} | Timestamp: ${date.toISOString()}`)
    } catch(error) {
      console.error("[ERROR] ", error);
    }
  }
  client.addEventHandler(handleMessage)
})();
