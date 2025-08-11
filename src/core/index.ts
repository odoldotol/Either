import { Either } from "./either";
import { LeftEither } from "./either.left";
import { RightEither } from "./either.right";

Either.left = (value) => {
  return new LeftEither(value);
};

Either.right = (value) => {
  return new RightEither(value);
};

Object.defineProperty(Either.left, "name", {
  value: "left",
});

Object.defineProperty(Either.right, "name", {
  value: "right",
});

Object.defineProperties(Either, {
  left: {
    enumerable: false,
  },
  right: {
    enumerable: false,
  },
});

export { Either } from "./either";