import { Either } from "@core";

export const isRight = <L, R>(either: Either<L, R>): boolean => {
  return either.isRight();
};

export const isLeft = <L, R>(either: Either<L, R>): boolean => {
  return either.isLeft();
};