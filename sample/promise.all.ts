import * as R from 'ramda';
import * as E from 'either';
import {
  minus10,
  rejectOdd,
  square,
} from './common';

(async () => {
  console.time('Promise.all');

  await Promise.all([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map(E.wrapAsync(rejectOdd))
    .map(R.andThen(E.flatMapAsync(E.wrapAsync(square))))
    .map(R.andThen(E.flatMap(E.wrap(minus10))))
  ).then(console.log);

  console.timeEnd('Promise.all');
})();