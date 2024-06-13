import * as t from 'io-ts';
import { ResolutionOwner } from './ResolutionOwner.model';

export const ResolutionIssue = t.type({
  issueId: t.string,
  priority: t.union([
    t.literal('Critical'),
    t.literal('Major'),
    t.literal('Medium'),
    t.literal('Low'),
    t.literal('Minor'),
  ]),
  status: t.union([
    t.literal('Open'),
    t.literal('In Progress'),
    t.literal('Pending'),
    t.literal('Rejected'),
    t.literal('Resolved'),
  ]),
  assigned: ResolutionOwner,
});

export type IResolutionIssue = t.TypeOf<typeof ResolutionIssue>;
