# Install
```bash
npm install
```

# Coding Challenge 

## 1. Check if a string is a palindrome
```bash
node ./src/palindrome/main.js <string>
```

parameters:

    <string> word

example

```bash
node ./src/palindrome/main.js abcba

return true
```

```bash
node ./src/palindrome/main.js abdefba

return false
```

## 2. Algorithm to find K-complementary pairs in a given array of integers

```bash
node ./src/kcomplementary/main.js <int> <array<int>>
```

parameters:

    <int> K
    <array<int>> array int

example

```bash
node ./src/kcomplementary/main.js 3 [1,2,3]

return 1
```

```bash
node node ./src/kcomplementary/main.js 3 [1,1,1]

return 0
```

## 3. Tf/idf (term frequency / inverse document frequency) 

returns the most relevant documents for a term.

It provides a graphic interface that asks the following questions

1. Query
2. Page
3. Records per page

The commands that the graphical interface supports are

"q" or "query" to repeat a new query
"exit" to exit



```bash
node ./src/tfidf/main.js <string> <string> <int>
```

parameters:

    <string> path
    <string> terms
    <int>    Top documents

example:
```bash
node ./src/tfidf/main.js ./docs 'hello' 3
```
return

```

{ terms: 'hello', page: 1, recordsPerPage: 3 }


┌─────────┬────────────────┬───┐
│ (index) │       0        │ 1 │
├─────────┼────────────────┼───┤
│    0    │ './docs/a.txt' │ 0 │
└─────────┴────────────────┴───┘


Page->'
```

# Test
```bash
npm test
```

# linter
```bash
npm run lint
```