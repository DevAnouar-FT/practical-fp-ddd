export type RetrievalStatus = {
  loading: boolean;
  error?: string;
};

export type RetrievalResult<T> = {
  loading: boolean;
  data?: T;
};

export interface Retrieval<T> extends RetrievalStatus, RetrievalResult<T> {}
