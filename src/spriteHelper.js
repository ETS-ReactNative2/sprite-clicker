import { SPRITELIST } from './spriteList';
import { randomChoice, capitalizeFirst } from './utils';
import soulName from './name/soulName';

export function randomSprite() {
  const species = randomChoice(Object.keys(SPRITELIST));
  const variant = randomChoice(SPRITELIST[species]);
  const sprite = {
    name: capitalizeFirst(soulName()),
    species: species,
    variant: variant,
  }
  return sprite;
}
