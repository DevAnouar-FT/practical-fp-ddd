import { defineDataRetrievalUseCase } from 'boundaries/shared/application/utils';
import { getIncidentCases } from '../infrastructure';

export const loadIncidentCases = defineDataRetrievalUseCase(getIncidentCases);
