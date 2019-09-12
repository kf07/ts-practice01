

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

// interface PersonProps {
//   name: string
//   age: number
//   gender: 'male' | 'female' | 'other'
// }

// class Person<T extends PersonProps> {
//   name: T['name']
//   age: T['age']
//   gender: T['gender']
//   constructor (props: T) {
//     this.name = props.name
//     this.age = props.age
//     this.gender = props.gender
//   }
// }

// const person = new Person({
//   name: 'Taro',
//   age: 28,
//   gender: 'male'
// })

// console.log(person);

const animals = ['dog','cat']
const numbers = [1,2,3,4,5]

const myFilter = <T>(arr:T[],key:T):T[] => {
  return arr.filter((value:T) => {
    return value === key
  });
}

console.log(myFilter(animals,'cat'))
console.log(myFilter(numbers,2))

interface PersonProps {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
}


const Person:PersonProps[] = [
  {
    name: 'Taro',
    age: 20,
    gender: 'male'
  },
  {
    name: 'Hanako',
    age: 23,
    gender: 'female',
  },
  {
    name: 'Tetsuya',
    age: 24,
    gender: 'male'
  }
]

const myMap = <T, K extends keyof T>(props: T[], key: K):T[K][] => {
  return props.map((value:T) => {
    return value[key]
  })
}

const PersonList = myMap(Person,'age')
console.log(PersonList)

interface Properties {
  name: string
  age: number
  flag: boolean
}

type IsType<T, U> = {
  [K in keyof T]: T[K] extends U ? true : false
}

type IsString = IsType<Properties, string>
type IsNumber = IsType<Properties, number>
type IsBoolean = IsType<Properties, boolean>

