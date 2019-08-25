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