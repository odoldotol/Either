import * as R from 'ramda';
import {
  minus10,
  rejectOdd,
  square,
} from './common';

(async () => {
  console.time('Promise.allSettled');

  await Promise.allSettled([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    .map(rejectOdd)
    .map(R.andThen(square))
    .map(R.andThen(minus10))
  ).then(console.log);

  console.timeEnd('Promise.allSettled');
})();