import React from "react";
import "../App.css";
import styles from "./Playground.module.css";
import { Drawer } from "@material-ui/core";
import Goal from "../components/Goal/Goal";
import Chat from "../components/Chat/Chat";
import bg from "./bg.jpeg"
function Playground() {
  const [showGoals, setShowGoals] = React.useState(false);
  const [showChat, setShowChat] = React.useState("None");

  const toggleChat = () => {
    if (showChat === "None") {
      setShowChat("block")
    } else {
      setShowChat("None")
    }
  }
  return (
    <div className={styles.page}>
      <img src={bg} className={styles.background}/>
      <div
        className={styles.goalToggle}
        onClick={() => setShowGoals(!showGoals)}
      >
        Goals
      </div>
      <Drawer open={showGoals} onClose={() => setShowGoals(!showGoals)}><Goal /></Drawer>
      <div className={styles.chatToggle} onClick={toggleChat} style={{display: showChat==="None" ? "block" : "None"}}>Chat</div>
      <Chat open={showChat} setOpen={setShowChat}/>
    </div>
  );
}

export default Playground;
