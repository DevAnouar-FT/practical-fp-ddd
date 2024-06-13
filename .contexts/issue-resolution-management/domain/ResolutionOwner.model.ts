import * as t from 'io-ts';

export const ResolutionOwner = t.type({
  team: t.string,
  agent: t.string,
});

export type IResolutionOwner = t.TypeOf<typeof ResolutionOwner>;
