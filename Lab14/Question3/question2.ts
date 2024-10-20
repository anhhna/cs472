class Animal { 
    name: string;
    speed: number;

    constructor(name: string, speed: number) {
        this.speed = speed;
        this.name = name;
    }
    
    run(speed: number = 0): void { 
        this.speed += speed;
        console.log(`${this.name} runs with speed ${this.speed}.`);
    }

    static compareBySpeed(a1: Animal, a2: Animal): number {
        return a1.speed - a2.speed;
    }
}
    
// Inherit from Animal
class Rabbit extends Animal {
    hide(): void {
        console.log(`${this.name} hides!`);
    }
}

let rabbits=[
    new Rabbit("White Rabbit", 10),
    new Rabbit("Black Rabbit", 5)
];

rabbits.sort(Rabbit.compareBySpeed);
rabbits[0].run(); // White Rabbit runs with speed 10