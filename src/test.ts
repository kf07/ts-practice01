

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


interface Props {
  amount: number
}

function boxed<T extends Props>(props: T) {
  return { value: props.amount.toFixed(2) }
}

const box1 = boxed({amount: 0}) //0.00
const box2 = boxed({amount: 1.3333}) //1.33
const box3 = boxed({value: 0}) //Props型を満たしていない
const box4 = boxed({ amount: 'test' }) //amountがnumber型じゃない

