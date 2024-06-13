import * as t from 'io-ts';
import { createAsyncDataFetcher } from 'boundaries/shared/infrastructure/api';
import { IncidentCaseDTO, type IIncidentCaseDTO } from './IncidentCase.dto';

export const fetchIncidentCases = createAsyncDataFetcher<IIncidentCaseDTO[]>(
  '/sherlock/api/incident-cases',
  t.array(IncidentCaseDTO),
);
