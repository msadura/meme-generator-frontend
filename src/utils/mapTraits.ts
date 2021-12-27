import { AttributeType, Traits } from '@app/types';

export function mapTraits(rawTraits: Record<string, any>): Traits {
  return {
    isTemplar: !!rawTraits.isTemplar,
    rankIndex: rawTraits.rankIndex,
    [AttributeType.head]: rawTraits.head,
    [AttributeType.body]: rawTraits.body,
    [AttributeType.clothes]: rawTraits.clothes,
    [AttributeType.eyes]: rawTraits.eyes,
    [AttributeType.background]: rawTraits.background,
    [AttributeType.accessories]: rawTraits.accessories
  };
}
