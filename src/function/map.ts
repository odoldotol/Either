import { Either } from "@core";

export const map = <R, S, L = any, T = any>(
  fn: (v: R) => S
): ((either: Either<L, R>) => Either<L | T, S>) => {
  return either => either.map(fn);
};

export const mapAsync = <R, S, L = any, T = any>(
  asyncFn: (v: R) => Promise<S>
): ((either: Either<L, R>) => Promise<Either<L | T, S>>) => {
  return either => either.mapAsync(asyncFn);
};