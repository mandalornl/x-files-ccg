import cardList from '~/config/cards.json';

export const cards = cardList.map((card) => {
  // TODO: Remove when all 040460 cards are available.
  if (card.set === '040460') {
    const value = parseInt(card.id.replace(/^xf22-(\d+)x3$/i, '$1'), 10);

    if (isNaN(value) || value > 58) {
      return {
        ...card,
        image: 'images/back.jpg'
      };
    }
  }

  return {
    ...card,
    image: `images/${card.set.replaceAll(' ', '-')}/${card.id}.jpg`.toLowerCase()
  };
});

export const sets = [
  'Premiere',
  'The Truth is Out There',
  '101361',
  '22364',
  '040460',
  'Promo',
  'Special'
];

export const types = [
  'Adversary',
  'Agent',
  'Bluff',
  'Combat',
  'Equipment',
  'Event',
  'Site',
  'Witness',
  'X-File'
];

export const activators = [
  'Active',
  'Adversary',
  'Affiliation',
  'Affiliation Site',
  'Agent',
  'Alien',
  'Alien Investigation',
  'Behavioral',
  'Believer',
  'Bluff',
  'Briefing',
  'Bureau',
  'Bureaucracy',
  'Combat',
  'Computer',
  'Conspiracy',
  'Creature',
  'Criminal Investigation',
  'Event',
  'Evidence Collection',
  'Evolutionary',
  'Field',
  'Government',
  'Gulag',
  'Healing',
  'Hospital',
  'Medical',
  'Method Site',
  'Mono',
  'Motive',
  'Motive Site',
  'Move',
  'Multiplayer',
  'Negate',
  'Observation',
  'Occult',
  'Occult Adversary',
  'Occult Investigation',
  'Pawn',
  'Primordial',
  'Result',
  'Result Site',
  'Sciences',
  'Site',
  'Skeptic',
  'Subterfuge',
  'Witness'
];

export const keywords = [
  'Abductee',
  'Abduction',
  'Adversary',
  'Affiliation',
  'Agent',
  'Alien',
  'Alien Investigation',
  'Alien Phenomena',
  'Armor',
  'Artifact',
  'Behavioral',
  'Believer',
  'Bluff',
  'Bureaucracy',
  'Cancer',
  'Collection',
  'Combat',
  'Computer',
  'Conspiracy',
  'Creature',
  'Criminal',
  'Criminal Investigation',
  'Electrical',
  'Equipment',
  'Escape',
  'Event',
  'Evidence',
  'Evidence Collection',
  'Evolutionary',
  'FBI',
  'Government',
  'Healing',
  'Independent',
  'Information',
  'Insanity',
  'Investigation',
  'Killer',
  'Law',
  'Martial Arts',
  'Master',
  'Mechanical',
  'Medical',
  'Method',
  'Mono',
  'Motive',
  'Move',
  'Multi',
  'Mystic',
  'Negate',
  'Neutral',
  'Observation',
  'Occult',
  'Occult Creature',
  'Occult Investigation',
  'Pawn',
  'Phenomena',
  'Primordial',
  'Question',
  'Resource',
  'Result',
  'Sciences',
  'Site',
  'Skeptic',
  'Special',
  'Standard',
  'Subterfuge',
  'Training',
  'Weapon',
  'Weapon Standard',
  'Witness'
];

export const rarities = [
  'Common',
  'Uncommon',
  'Rare',
  'Ultra-Rare',
  'Fixed',
  'Custom'
];

export const tags = [
  'Affect Agent',
  'Change Keyword',
  'Change Prerequisite',
  'Decrease Skill',
  'Discard',
  'Examine Hand',
  'Force Skill Check',
  'Increase Cost',
  'Increase Skill',
  'Modify Witness',
  'Move',
  'Negate',
  'Non-combative',
  'Prevent',
  'Recurring Resource',
  'Reduce Damage',
  'Reduce Prerequisite',
  'Replenish Token',
  'Resource',
  'Search',
  'Skip Long Range',
  'Split Damage',
  'Unique'
];
