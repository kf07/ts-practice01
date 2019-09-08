

// interface Person {
//   name: string;
//   age: number;
//   hobby: string;
// }
//
// type PersonKey = keyof Person;
//
// const Boy: Person= {
//   name: '太郎',
//   age: 12,
//   hobby: 'baseball'
// };
//
// const getPerson = (obj: Person, key: PersonKey) => obj[key]
//
// const x = getPerson(Boy, 'name');
//
// console.log(x);

let someValue: any = "this is a string";
let strLength: number =(<string>someValue).length;

class Creature {
  numberOfHands: number
  numberOfFeet: number
  constructor(numberOfHands: number, numberOfFeet: number) {
    this.numberOfHands = numberOfHands
    this.numberOfFeet = numberOfFeet
  }
}

class Dog extends Creature {
  bark: string
  constructor(bark: string) {
    super(0,4)
    this.bark = bark
  }
  barking() {
    return `${this.bark}! ${this.bark}!`
  }
  shakeTail() {
    console.log(this.barking)
  }
}

const dog = new Dog('bow-bow')
console.log(dog)

const creature = new Creature(0,4)

console.log(creature.numberOfHands)


function boxed<T>(props: T) {
  return { value: props}
}

const box2 = boxed(false as boolean | null);


