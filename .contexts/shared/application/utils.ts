import { tryCatch, fold } from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/function';
import type { Ref } from 'vue';
import type { AsyncDataFetcher } from '../infrastructure/api';
import type { RetrievalStatus } from './types';

export type Refify<T extends { [k: string]: unknown }> = {
  [P in keyof T]: Ref<NonNullable<T[P]> | (undefined extends T[P] ? null : never)>;
};

export const defineDataRetrievalUseCase = <T>(fetcher: AsyncDataFetcher<T>) => tryCatch(
  async () => pipe(
    fetcher,
    fold(
      (error) => { throw ({ loading: false, error: error.message }); },
      (data) => async () => ({ data, loading: false }),
    ),
  ),
  (reason): RetrievalStatus => ({ loading: false, error: String(reason) }),
);
