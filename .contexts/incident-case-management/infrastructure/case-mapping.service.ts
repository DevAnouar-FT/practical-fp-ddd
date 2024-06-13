import { pipe } from 'fp-ts/function';
import { type TaskEither, map } from 'fp-ts/TaskEither';
import { map as mapArray } from 'fp-ts/Array';
import type { IIncidentCase } from '../domain/IncidentCase.model';
import { fetchIncidentCases } from './incident-cases.api';
import type { IIncidentCaseDTO } from './IncidentCase.dto';

const mapToDomain = (dto: IIncidentCaseDTO): IIncidentCase => ({
  caseId: dto.id,
  name: dto.name,
  description: dto.description,
  customersImpact: {
    failureImpact: dto.failuresCount,
    degradationImpact: dto.degradationsCount,
  },
});

export const getIncidentCases: TaskEither<Error, IIncidentCase[]> = pipe(
  fetchIncidentCases,
  map(mapArray(mapToDomain)),
);
