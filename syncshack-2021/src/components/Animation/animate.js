import anime from 'animejs'

let goLeft = 0;
const getRandomPos = (minX, maxX, minY, maxY) => {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    return {x, y}

};
const initialise = () => {
    const dog = document.querySelector('.dog')
    const width = (window.innerWidth-600)/2;
    
    const jump = () => {
      anime({
        targets: ".dog",
        translateY: ["-=90", "+=90"],
        duration: 3000,
        easing: "easeOutQuad",
        loop: 1,
      });
    };

    const walk = () => {
        
        anime({
            targets: dog,
            translateX: x,
            translateY: y,
            duration: 2000,
            easing: "linear"
        })
    }
    setInterval(() => {
        walk()
    }, 10000);

    dog.addEventListener('click', jump)

    
}

export default initialise