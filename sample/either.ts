import Either from 'either';
import {
  minus10,
  square,
} from './common';

(async () => {
  let either: any;

  // creations
  const right11 = Either.right(11);
  const left11 = Either.left("11");
  const right0 = Either.right(0);

  // is
  console.log(right11.isRight()); // true
  console.log(right11.isLeft()); // false
  console.log(left11.isLeft()); // true
  console.log(left11.isRight()); // false

  // get
  console.log(right11.getRight()); // 11
  console.log(left11.getLeft()); // "11"

  try {
    left11.getRight(); // Either.getRight throws an error if the result is not right
  } catch (error) {
    console.log(error);
  }

  // map
  either = right11.map(minus10);

  console.log(either.isRight()); // true
  console.log(either.getRight()); // 1

  either = left11.map(minus10);

  console.log(either.isLeft()); // true
  console.log(either.getLeft()); // "11"

  try {
    right0.map(minus10); // minus10 throws an error
  } catch (error) {
    console.log(error);
  }

  // mapAsync
  const right5 = Either.right(5);
  const left5 = Either.left("5");

  either = await right5.mapAsync(square);

  console.log(either.isRight()); // true
  console.log(either.getRight()); // 25

  either = await left5.mapAsync(square);

  console.log(either.isLeft()); // true
  console.log(either.getLeft()); // "5"

  try {
    either = await right0.mapAsync(square); // square rejects
  } catch (error) {
    console.log(error);
  }

  // flatMap
  const safeInteger = (n: any): Either<any, number> => {
    if (Number.isSafeInteger(n)) {
      return Either.right(n);
    } else {
      return Either.left(n);
    }
  };

  either = right11.flatMap(safeInteger);

  console.log(either.isRight()); // true
  console.log(either.getRight()); // 11

  either = Either.right("11").flatMap(safeInteger);

  console.log(either.isLeft()); // true
  console.log(either.getLeft()); // "11"
})();