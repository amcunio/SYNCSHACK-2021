import React from "react";
import "../App.css";
import styles from "./Playground.module.css";
import GoalBox from "../components/Goal/Goal";
import ChatBox from "../components/Chat/Chat";
import anime from "animejs";
import { faComments, faTasks, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import initialise from '../components/Animation/animate'

const standingL = "/static/dogStandingL.gif"
const standingR = "/static/dogStandingR.gif"
const runningL = "/static/dogRunningL.gif"
const runningR = "/static/dogRunningR.gif"
var prevPos = 400

function Playground() {
  const [showChatText, setShowChatText] = React.useState(false);
  const [showGoalsText, setShowGoalsText] = React.useState(false);
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
      translateY: ["0", "-90", "0"],
      duration: 1000,
      easing: "linear",
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
      changeBegin: () => {setIsWalk(true);},
      changeComplete: () => {setIsWalk(false);}
    });
  }

  React.useEffect(() => {
    setInterval(() => {
      walk()
    }, 5000);
  }, [])
  
  return (
    <div className={styles.page}>
      <div className={styles.buttons}>
        <div className={styles.button}
          onMouseEnter={() => setShowGoalsText(true)}
          onMouseLeave={() => setShowGoalsText(false)} onClick={() => setShowGoals(!showGoals)}
        >
            <FontAwesomeIcon icon={faTasks} />
            {showGoalsText && <div className={styles.buttonText}>Goals</div>}
        </div>
        <div className={`${styles.buttonStore} ${styles.button}`}
          onMouseEnter={() => setShowStoreText(true)}
          onMouseLeave={() => setShowStoreText(false)}
        >
          <FontAwesomeIcon
            icon={faStore}
          />
          <div className={styles.buttonText}>Store</div>
        </div>
        <div className={styles.button}
          onMouseEnter={() => setShowChatText(true)}
          onMouseLeave={() => setShowChatText(false)}
          onClick={toggleChat} style={{display: showChat==="None" ? "block" : "None"}}>
          <FontAwesomeIcon icon={faComments} />
          {showChatText && <div className={styles.buttonText}>Chat</div>}
        </div>
      </div>
      <GoalBox show={showGoals} setShow={setShowGoals} /> 
      <ChatBox open={showChat !== 'None'} setOpen={setShowChat} />
      <img src={isRight ? (isWalk ? runningR : standingR) : (isWalk ? runningL : standingL)} className={`${styles.dog} dog`}  onClick={handleJump} alt="pet"/>
    </div>
  );
}

export default Playground;
