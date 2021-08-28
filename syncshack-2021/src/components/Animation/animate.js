import anime from 'animejs'
const getRandomPos = (minX, maxX, minY, maxY) => {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    console.log(x, y)
    return {x, y}

};

const initialise = () => {
    const dog = document.querySelector('.dog')
    const width = (window.innerWidth-600)/2;
    const height = window.innerHeight/2;
    console.log(width, height)
    
    const jump = () => {
      anime({
        targets: ".dog",
        translateY: ["-90", "0", "-50", "0", "-20", "0"],
        duration: 3000,
        easing: "easeOutQuad",
        loop: 1,
      });
    };

    const walk = () => {
        const { x, y } = getRandomPos(-width, width, -70, 70)
        anime({
            targets: ".dog",
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