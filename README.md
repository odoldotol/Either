# Either

<br>

## Installation

```
npm install @odoldotol/either
```

<br><br>

## Usage

This library was created while using [FxTS](https://fxts.dev/), a functional library with strengths in lazy evaluation and concurrent request handling.

For example, let’s consider three functions: 

```typescript
/**
 * Asynchronous function that rejects if the number is odd.  
 */
const rejectOdd = async (num: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, num * 100));

  if (num % 2 === 0) {
    return num;
  } else {
    throw new Error(`rejectOdd: ${num} is not an even number`);
  }
};
  
/**
 * Asynchronous function that squares the number.  
 * rejects if the number is 0. 
 */
const square = async (num: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, Math.abs(num - 10) * 100));

  if (num === 0) {
    throw new Error(`square: 0 is not allowed`);
  } else {
    return num**2;
  }
};
  
/**
 * Synchronous function that subtracts 10.  
 * throws an error if the result is 0 or below.
 */
const minus10 = (num: number): number => {
  const result = num - 10;
  if (result <= 0) {
    throw new Error(`minus10: result(${result}) must be greater than 0`);
  } else {
    return result;
  }
};
```

Now, pipe these functions.  
regardless of whether they are synchronous or asynchronous.  
even if there are errors or rejections.

```typescript
import * as F from '@fxts/core';
import * as E from 'either';

await F.pipe(
  F.toAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
  F.map(E.wrapAsync(rejectOdd)),
  F.map(E.flatMapAsync(E.wrapAsync(square))),
  F.map(E.flatMap(E.wrap(minus10))),
  F.concurrent(11),
  F.toArray,
  console.log
); // 1 second
```

log as follow.
```
[
  Left { value: Error: square: 0 is not allowed },
  Left { value: Error: rejectOdd: 1 is not an even number },
  Left { value: Error: minus10: result(-6) must be greater than 0 },
  Left { value: Error: rejectOdd: 3 is not an even number },
  Right { value: 6 },
  Left { value: Error: rejectOdd: 5 is not an even number },
  Right { value: 26 },
  Left { value: Error: rejectOdd: 7 is not an even number },
  Right { value: 54 },
  Left { value: Error: rejectOdd: 9 is not an even number },
  Right { value: 90 }
]
```

<br><br>

## What is

```typescript
import Either from 'either';

const right11 = Either.right(11);
const left11 = Either.left("11");
const right0 = Either.right(0);

right11.isRight(); // true
right11.isLeft(); // false
left11.isLeft(); // true
left11.isRight(); // false

right11.getRight(); // 11
left11.getLeft(); // "11"

left11.getRight(); // throws an error.
```

<br>

### Map

```typescript
let either = right11.map(minus10);

either.isRight(); // true
either.getRight(); // 1

either = left11.map(minus10);

either.isLeft(); // true
either.getLeft(); // "11"
```

<br>

### MapAsync

```typescript
const right5 = Either.right(5);
const left5 = Either.left("5");

let either = await right5.mapAsync(square);

either.isRight(); // true
either.getRight(); // 25

either = await left5.mapAsync(square);

either.isLeft(); // true
either.getLeft(); // "5"
```

<br>

### FlatMap

```typescript
const safeInteger = (n: any): Either<any, number> => {
  if (Number.isSafeInteger(n)) {
    return Either.right(n);
  } else {
    return Either.left(n);
  }
};

let either = Either.right(10).flatMap(safeInteger);

either.isRight(); // true
either.getRight(); // 10

either = Either.right("10").flatMap(safeInteger);

either.isLeft(); // true
either.getLeft(); // "10"
```

<br><br>

## API

```
Either
```

```
Either.right

Either.left
```

```
Either.prototype.isRight

Either.prototype.isLeft

Either.prototype.getRight

Either.prototype.getLeft

Either.prototype.map

Either.prototype.flatMap

Either.prototype.mapAsync

Either.prototype.flatMapAsync
```

```
flatRightFilter

flatLeftFilter
```

```
wrap

wrapAsync

wrapPromise
```

```
flatMap

flatMapAsync

getRight

getLeft

isRight

isLeft

map

mapAsync
```
