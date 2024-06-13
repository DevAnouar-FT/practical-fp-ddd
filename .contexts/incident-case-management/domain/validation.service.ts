import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { IncidentCase, type IIncidentCase } from './IncidentCase.model';

export const validateIncidentCase = (incidentCase: IIncidentCase): E.Either<Error, IIncidentCase> => pipe(
  IncidentCase.decode(incidentCase),
  E.mapLeft(() => new Error('Invalid IncidentCase')),
);
