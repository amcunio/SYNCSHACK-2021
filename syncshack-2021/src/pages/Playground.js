import React from "react";
import "../App.css";
import styles from "./Playground.module.css";
import GoalBox from "../components/Goal/Goal";
import ChatBox from "../components/Chat/Chat";
import anime from "animejs";
// import initialise from '../components/Animation/animate'

const standingL = "/static/dogStandingL.gif"
const standingR = "/static/dogStandingR.gif"
const runningL = "/static/dogRunningL.gif"
const runningR = "/static/dogRunningR.gif"
var prevPos = 400

function Playground() {
  const [showGoals, setShowGoals] = React.useState(false);
  const [showChat, setShowChat] = React.useState("None");
  const [isWalk, setIsWalk] = React.useState(false);
  const [isRight, setIsRight] = React.useState(false)

  const toggleChat = () => {
    if (showChat === "None") {
      setShowChat("block")
    } else {
      setShowChat("None")
    }
  }

  const getRandomPos = (minX, maxX, minY, maxY) => {
    var x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    if (prevPos === 400) {
      x = -100
    }
    if (prevPos < x) {
      setIsRight(true)
    } else {
      setIsRight(false)
    }
    prevPos = x
    console.log(x)
    return { x, y };
  };

  const handleJump = () => {
    anime({
      targets: ".dog",
      translateY: ["-90", "0", "-50", "0", "-20", "0"],
      duration: 3000,
      easing: "easeOutQuad",
      loop: 1,
    });
  }

  const walk = () => {
    const { x, y } = getRandomPos(-200, 200, -70, 70);
    
    anime({
      targets: ".dog",
      translateX: x,
      translateY: y,
      duration: 2000,
      easing: "linear",
      complete: () => {setIsWalk(false);}
    });
  }

  React.useEffect(() => {
    setInterval(() => {
      walk()
      setIsWalk(true)
    }, 5000);
  }, [])
  
  return (
    <div className={styles.page}>
      <img src="/static/background.png" className={styles.background} alt="background"/>
      <div
        className={styles.goalToggle}
        onClick={() => setShowGoals(!showGoals)}
      >
        Goals
      </div>
      <GoalBox show={showGoals} setShow={setShowGoals} /> 
      <div className={styles.chatToggle} onClick={toggleChat} style={{display: showChat==="None" ? "block" : "None"}}>Chat</div>
      <ChatBox open={showChat !== 'None'} setOpen={setShowChat} />
      <img src={isRight ? (isWalk ? runningR : standingR) : (isWalk ? runningL : standingL)} className={`${styles.dog} dog`}  onClick={handleJump} alt="pet"/>
    </div>
  );
}

export default Playground;
