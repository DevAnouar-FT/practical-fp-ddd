import { defineStore } from 'pinia';
import { type Ref, reactive } from 'vue';
import { pipe } from 'fp-ts/function';
import { useDataLoader } from 'boundaries/shared/application/composables';
import type { IResolutionIssue } from '../domain/ResolutionIssue.model';
import { loadResolutionIssueByIndex } from './use-cases';

interface State {
  issues: IResolutionIssue[];
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

interface Actions {
  loadIssueByIndex(issueIndex: number): Promise<void>;
}

export const useResolutionIssueStore = defineStore('resolution-issues', (): State & Actions => {
  let issues = reactive<State['issues']>([]);
  const { loading, error, withReactivity } = useDataLoader<IResolutionIssue>();

  const loadIssueByIndex = (issueIndex: number) => pipe(
    loadResolutionIssueByIndex(issueIndex),
    withReactivity((data) => {
      issues = issues.map((issue) =>
        issue.issueId === data?.issueId ? data : issue,
      );
    }),
  )();

  return {
    issues,
    loading,
    error: error!,
    loadIssueByIndex,
  };
});
