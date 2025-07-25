#!/usr/bin/env node

import {
  readFile,
  writeFile
} from 'node:fs/promises';
import { URL } from 'node:url';

const pool = await Promise.all([
  'premiere',
  'the-truth-is-out-there',
  '101361',
  '22364',
  'believe-the-lie',
  'promo',
  'gencon',
  'here-there-be-monsters',
  'classified',
  'i-want-to-believe',
  'my-struggle',
  'fire-walk-with-me'
].map(async (name) => {
  const json = await readFile(new URL(`../config/cards/${name}.json`, import.meta.url), 'utf-8');

  return JSON.parse(json);
})).then((result) => result.flat());

const filters = Object.entries({
  activators: 'activators',
  cost: 'costs',
  episode: 'episodes',
  keywords: 'keywords',
  // rarity: 'rarities',
  // set: 'sets',
  tags: 'tags',
  // type: 'types'
});

const collator = new Intl.Collator('en', {
  sensitivity: 'base',
  numeric: true
});

for (const [
  key,
  name
] of filters) {
  const data = pool
    .map((card) => card[key])
    .flat()
    .filter((value, index, self) => !!value && self.indexOf(value) === index)
    .sort((a, b) => {
      if (key === 'cost') {
        const [
          costA,
          poolA
        ] = a.split(' ');
        const [
          costB,
          poolB
        ] = b.split(' ');

        if (poolA === poolB) {
          return collator.compare(costA, costB);
        }

        return collator.compare(poolA, poolB);
      }

      return collator.compare(a, b);
    });

  await writeFile(new URL(`../config/cards/${name}.json`, import.meta.url), JSON.stringify(data, null, 2));
}
