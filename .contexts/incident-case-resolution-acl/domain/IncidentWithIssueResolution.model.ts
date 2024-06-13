import * as t from 'io-ts';
import { _IncidentCase } from 'boundaries/incident-case-management';
import { _IssueResolution } from 'boundaries/issue-resolution-management';

export const IncidentWithIssueResolution = t.intersection([
  _IncidentCase,
  t.type({ issueResolution: _IssueResolution }),
]);
export type IIncidentWithIssueResolution = t.TypeOf<typeof IncidentWithIssueResolution>;
