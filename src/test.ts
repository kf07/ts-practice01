

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
//
// interface Box<T> {
//   value: T
// }

interface Box<T extends string | number> {
  value: T
}

// const box0: Box = { value: 'test'};
// const box1: Box<string> = { value: 'test' }
// const box2: Box<number> = { value: 1}

// function boxed<T>(props: T) {
//   return { value: props }
// }

// const boxed= <T extends string>(props: T) => {
//   return {value: props}
// }
//
// const box2 = boxed(false as boolean | null)
// const box3 = boxed<string | null>(null)
// const boxed = <T>(props: T) => ({value: props})

interface Props {
  amount: number
}
function boxed<T extends Props>(props: T) {
  return { value: props.amount.toFixed(1) }
}

const box1 = boxed({ amount: 0 })

interface User {
  id: number
  firstName: string
}

// function merge(array: User[], newValue: User): User[] {
//   const index = array.findIndex(item => item.id === newValue.id);
//   if (index === -1) {
//     return [
//       ...array,
//       newValue,
//     ];
//   } else {
//     return [
//       ...array.slice(0, index),
//       newValue,
//       ...array.slice(index + 1),
//     ];
//   }
// }

function merge<T extends {id: number}>(array: T[], newValue: T): T[] {
  const index = array.findIndex(item => item.id === newValue.id);
  if (index === -1) {
    return [
      ...array,
      newValue,
    ];
  } else {
    return [
      ...array.slice(0, index),
      newValue,
      ...array.slice(index + 1),
    ];
  }
}

const array = [
  { id: 1, firstName: 'Taro' },
  { id: 2, firstName: 'Hanako' },
];

console.log(merge(array, { id: 3, firstName: 'Mitsuru' }));

const companyArray = [
  { id: 1, name: 'TOYOTA' },
  { id: 2, name: 'SONY' },
];


console.log(merge(companyArray, { id: 1, name: 'NISSAN' }));
console.log(merge(companyArray, { id: 3, name: 'NTT' }));


const sho = <T>(value: T) => {
  return value
}

console.log(sho<number>(3))
console.log(sho<string>('test'))

// class MyData<T> {
//   constructor(public value: T) {}
//   getArray(): T[] {
//     return [this.value, this.value, this.value]
//   }
// }
//
// let v1 = new MyData<string>('hello');
// console.log(v1.getArray()); //[ 'hello', 'hello', 'hello' ]
// let v2 = new MyData<number>(123);
// console.log(v2.getArray());

interface Result {
  a: number
  b: number
}

class MyData<T extends Result> {
  constructor(public value: T) {}
  getArray(): T[] {
    return [this.value, this.value, this.value]
  }
}

let result = {
  a: 2,
  b: 5
};

let v1 = new MyData<Result>(result);
console.log(v1.getArray())

function pick<T, K extends keyof T>(props: T, key: K) {
  return props[key]
}

const obj = {
  name: 'Taro',
  amount: 0,
  flag: false
}

const value1 = pick(obj,'name')
const value2 = pick(obj, 'amount')
console.log(value1)
console.log(value2)

interface PersonProps {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
}

class Person<T extends PersonProps> {
  name: T['name']
  age: T['age']
  gender: T['gender']
  constructor (props: T) {
    this.name = props.name
    this.age = props.age
    this.gender = props.gender
  }
}

const person = new Person({
  name: 'Taro',
  age: 28,
  gender: 'male'
})

console.log(person);