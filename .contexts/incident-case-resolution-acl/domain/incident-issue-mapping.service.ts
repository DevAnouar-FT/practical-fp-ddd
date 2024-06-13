import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { _validateIncidentCase, type IIncidentCase } from 'boundaries/incident-case-management';
import { _validateIssue, type IIssueResolution } from 'boundaries/issue-resolution-management';

import type { IIncidentWithIssueResolution } from './IncidentWithIssueResolution.model';

export const mapIssueToIncident = (incident: IIncidentCase, issue: IIssueResolution): E.Either<Error, IIncidentWithIssueResolution> => pipe(
  E.Do,
  E.apS('validIncident', _validateIncidentCase(incident)),
  E.apS('validIssue', _validateIssue(issue)),
  E.map(({ validIncident, validIssue }) => ({
    ...validIncident,
    issueResolution: validIssue,
  })),
);
