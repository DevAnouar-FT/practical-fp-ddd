import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';
import { fromArray } from 'fp-ts/NonEmptyArray';

export const createLiteralsEnumCodec = <K extends string, V extends string>(typeName: string, literalsMapping: { readonly [key in K]: V }) => {
  const KeyCodec = t.keyof(literalsMapping);

  const ValueCodec = pipe(
    fromArray<t.LiteralC<V>>(
      Object.values<V>(literalsMapping).map(t.literal as Parameters<Array<V>['map']>[number]),
    ),
    E.fromOption(() => 'Mappings for literals should be defined.'),
    E.fold(
      (errorMessage) => { throw new Error(errorMessage); },
      (mappedValues) => t.union(mappedValues as [t.LiteralC<V>, t.LiteralC<V>, ...t.LiteralC<V>[]]),
    ),
  );

  return new t.Type(
    typeName,
    (input): input is V => KeyCodec.is(input),
    (input, context) => pipe(
      KeyCodec.validate(input, context),
      E.chain((validKey) => ValueCodec.validate(literalsMapping[validKey], context)),
      E.fold(
        (errors) => t.failures(errors),
        (validMappedValue) => t.success<V>(validMappedValue),
      ),
    ),
    t.identity,
  );
};
