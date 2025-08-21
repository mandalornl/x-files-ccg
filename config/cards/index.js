import premiere from '~/config/cards/premiere.json';
import theTruthIsOutThere from '~/config/cards/the-truth-is-out-there.json';
import mulder from '~/config/cards/101361.json';
import scully from '~/config/cards/22364.json';
import believeTheLie from '~/config/cards/believe-the-lie.json';
import promo from '~/config/cards/promo.json';
import gencon from '~/config/cards/gencon.json';
import fightTheFuture from '~/config/cards/fight-the-future.json';
import hereThereBeMonsters from '~/config/cards/here-there-be-monsters.json';
import classified from '~/config/cards/classified.json';
import iWantToBelieve from '~/config/cards/i-want-to-believe.json';
import myStruggle from '~/config/cards/my-struggle.json';
import fireWalkWithMe from '~/config/cards/fire-walk-with-me.json';

const getImageUrl = (card) => {
  if (card.set === 'Classified' || card.set === 'Fight the Future') {
    return 'images/back.jpg'
  }

  return `images/${card.set}/${card.id}.jpg`
    .replaceAll(' ', '-')
    .toLowerCase();
};

export const pool = [
  ...premiere,
  ...theTruthIsOutThere,
  ...mulder,
  ...scully,
  ...believeTheLie,
  ...promo,
  ...gencon,
  ...fightTheFuture,
  ...hereThereBeMonsters,
  ...classified,
  ...iWantToBelieve,
  ...myStruggle,
  ...fireWalkWithMe
].map((card) => ({
  ...card,
  image: getImageUrl(card)
}));
