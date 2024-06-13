import * as t from 'io-ts';

export const IncidentCaseDTO = t.type({
  id: t.string,
  name: t.string,
  description: t.string,
  failuresCount: t.number,
  degradationsCount: t.number,
});

export type IIncidentCaseDTO = t.TypeOf<typeof IncidentCaseDTO>;
