import { createLiteralsEnumCodec } from 'boundaries/shared/infrastructure/codecs';

export const PriorityFromDTO = createLiteralsEnumCodec('PriorityFromDTO', {
  critical: 'Critical',
  major: 'Major',
  medium: 'Medium',
  low: 'Low',
  minor: 'Minor',
} as const);
