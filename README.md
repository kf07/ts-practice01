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

