import { type TaskEither, map } from 'fp-ts/TaskEither';
import { pipe } from 'fp-ts/function';
import type { IResolutionIssue } from '../domain/ResolutionIssue.model';
import { fetchResolutionIssueByIndex } from './resolution-issue.api';
import type { IResolutionIssueDTO } from './ResolutionIssue.dto';

const mapToDomain = ({ id: issueId, priority, status, assignedTeam, assignedAgent }: IResolutionIssueDTO): IResolutionIssue => ({
  issueId,
  priority,
  status,
  assigned: {
    team: assignedTeam,
    agent: assignedAgent,
  },
});

export const getResolutionIssueByIndex = <I extends string | number>(issueIndex: I): TaskEither<Error, IResolutionIssue> => pipe(
  fetchResolutionIssueByIndex(issueIndex),
  map(mapToDomain),
);
