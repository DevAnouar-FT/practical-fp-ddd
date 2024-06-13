import * as t from 'io-ts';

export const FailuresDegradationsImpact = t.type({
  failureImpact: t.number,
  degradationImpact: t.number,
});

export type IFailuresDegradationsImpact = t.TypeOf<typeof FailuresDegradationsImpact>;

export const calculateTotalImpact = ({ failureImpact, degradationImpact }: IFailuresDegradationsImpact): number =>
  failureImpact + degradationImpact;
