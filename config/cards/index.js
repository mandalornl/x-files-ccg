import premiere from '~/config/cards/premiere.json';
import ttiot from '~/config/cards/ttiot.json';
import mulder from '~/config/cards/101361.json';
import scully from '~/config/cards/22364.json';
import season4 from '~/config/cards/040460.json';
import promo from '~/config/cards/promo.json';
import gencon from '~/config/cards/gencon.json';
import delaney from '~/config/cards/100617.json';
import classified from '~/config/cards/classified.json';
import iWantToBelieve from '~/config/cards/i-want-to-believe.json';
import twinPeaks from '~/config/cards/twin-peaks.json';
import carter from '~/config/cards/101357.json';

export const pool = [
  ...premiere,
  ...ttiot,
  ...mulder,
  ...scully,
  ...season4,
  ...promo,
  ...gencon,
  ...delaney,
  ...classified,
  ...iWantToBelieve,
  ...twinPeaks,
  ...carter
].map((card) => ({
  ...card,
  image: `images/${card.set}/${card.id}.jpg`
    .replaceAll(' ', '-')
    .toLowerCase()
}));
