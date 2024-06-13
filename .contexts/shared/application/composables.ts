import { ref } from 'vue';
import * as TE from 'fp-ts/TaskEither';
import * as T from 'fp-ts/Task';
import { pipe, identity } from 'fp-ts/function';
import type { Retrieval, RetrievalResult, RetrievalStatus } from './types';
import type { Refify } from './utils';

const updateRetrievalState = <V>(useMutableRefs: () => RetrievalState) => (retrieval: T.Task<Retrieval<V>>) => pipe(
  TE.fromTask(retrieval),
  TE.chain(TE.fromPredicate<RetrievalStatus, Retrieval<V>>(
    (retrieval): retrieval is RetrievalResult<V> => !!retrieval.data,
    identity,
  )),
  TE.mapLeft((retrievalStatus) => {
    const { loading, error } = retrievalStatus;
    useMutableRefs().loading.value = loading;
    // FIXME: Fix error! ref Type inference (See contexts/shared/application/utils.ts)
    useMutableRefs().error!.value = error ?? null;

    return retrievalStatus;
  }),
);

const createRetrievalStateUpdater = <V>(useMutableRefs: () => RetrievalState) => pipe(
  useMutableRefs,
  updateRetrievalState<V>,
);

interface RetrievalState extends Refify<RetrievalStatus> {};
type DataLoader<T> = TE.TaskEither<RetrievalStatus, T.Task<RetrievalResult<T>>>;

export const useDataLoader = <V>(): RetrievalState & {
  withReactivity(onSuccess: (data: V) => void): (loader: DataLoader<V>) => T.Task<void>;
} => {
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const updateState = createRetrievalStateUpdater<V>(() => ({ loading, error }));

  return {
    loading,
    error,
    withReactivity: (onSuccess) => (loader) => pipe(
      T.of<Retrieval<V>>({ loading: true }),
      updateState,
      () => loader,
      TE.chain(updateState),
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      TE.fold<RetrievalStatus, RetrievalResult<V>, void>(
        ({ error }) => () => Promise.reject({ error: { message: error } }),
        ({ data }) => async () => {
          onSuccess(data!);

          return Promise.resolve();
        },
      ),
    ),
  };
};
