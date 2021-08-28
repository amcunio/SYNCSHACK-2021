import React from "react";
import "../App.css";
import styles from "./Playground.module.css";
import GoalBox from "../components/Goal/Goal";
import ChatBox from "../components/Chat/Chat";
import anime from "animejs";
import { motion } from "framer-motion";
import { display } from "@material-ui/system";
import { faComments, faTasks, faStore } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import initialise from '../components/Animation/animate'

const standingL = "/static/dogStandingL.gif";
const standingR = "/static/dogStandingR.gif";
const runningL = "/static/dogRunningL.gif";
const runningR = "/static/dogRunningR.gif";
var prevPos = 400;

function Playground() {
  const [showChatText, setShowChatText] = React.useState(false);
  const [showGoalsText, setShowGoalsText] = React.useState(false);
  const [showGoals, setShowGoals] = React.useState(false);
  const [showChat, setShowChat] = React.useState("None");
  const [isWalk, setIsWalk] = React.useState(false);
  const [isRight, setIsRight] = React.useState(false);
  const [bubble, setBubble] = React.useState({ display: "None" });
  const [text, setText] = React.useState({ display: "None" });
  const [textContent, setTextContent] = React.useState(false)
  const dog = React.useRef();

  const toggleChat = () => {
    if (showChat === "None") {
      setShowChat("block");
    } else {
      setShowChat("None");
    }
  };

  const getRandomPos = (minX, maxX, minY, maxY) => {
    var x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;

    if (prevPos === 400) {
      x = -100;
    }
    if (prevPos < x) {
      setIsRight(true);
    } else {
      setIsRight(false);
    }
    prevPos = x;
    console.log(x);
    return { x, y };
  };

  const handleJump = () => {
    anime({
      targets: ".dog",
      translateY: ["-90", "0", "-50", "0", "-20", "0"],
      duration: 3000,
      easing: "easeOutQuad",
      loop: 1,
      complete: () => {
        const top = dog.current.offsetTop - 200;
        const left = dog.current.offsetLeft + 20;
        setBubble({ ...bubble, display: "block", top: top, left: left });
        setText({
          ...text,
          display: "block",
          top: top + 47,
          left: left + 55,
        });

        setTimeout(() => {
          setBubble({ ...bubble, display: "None" });
          setText({ ...text, display: "None" });
        }, 3000);
      },
    });
    
  };

  const walk = () => {
    const { x, y } = getRandomPos(-200, 200, -40, 40);

    anime({
      targets: ".dog",
      translateX: x,
      translateY: y,
      duration: 2000,
      easing: "linear",
      complete: () => {
        setIsWalk(false);
      },
    });
    anime({
      targets: ".bubble",
      translateX: x,
      translateY: y,
      duration: 2000,
      easing: "linear",
      complete: () => {
        setIsWalk(false);
      },
      changeBegin: () => {setIsWalk(true);},
      changeComplete: () => {setIsWalk(false);}
    });
    anime({
      targets: ".text",
      translateX: x,
      translateY: y,
      duration: 2000,
      easing: "linear",
      complete: () => {
        setIsWalk(false);
      },
    });
  };

  React.useEffect(() => {
    setBubble({ ...bubble, display: "block", top: 250, left: 500 });
    setText({ ...text, display: "block", top: 297, left: 500 + 63 });


    setTimeout(() => {
      setBubble({ ...bubble, display: "None" });
      setText({ ...text, display: "None" });
      setTextContent(true);
    }, 3000);

    setInterval(() => {
      walk();
    }, 5000);

    const dog = document.getElementsByClassName("dog")[0];
    const topPos = dog.getBoundingClientRect().top + window.scrollY;
    console.log(topPos);
  }, []);

  return (
    <div className={styles.page}>
      <img
        src="/static/background.png"
        className={styles.background}
        alt="background"
      />

      <img
        src={
          isRight
            ? isWalk
              ? runningR
              : standingR
            : isWalk
            ? runningL
            : standingL
        }
        className={`${styles.dog} dog`}
        onClick={handleJump}
        alt="pet"
        ref={dog}
      />
      <img
        src="/static/bubble.png"
        alt="speech bubble"
        className={`${styles.dogBubble} bubble`}
        style={bubble}
      />
      <div className={`${styles.dogText} text`} style={text}>
        {textContent ? (
          <div>
            woof
            <br />
            woof!
          </div>
        ) : (
          <div>
            hello
            <br /> Ian
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}
          onMouseEnter={() => setShowGoalsText(true)}
          onMouseLeave={() => setShowGoalsText(false)} onClick={() => setShowGoals(!showGoals)}
        >
            <FontAwesomeIcon icon={faTasks} />
            {showGoalsText && <div className={styles.buttonText}>Goals</div>}
        </div>
        <div className={`${styles.buttonStore} ${styles.button}`}>
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
      {/* <img src={isRight ? (isWalk ? runningR : standingR) : (isWalk ? runningL : standingL)} className={`${styles.dog} dog`}  onClick={handleJump} alt="pet"/>
      <img src="/static/background.png" className={styles.background} alt="background"/> */}
    </div>
  );
}

export default Playground;
