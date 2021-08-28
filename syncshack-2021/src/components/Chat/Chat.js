import ArrowForwardIosRounded from "@material-ui/icons/ArrowForwardIosRounded";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/es/styles/index.less";
import "@chatui/core/dist/index.css";
import "../../chatui-theme.css";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    zIndex: 10,
  },
  btn: {
    position: "absolute",
    top: "5px",
    left: 0,
    zIndex: 20,
  },
}));

const initialMessages = [
  {
    type: "text",
    content: { text: "Start a conversation with your partner" },
    user: {
      avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
    },
  },
];

const replies = [
  {
    type: "text",
    content: { text: "Trying to Git it done" },
  },
  {
    type: "text",
    content: { text: "Really trying to Git it done" },
  },
];

let next = 0;

const ChatBox = ({ open, setOpen }) => {
  const classes = useStyles();
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
        appendMsg(replies[next++]);
      }, 1000);
    }
  };

  const renderMessageContent = (msg) => {
    const { type, content } = msg;

    if (type === "text" && content.text.trim()) {
      return <Bubble content={content.text} />;
    }
    return null;
  };

  if (!open) return null;

  return (
    <div className={classes.root}>
      <Chat
        locale="en-US"
        placeholder="Type here..."
        navbar={{ title: "Chat Box" }}
        messages={messages}
        renderMessageContent={renderMessageContent}
        onSend={handleSend}
      />
      <Button className={classes.btn} onClick={() => setOpen("None")}>
        <ArrowForwardIosRounded />
      </Button>
    </div>
  );
};

export default ChatBox;
