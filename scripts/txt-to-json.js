import {
  readFile,
  writeFile
} from 'fs/promises';
import {
  fileURLToPath,
  URL
} from 'url';

const getSet = (value) => {
  if (value.startsWith('PR')) {
    return 'Promo';
  } else if (value.endsWith('v1')) {
    return 'Premiere';
  } else if (value.endsWith('v2')) {
    return 'The Truth is Out There';
  } else if (value.endsWith('x1')) {
    return '101361';
  } else if (value.endsWith('x2')) {
    return '22364';
  } else {
    return null;
  }
};

const filename = fileURLToPath(new URL('cards.txt', import.meta.url));

const data = await readFile(filename, 'utf-8');

const cards = [];
let card = null;

data
  .split('\n')
  .map((value) => (
    value
      .normalize("NFC")
      .trim()
  ))
  .forEach((line) => {
    if (
      line.toUpperCase() === line
      && line !== ''
      && !/^[A-Z]{2}\d{2}\D\d{4}/.test(line)
      && !line.includes(':')
    ) {
      card = {
        title: line
          // .toLowerCase()
          // .split(' ')
          // .map((value) => {
          //   // if ((value.includes('.') || value.length === 2) && value !== 'of') {
          //   //   return value.toUpperCase();
          //   // }
          //
          //   return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
          // })
          // .join(' ')
      };
    } else if (/^[A-Z]{2}\d{2}\D\d{4}/.test(line)) {
      const [
        id,
        rarity
      ] = line.split(' -- ');

      card.id = id;
      card.set = getSet(id);
      card.rarity = rarity;
    } else if (line.startsWith('Episode:')) {
      card.episode = line.replace(/^Episode:\s?/, '');
    } else if (line.includes('-- Cost: ')) {
      const [
        type,
        cost
      ] = line.split(' -- ');

      card.type = type;
      card.cost = cost.replace(/^Cost:\s?/, '');
    } else if (line.startsWith('Keywords: ')) {
      card.keywords = line
        .replace(/^Keywords:\s?/, '')
        .split(', ')
        .filter(Boolean);
    } else if (line.startsWith('Activators:')) {
      card.activators = line
        .replace(/^Activators:\s?/, '')
        .toLowerCase()
        .split(', ')
        .map((value) => (
          `${value.charAt(0).toUpperCase()}${value.slice(1)}`
        ))
        .filter(Boolean);
    } else if (line.startsWith('Game Text:')) {
      const value = line.replace(/^Game Text:\s?/, '');
      card.gameText = value ? value : null;
    } else if (line.startsWith('Found in:')) {
      card.foundIn = line.replace(/^Found in:\s?/, '');
    } else if (line.startsWith('Prerequisite:')) {
      card.prerequisite = line.replace(/^Prerequisite:\s?/, '');
    } else if (line.startsWith('Question:')) {
      card.question = line.replace(/^Question:\s?/, '');
    } else if (line.startsWith('Affiliation--')) {
      card.type = 'X-File';
      card.characteristics = line
        .split(', ')
        .reduce((result, characteristic) => {
          const [
            key,
            value
          ] = characteristic.split('--');

          return {
            ...result,
            [key]: value
          };
        }, {});
    } else if (line.startsWith('Stats:')) {
      card.stats = line
        .replace(/^Stats:\s?/, '')
        .split('; ')
        .filter(Boolean)
        .reduce((result, stat) => {
          const [
            key,
            value
          ] = stat.split(': ');

          const label = {
            'LRC': 'Long Range Combat',
            'CRC': 'Close Range Combat',
            'RES': 'Resources'
          }[key] ?? key;

          return {
            ...result,
            [label]: /\d+/.test(value) ? Number(value) : value
          };
        }, {});
    } else if (line.startsWith('LRC: ')) {
      card.stats = line
        .split(/([A-Z]+: \S+)/g)
        .map((value) => value.trim())
        .filter(Boolean)
        .reduce((result, stat) => {
          const [
            key,
            value
          ] = stat.split(': ');

          const label = {
            'LRC': 'Long Range Combat',
            'CRC': 'Close Range Combat',
            'HEALTH': 'Health'
          }[key] ?? key;

          return {
            ...result,
            [label]: /\d+/.test(value) ? Number(value) : value
          };
        }, {});
    } else {
      if (line === '' && card !== null) {
        cards.push(card);
        card = null;
      }
    }
  });

await writeFile(
  filename.replace('.txt', '.json'),
  JSON.stringify(
    cards
      .filter(({ id }) => !!id)
      .map(({
        title,
        ...card
      }) => {
        if (card.type === 'Site') {
          return {
            title: title
              .toLowerCase()
              .split(' ')
              .map((value) => {
                if (
                  (value.length === 2 && ![ 'of', 'in' ].includes(value))
                  || value.split('.').length - 1 > 1
                ) {
                  return value.toUpperCase();
                }

                return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
              })
              .join(' '),
            ...card
          };
        } else {
          return {
            title: title
              .toLowerCase()
              .split(' ')
              .map((value) => {
                if (
                  value.split('.').length - 1 > 1
                  || value === 'ppk'
                ) {
                  return value.toUpperCase();
                } else if (value.includes('-')) {
                  return value
                    .split('-')
                    .map((value) => `${value.charAt(0).toUpperCase()}${value.slice(1)}`)
                    .join('-');
                } else if (value === '2shy') {
                  return `${value.charAt(0)}${value.charAt(1).toUpperCase()}${value.slice(2)}`;
                } else {
                  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
                }
              })
              .join(' '),
            ...card
          };
        }
      }),
    null,
    '  '
  )
);
