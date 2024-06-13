import { createAsyncDataFetcher } from 'boundaries/shared/infrastructure/api';
import { ResolutionIssueDTO, type IResolutionIssueDTO } from './ResolutionIssue.dto';

export const fetchResolutionIssueByIndex = <I extends string | number>(issueIndex: I) => createAsyncDataFetcher<IResolutionIssueDTO>(
  `/sherlock/api/issues/issue-${issueIndex}`,
  ResolutionIssueDTO,
);
