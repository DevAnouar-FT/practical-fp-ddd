import { defineDataRetrievalUseCase } from 'boundaries/shared/application/utils';
import { getResolutionIssueByIndex } from '../infrastructure';

export const loadResolutionIssueByIndex = (issueIndex: number) =>
  defineDataRetrievalUseCase(getResolutionIssueByIndex(issueIndex));
