import { Either } from "@core";
import {
  getLeft,
  getRight
} from "./get";
import {
  isLeft,
  isRight
} from "./is";

export const flatRightFilter = <R, L = any>(
  eitherArr: readonly Either<L, R>[]
): R[] => {
  return eitherArr
  .filter(isRight)
  .map(getRight);
};

export const flatLeftFilter = <R, L = any>(
  eitherArr: readonly Either<L, R>[]
): L[] => {
  return eitherArr
  .filter(isLeft)
  .map(getLeft);
};