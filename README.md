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