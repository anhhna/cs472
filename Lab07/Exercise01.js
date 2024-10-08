class Meditation {
    start() {
        let count = 5
        let timerId = setInterval(() => {
            console.log(count--);
            if (count === 0) {
                clearInterval(timerId)
                console.log('Jay Guru Dev')
            }
        }, 100)
    }
}

const morning_meditation = new Meditation(5); 
morning_meditation.start();
console.log(`Start meditation`); 
