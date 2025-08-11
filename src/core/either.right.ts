import { Either } from "./either";

export class RightEither<R>
  extends Either<never, R>
{
  public isRight(): boolean {
    return true;
  }

  public isLeft(): boolean {
    return false;
  }

  public getRight(): R {
    return this.getValue();
  }

  public getLeft(): never {
    throw new TypeError(`Either.getLeft was called, but this Either is Right with value: ${this.getValue()}`);
  }
}
