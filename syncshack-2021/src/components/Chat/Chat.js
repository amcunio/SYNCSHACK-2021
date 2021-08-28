import CancelIcon from "@material-ui/icons/Cancel";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/es/styles/index.less";
import "@chatui/core/dist/index.css";

const initialMessages = [
  {
    type: "text",
    content: { text: "Start a conversation with your partner" },
    user: {
      avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
    },
  },
];

const ChatBox = ({ open, setOpen }) => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  const handleSend = (_, text) => {
    if (text.trim()) {
      // simulating sending
      appendMsg({
        type: "text",
        content: { text: text },
        position: "right",
      });

      setTyping(true);

      // simulating replying
      setTimeout(() => {
        appendMsg({
          type: "text",
          content: { text: "Trying to Git it done" },
        });
      }, 1000);
    }
  };

  const renderMessageContent = (msg) => {
    const { type, content } = msg;

    if (type === 'text' && content.text.trim()) {
      return <Bubble content={content.text} />;
    }
    return null;
  };

  if (!open) return null;

  return (
    <Chat
      locale="en-US"
      placeholder="Type here..."
      navbar={{ title: "Chat Box" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      onSend={handleSend}
    />
  );
};

export default ChatBox;
