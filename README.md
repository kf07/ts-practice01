# ts-practice01

strict: trueで型の厳密さを一括指定

それぞれの設定で個別で打ち消すことができる
例：  
noImplicitAny; falseでanyを許容

strictNullChecks: falseでnullチェックをオフに
(nullかもしれない安全に扱うのがTypeScriptの目的の1つのためエラーを回避するためだけに使ってはいけない)

includeで出力元を指定  
compilerOptions.outDirで出力先を指定

 "declaration": trueにすると型定義ファイルが生成される
 
```
"allowJs": true
"checkJs": true
```

でjsファイルをビルドに含むことができる


### ライブラリの型定義
tsRootsで型定義を探すディレクトリを決める  
デフォルトはnode_modules/@typesになっている  
オリジナルの型定義ファイルを使用したい場合などにtypesRootsで別のディレクトリに変更できる

```
{
   "compilerOptions": {
       "typeRoots": ["./typings"]
   }
}
```

typesで制限  
typesを指定することでnode_modules/@types/*の他のパッケージが自動インクルードされないようになる 

下記の場合 
- node_modules/@type/lodash
- node_modules/@type/express
- node_modules/@type/node
のみがインクルード対象になる
```
{
   "compilerOptions": {
       "types" : ["node", "lodash", "express"]
   }
}
```

### ビルドを高速化
```
tsc -b
```
コマンドでビルドを高速化できる

```
tsc -b --watch
```
コマンドで監視して自動ビルド


### includeとexclude
includeでインクルードされたファイルはexcludeでフィルタリングできる  
例
```
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "src/test.ts"
    "node_modules"
  ]
```
にするとsrcディレクトリのtest.tsのみビルドから除外される  
exclude"プロパティを指定していない場合は、 
デフォルトでnode_modules、bower_components、jspm_packagesとoutDirで指定されたディレクトリが除外されます。
なのでexcludeを使用している場合はnode_modules等も指定が必要になる


### extends
extendsで別ファイルから構成を継承できる  
extendsした値は継承ファイルによって設定をオーバーライドされる


### keyof

keyofはオブジェクトのkey名のユニオン型になる

```typescript
interface Person {
  name: string;
  age: number;
  hobby: string;
}

type PersonKey = keyof Person; //PersonKey = "name" | "age" | "hobby"と同じ

const Boy: Person= {
  name: '太郎',
  age: 12,
  hobby: 'baseball'
};

const getPerson = (obj: Person, key: PersonKey) => obj[key]

const x = getPerson(Boy, 'name');

console.log(x);
```
### Generics


```typescript
interface Box<T> {
  value: T
}
```
変数宣言するときに型を指定する  
指定していない場合はエラー
```typescript
const box0: Box = { value: 'test' } //Genericsを指定していないためエラー
const box1: Box<string> = { value: 'test'} 
const box2: Box<number> = { value: 1 }
const box3: Box<boolean> = { value: true }
```

初期Genericsを指定することができる  
指定している場合はGenericsを省略することができる
```typescript
interface Box<T = string> {
  value: T
}
```

```typescript
const box0: Box = { value: 'test' } //初期Genericsを指定しているためstringのときは省略可
const box1: Box<string> = { value: 'test'}
const box2: Box<number> = { value: 2 } //指定すればstring以外にもできる
```

extendsで指定可能な型を制限する
```typescript
interface Box<T extends string | number> {
  value: T
}
```

```typescript
const box0: Box = { value: 'test' } //Genericsを指定していないためエラー
const box1: Box<string> = { value: 'test'}
const box2: Box<number> = { value: 1 }
const box3: Box<boolean> = { value: true } //string,number型以外を指定しているためエラー
```


#### 関数のGenerics
```typescript
function boxed<T>(props: T) {
  return { value: props}
}

//or

const boxed = <T>(props: T) => ({ value: props })
```

Genericsを指定していなくてもエラーにはならない  
引数に与えられた値から型推論を得ることができる
```typescript
const box0 = boxed('test'); //{value: string}
const box1 = boxed(0); //{value: number}
```

変数と同様にextendsを指定することで指定可能な型を制約することができる

```typescript
function boxed<T extends string>(props: T) {
  return { value: props }
}

const box1 = boxed(0); //エラー
const box2 = boxed('test')
```

props.amountがnumber型であることが確約されているためtoFixed関数を実行できる
```typescript
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
```

#### アサーションによる明示的な型の付与
Nullable型などを直接適用したい場合、宣言時にアサーションを付与
```typescript
const box2 = boxed(false as boolean | null); //{value: boolean| null}
```

#### 複数のGenerics
第２引数のGenericsを、第１引数の Genericsと関連づけることができる  
第２引数に付与されたK型は、第１引数のプロパティ名称であることが確約される  
そのため、`props[key]`が必ず存在する値であることが保証される

```typescript
function pick<T, K extends keyof T>(props: T, key: K) {
  return props[key]
}

const obj = {
  name: 'Taro',
  amount: 0,
  flag: false
};
const value1 = pick(obj, 'name');
const value2 = pick(obj, 'flag');
const value3 = pick(obj, 'age'); //存在しないプロパティ名のためエラー
```

#### ClassのGenerics

constructorの引数を制約できる  
以下の例ではT extends PersonPropsが指定されている  
```typescript
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

```

「Generics」配列とプロパティを指定して、指定したプロパティで配列を作る関数を作ってみる

interfaceでオブジェクトの型を指定  
配列PersonをPersonPropsの型を使って作成  
`<T, K extends keyof T>`を使うことで引数で指定した配列にあるプロパティしか指定できなくなる
配列Personにはname,age,genderがあるので、それ以外を第２引数に指定しようとするとエラーになる
```typescript

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

const PersonList = myMap(Person,'age')  //[ 'Taro', 'Hanako', 'Tetsuya' ]
const PersonHobby = myMap(Person, "hobby") //エラー
console.log(PersonList)
```