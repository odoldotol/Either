import { Either } from "@core";

export const flatMap = <R, S, L = any, T = any>(
  fn: (v: R) => Either<T, S>
): ((either: Either<L, R>) => Either<L | T, S>) => {
  return either => either.flatMap(fn);
};

export const flatMapAsync = <R, S, L = any, T = any>(
  asyncFn: (v: R) => Promise<Either<T, S>>
): ((either: Either<L, R>) => Promise<Either<L | T, S>>) => {
  return either => either.flatMapAsync(asyncFn);
};