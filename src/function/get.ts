import { Either } from "@core";

export const getRight = <L, R>(either: Either<L, R>): R => {
  return either.getRight();
};

export const getLeft = <L, R>(either: Either<L, R>): L => {
  return either.getLeft();
};