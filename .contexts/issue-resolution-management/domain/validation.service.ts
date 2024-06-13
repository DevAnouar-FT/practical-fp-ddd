import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { ResolutionIssue, type IResolutionIssue } from './ResolutionIssue.model';

export const validateIssue = (issueResolution: IResolutionIssue): E.Either<Error, IResolutionIssue> => pipe(
  ResolutionIssue.decode(issueResolution),
  E.mapLeft(() => new Error('Invalid IssueResolution')),
);
