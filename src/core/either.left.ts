import { Either } from "./either";

export class LeftEither<L>
  extends Either<L, never>
{
  public isRight(): boolean {
    return false;
  }

  public isLeft(): boolean {
    return true;
  }

  public getRight(): never {
    throw new TypeError(`Either.getRight was called, but this Either is Left with value: ${this.getValue()}`);
  }

  public getLeft(): L {
    return this.getValue();
  }
}
