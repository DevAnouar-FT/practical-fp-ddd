import { createLiteralsEnumCodec } from 'boundaries/shared/infrastructure/codecs';

export const StatusFromDTO = createLiteralsEnumCodec('StatusFromDTO', {
  open: 'Open',
  ['in-progress']: 'In Progress',
  pending: 'Pending',
  rejected: 'Rejected',
  resolved: 'Resolved',
} as const);
