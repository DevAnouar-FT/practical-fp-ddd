import * as t from 'io-ts';
import { PriorityFromDTO } from './PriorityEnumFromDTO.codec';
import { StatusFromDTO } from './StatusEnumFromDTO.codec';

export const ResolutionIssueDTO = t.type({
  id: t.string,
  priority: PriorityFromDTO,
  status: StatusFromDTO,
  assignedTeam: t.string,
  assignedAgent: t.string,
});

export type IResolutionIssueDTO = t.TypeOf<typeof ResolutionIssueDTO>;
