import { Either } from "@core";

export const wrap = <R, S, L = any>(
  fn: (v: S) => R
): ((v: S) => Either<L, R>) => {
  return v => {
    try {
      return Either.right<R, L>(fn(v));
    } catch (e) {
      return Either.left<L, R>(e as L);
    }
  };
};

export const wrapAsync = <R, S, L = any>(
  asyncFn: (v: S) => Promise<R>
): ((v: S) => Promise<Either<L, R>>) => {
  return v => wrapPromise<R, L>(asyncFn(v));
};

export const wrapPromise = <R, L>(
  promise: Promise<R>
): Promise<Either<L, R>> => {
  return promise
  .then(Either.right<R, L>)
  .catch(Either.left<L, R>);
};