import * as t from 'io-ts';
import { FailuresDegradationsImpact, calculateTotalImpact } from './FailuresDegradationsImpact.model';

export const IncidentCase = t.type({
  caseId: t.string,
  name: t.string,
  description: t.string,
  customersImpact: FailuresDegradationsImpact,
});

export type IIncidentCase = t.TypeOf<typeof IncidentCase>;

export const calculateImpactedCustomersCount = ({ customersImpact }: IIncidentCase): number => calculateTotalImpact(customersImpact);
