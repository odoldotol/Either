export abstract class Either<L, R>
{
  constructor(
    private readonly value: L | R
  ) {}

  public static right: <R, L = any>(value: R) => Either<L, R>;
  public static left: <L, R = any>(value: L) => Either<L, R>;

  protected getValue(): L | R {
    return this.value;
  }

  public abstract isRight(): boolean;
  public abstract isLeft(): boolean;
  public abstract getRight(): R;
  public abstract getLeft(): L;

  public map<S>(
    fn: (v: R) => S
  ): Either<L, S> {
    return this.flatMap(v => Either.right(fn(v)));
  }

  public flatMap<S, T = any>(
    fn: (v: R) => Either<T, S>
  ): Either<L | T, S> {
    return this.isRight()
      ? fn(this.getRight())
      : Either.left(this.getLeft());
  }

  // public leftMap
  // public leftFlatMap

  public mapAsync<S>(
    asyncFn: (v: R) => Promise<S>
  ): Promise<Either<L, S>> {
    return this.flatMapAsync(v => asyncFn(v).then(Either.right<S, L>));
  }

  public flatMapAsync<S, T = any>(
    asyncFn: (v: R) => Promise<Either<T, S>>
  ): Promise<Either<L | T, S>> {
    return this.isRight()
      ? asyncFn(this.getRight())
      : Promise.resolve(Either.left(this.getLeft()));
  }

  // public leftMapAsync
  // public leftFlatMapAsync
}
