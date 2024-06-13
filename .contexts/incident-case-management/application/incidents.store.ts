import { defineStore } from 'pinia';
import { type Ref, reactive } from 'vue';
import { pipe } from 'fp-ts/function';
import { useDataLoader } from 'boundaries/shared/application/composables';
import type { IIncidentCase } from '../domain/IncidentCase.model';
import { loadIncidentCases } from './use-cases';

interface State {
  incidents: { values: IIncidentCase[] };
  loading: Ref<boolean>;
  error: Ref<string | null>;
}

interface Actions {
  loadIncidents(): Promise<void>;
}

export const _useIncidentStore = defineStore('incident-cases', (): State & Actions => {
  const incidents = reactive<State['incidents']>({ values: [] });
  const { loading, error, withReactivity } = useDataLoader<IIncidentCase[]>();

  const loadIncidents = pipe(
    loadIncidentCases,
    withReactivity((retrievedCases) => {
      retrievedCases.forEach((incidentCase) => {
        const matchedCaseIndex = incidents.values.findIndex(({ caseId }) => caseId === incidentCase.caseId);

        if (matchedCaseIndex !== -1) {
          incidents.values[matchedCaseIndex] = incidentCase;
        } else {
          incidents.values.push(incidentCase);
        }
      });
    }),
  );

  return {
    incidents,
    loading,
    error: error!,
    loadIncidents,
  };
});
