import { Either } from "@core";
import {
  wrap,
  wrapPromise,
  wrapAsync,
} from "./wrap";

describe("wrap", () => {

  const rightValue = 'right';

  describe("wrap", () => {
    const
    throwParam = "",
    error = new Error(),
    getStringLength = (str: string): number => {
      if (str.length === 0) {
        throw error;
      }
      return str.length;
    };

    let wrappedFn: (str: string) => Either<any, number>;

    it("should return a function", () => {
      wrappedFn = wrap(getStringLength);
      expect(typeof wrappedFn).toBe("function");
    });

    it("should wrap with Either", () => {
      expect(getStringLength(rightValue)).toBe(rightValue.length);
      expect(wrappedFn(rightValue).getRight()).toBe(rightValue.length);
    });

    it("should wrap throws", () => {
      expect(() => getStringLength(throwParam)).toThrow();
      expect(wrappedFn(throwParam).getLeft()).toBe(error);
    });
  });

  describe("wrapPromise", () => {
    it("should return a promise", () => {
      const result = wrapPromise(Promise.resolve());
      expect(result).toBeInstanceOf(Promise);
    });

    it("should wrap with Either", () => {
      const result = wrapPromise(Promise.resolve(rightValue));
      result.then((either) => {
        expect(either.isRight()).toBe(true);
        expect(either.getRight()).toBe(rightValue);
      });
    });

    it("should wrap rejects", () => {
      const error = new Error();
      const result = wrapPromise(Promise.reject(error));
      result.then((either) => {
        expect(either.isLeft()).toBe(true);
        expect(either.getLeft()).toBe(error);
      });
    });
  });

  describe("wrapAsync", () => {
    const rejectParam = "",
    error = new Error(),
    getStringLengthAsync = async (str: string): Promise<number> => {
      if (str.length === 0) {
        throw error;
      }
      return str.length;
    };

    let wrappedAsyncFn: (str: string) => Promise<Either<any, number>>;

    it("should return a function", () => {
      wrappedAsyncFn = wrapAsync(getStringLengthAsync);
      expect(typeof wrappedAsyncFn).toBe("function");
    });

    it("should wrap with Either", () => {
      expect(getStringLengthAsync(rightValue)).resolves.toBe(rightValue.length);
      wrappedAsyncFn(rightValue).then((either) => {
        expect(either.isRight()).toBe(true);
        expect(either.getRight()).toBe(rightValue.length);
      });
    });

    it("should wrap rejects", () => {
      expect(getStringLengthAsync(rejectParam)).rejects.toThrow();
      wrappedAsyncFn(rejectParam).then((either) => {
        expect(either.isLeft()).toBe(true);
        expect(either.getLeft()).toBe(error);
      });
    });
  });
});