import * as t from 'io-ts';
import { tryCatch, type TaskEither } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import { fold, left } from 'fp-ts/Either';
import reporter from 'io-ts-reporters';

export type AsyncDataFetcher<T> = TaskEither<Error, T>;

export const createAsyncDataFetcher = <T>(apiUrl: string, dataTransferCodec: t.Type<T>): TaskEither<Error, T> => tryCatch(
  async () => pipe(
    await (await fetch(apiUrl)).json(),
    dataTransferCodec.decode,
    fold(
      (errors) => { throw new Error(reporter.report(left(errors)).join('\n')); },
      t.identity,
    ),
  ),
  (reason) => new Error(String(reason)),
);
