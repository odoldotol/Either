import { Either } from './index';

describe('Either(Core)', () => {

  it('Either should be defined', () => {
    expect(Either).toBeDefined();
  });

  const rightValue = 'right';
  const leftValue = 'left';

  describe('Static Properties', () => {});

  describe('Static Methods', () => {

    describe('Either.right', () => {
      it('should create Right instance', () => {
        const right = Either.right(rightValue);
        expect(right.isRight()).toBe(true);
        expect(right.isLeft()).toBe(false);
        expect(right.getRight()).toBe(rightValue);
      });
    });

    describe('Either.left', () => {
      it('should create Left instance', () => {
        const left = Either.left(leftValue);
        expect(left.isLeft()).toBe(true);
        expect(left.isRight()).toBe(false);
        expect(left.getLeft()).toBe(leftValue);
      });
    });
  });

  describe('Instance Properties', () => {});

  describe('Instance Methods', () => {
    let eitherRight: Either<string, string>;
    let eitherLeft: Either<string, string>;

    beforeEach(() => {
      eitherRight = Either.right(rightValue);
      eitherLeft = Either.left(leftValue);
    });

    const throwingFn = (): any => {
      throw new Error();
    };

    const rejectingAsyncFn = async (): Promise<any> => {
      throw new Error();
    };

    describe('Either.prototype.isRight', () => {
      it('should return true for Right instance', () => {
        expect(eitherRight.isRight()).toBe(true);
      });

      it('should return false for Left instance', () => {
        expect(eitherLeft.isRight()).toBe(false);
      });
    });

    describe('Either.prototype.isLeft', () => {
      it('should return true for Left instance', () => {
        expect(eitherLeft.isLeft()).toBe(true);
      });

      it('should return false for Right instance', () => {
        expect(eitherRight.isLeft()).toBe(false);
      });
    });

    describe('Either.prototype.getRight', () => {
      it('should return value for Right instance', () => {
        expect(eitherRight.getRight()).toBe(rightValue);
      });

      it('should throw for Left instance', () => {
        expect(() => eitherLeft.getRight()).toThrow();
      });
    });

    describe('Either.prototype.getLeft', () => {
      it('should return value for Left instance', () => {
        expect(eitherLeft.getLeft()).toBe(leftValue);
      });

      it('should throw for Right instance', () => {
        expect(() => eitherRight.getLeft()).toThrow();
      });
    });

    describe('Either.prototype.map', () => {
      const getStringLength = (str: string): number => str.length;

      it('should map Right value', () => {
        const result = eitherRight.map(getStringLength);
        expect(result.isRight()).toBe(true);
        expect(result.getRight()).toBe(rightValue.length);
      });

      it('should not map Left value', () => {
        const result = eitherLeft.map(getStringLength);
        expect(result.isLeft()).toBe(true);
        expect(result.getLeft()).toBe(leftValue);
      });

      it('throws', () => {
        // Mapping a function that throws to right throws an error, but mapping to left does not throw
        const fnMappingThrowingOnRight = () => eitherRight.map(throwingFn);
        expect(fnMappingThrowingOnRight).toThrow();
        
        const fnMappingThrowingOnLeft = () => eitherLeft.map(throwingFn);
        expect(fnMappingThrowingOnLeft).not.toThrow();
        expect(fnMappingThrowingOnLeft().getLeft()).toBe(leftValue);
      });
    });

    describe('Either.prototype.flatMap', () => {
      const getStringLength = (str: string): Either<Error, number> => {
        if (str.length === 0) {
          return Either.left(new Error());
        }
        return Either.right(str.length);
      };

      it('should flatMap Right value', () => {
        const resultRight = eitherRight.flatMap(getStringLength);
        expect(resultRight.isRight()).toBe(true);
        expect(resultRight.getRight()).toBe(rightValue.length);

        const resultLeft = Either.right('').flatMap(getStringLength);
        expect(resultLeft.isLeft()).toBe(true);
        expect(resultLeft.getLeft()).toBeInstanceOf(Error);
      });

      it('should not flatMap Left value', () => {
        const result = eitherLeft.flatMap(getStringLength);
        expect(result.isLeft()).toBe(true);
        expect(result.getLeft()).toBe(leftValue);
      });

      it('throws', () => {
        // Mapping a function that throws to right throws an error, but mapping to left does not throw
        const fnMappingThrowingOnRight = () => eitherRight.flatMap(throwingFn);
        expect(fnMappingThrowingOnRight).toThrow();

        const fnMappingThrowingOnLeft = () => eitherLeft.flatMap(throwingFn);
        expect(fnMappingThrowingOnLeft).not.toThrow();
        expect(fnMappingThrowingOnLeft().getLeft()).toBe(leftValue);
      });
    });

    describe('Either.prototype.mapAsync', () => {
      const getStringLengthAsync = async (str: string): Promise<number> => str.length;

      it('should map Right value asynchronously', () => {
        const result = eitherRight.mapAsync(getStringLengthAsync);
        expect(result).toBeInstanceOf(Promise);
        result.then(either => {
          expect(either.isRight()).toBe(true);
          expect(either.getRight()).toBe(rightValue.length);
        });
      });

      it('should not map Left value asynchronously', () => {
        const result = eitherLeft.mapAsync(getStringLengthAsync);
        expect(result).toBeInstanceOf(Promise);
        result.then(either => {
          expect(either.isLeft()).toBe(true);
          expect(either.getLeft()).toBe(leftValue);
        });
      });

      it('rejects', () => {
        // Mapping a function that rejects to right rejects, but mapping to left does not reject
        const resultRight = eitherRight.mapAsync(rejectingAsyncFn);
        expect(resultRight).toBeInstanceOf(Promise);
        resultRight.catch(err => {
          expect(err).toBeInstanceOf(Error);
        });

        const leftResult = eitherLeft.mapAsync(rejectingAsyncFn);
        expect(leftResult).toBeInstanceOf(Promise);
        leftResult.then(either => {
          expect(either.isLeft()).toBe(true);
          expect(either.getLeft()).toBe(leftValue);
        });
      });
    });

    describe('Either.prototype.flatMapAsync', () => {
      const getStringLengthAsync = async (str: string): Promise<Either<Error, number>> => {
        if (str.length === 0) {
          return Either.left(new Error());
        }
        return Either.right(str.length);
      };

      it('should flatMap Right value asynchronously', () => {
        const resultRight = eitherRight.flatMapAsync(getStringLengthAsync);
        expect(resultRight).toBeInstanceOf(Promise);
        resultRight.then(either => {
          expect(either.isRight()).toBe(true);
          expect(either.getRight()).toBe(rightValue.length);
        });

        const resultLeft = Either.right('').flatMapAsync(getStringLengthAsync);
        expect(resultLeft).toBeInstanceOf(Promise);
        resultLeft.then(either => {
          expect(either.isLeft()).toBe(true);
          expect(either.getLeft()).toBeInstanceOf(Error);
        });
      });

      it('should not flatMap Left value asynchronously', () => {
        const result = eitherLeft.flatMapAsync(getStringLengthAsync);
        expect(result).toBeInstanceOf(Promise);
        result.then(either => {
          expect(either.isLeft()).toBe(true);
          expect(either.getLeft()).toBe(leftValue);
        });
      });

      it('rejects', () => {
        // Mapping a function that rejects to right rejects, but mapping to left does not reject
        const resultRight = eitherRight.flatMapAsync(rejectingAsyncFn);
        expect(resultRight).toBeInstanceOf(Promise);
        resultRight.catch(err => {
          expect(err).toBeInstanceOf(Error);
        });

        const leftResult = eitherLeft.flatMapAsync(rejectingAsyncFn);
        expect(leftResult).toBeInstanceOf(Promise);
        leftResult.then(either => {
          expect(either.isLeft()).toBe(true);
          expect(either.getLeft()).toBe(leftValue);
        });
      });
    });
  });
});