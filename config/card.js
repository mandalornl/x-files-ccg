import premiere from '~/config/card-list/premiere.json';
import ttiot from '~/config/card-list/ttiot.json';
import mulder from '~/config/card-list/101361.json';
import scully from '~/config/card-list/22364.json';
import season4 from '~/config/card-list/040460.json';
import promo from '~/config/card-list/promo.json';
import gencon from '~/config/card-list/gencon.json';
import delaney from '~/config/card-list/100617.json';
import dream from '~/config/card-list/dream.json';

export const pool = [
  ...premiere,
  ...ttiot,
  ...mulder,
  ...scully,
  ...season4,
  ...promo,
  ...gencon,
  ...delaney,
  ...dream
].map((card) => ({
  ...card,
  image: `images/${card.set}/${card.id}.jpg`
    .replaceAll(' ', '-')
    .toLowerCase()
}));

export const sets = [
  'Premiere',
  'The Truth is Out There',
  '101361',
  '22364',
  '040460',
  'Promo',
  'Gen Con',
  '100617',
  'Dream'
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
  'Method',
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
  'Cute',
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
  'Witness'
];

export const rarities = [
  'Common',
  'Uncommon',
  'Rare',
  'Ultra-Rare',
  'Fixed',
  'Community',
  'Demo'
];

export const episodes = [
  '2Shy',
  '3',
  '731',
  'Anasazi',
  'Apocrypha',
  'Ascension',
  'Aubrey',
  'Avatar',
  'Beyond The Sea',
  'Blood',
  'Born Again',
  'Calusari',
  'Clyde Bruckman\'s Final Repose',
  'Colony',
  'Conduit',
  'D.P.O.',
  'Darkness Falls',
  'Deep Throat',
  'Demons',
  'Die Hand Die Verletzt',
  'Dod Kalm',
  'Duane Barry',
  'E.B.E.',
  'El Mundo Gira',
  'Elegy',
  'End Game',
  'Erlenmeyer Flask',
  'Eve',
  'Excelsius Dei',
  'F. Emasculata',
  'Fallen Angel',
  'Fearful Symmetry',
  'Fire',
  'Firewalker',
  'Fragile',
  'Fresh Bones',
  'Gender Bender',
  'Gethsemane',
  'Ghost In The Machine',
  'Grotesque',
  'Halloween',
  'Hell Money',
  'Herrenvolk',
  'Home',
  'Humbug',
  'Ice',
  'Irresistible',
  'Jersey Devil',
  'Jose Chung\'s "From Outer Space"',
  'Kaddish',
  'Lazarus',
  'Leonard Betts',
  'Les Naufrageurs',
  'Little Green Men',
  'Max',
  'Memento Mori',
  'Miracle Man',
  'Musings Of A Cigarette-Smoking Man',
  'Never Again',
  'Nisei',
  'One Breath',
  'Oubliette',
  'Our Town',
  'Paper Clip',
  'Paper Hearts',
  'Pilot',
  'Piper Maru',
  'Pusher',
  'Quagmire',
  'Red Museum',
  'Revelations',
  'Roland',
  'Sanguinarium',
  'Schooled',
  'Scramble, Scramble, Scramble',
  'Shadows',
  'Shapes',
  'Sleepless',
  'Small Potatoes',
  'Soft Light',
  'Space',
  'Squeeze',
  'Storm-Sun\'s Bale',
  'Synchrony',
  'Syzygy',
  'Talitha Cumi',
  'Teliko',
  'Tempus Fugit',
  'Terma',
  'Teso dos Bichos',
  'The Blessing Way',
  'The Calusari',
  'The Erlenmeyer Flask',
  'The Field Where I Died',
  'The Host',
  'The Jersey Devil',
  'The List',
  'The Walk',
  'Tooms',
  'Tunguska',
  'Unrequited',
  'Unruhe',
  'Unusual Suspects',
  'Verum lamia non coruscent',
  'War Of The Coprophages',
  'Wetwired',
  'Young At Heart',
  'Zero Sum',
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
