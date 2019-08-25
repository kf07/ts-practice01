# ts-practice01

strict: trueで型の厳密さを一括指定

それぞれの設定で個別で打ち消すことができる
例：  
noImplicitAny; falseでanyを許容

strictNullChecks: falseでnullチェックをオフに
(nullかもしれない安全に扱うのがTypeScriptの目的の1つのためエラーを回避するためだけに使ってはいけない)
