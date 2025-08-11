import * as F from '@fxts/core';
import * as E from 'either';
import {
  minus10,
  rejectOdd,
  square,
} from './common';

(async () => {
  console.time('fxts');

  await F.pipe(
    F.toAsync([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    F.map(E.wrapAsync(rejectOdd)),
    F.map(E.flatMapAsync(E.wrapAsync(square))),
    F.map(E.flatMap(E.wrap(minus10))),
    F.concurrent(11),
    F.toArray,
    console.log
  );

  console.timeEnd('fxts');
})();