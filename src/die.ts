class Die {
  constructor(private sides: number) {}

  roll() {
    return Math.ceil(Math.random() * this.sides);
  }
}

export type Roll = {
  rolls: number[];
  modifier: number;
  sum: number;
  string: string;
};

export type Dice = {
  sides: number;
  quantity: number;
  modifier: number;
  advantage?: boolean;
  disadvantage? : boolean;
}

export function rollDice(dice: Dice) : Roll {
  const rolls = Array.from(Array(dice.quantity), () => Math.ceil(Math.random() * dice.sides));
  return {
    rolls,
    modifier: dice.modifier,
    sum: rolls.reduce((sum, x) => x + sum) + dice.modifier,
    string: diceToString(dice),
  }
}

export function diceToString({modifier, sides, quantity}: Dice): string {
  const modifierString = modifier !== 0 ? modifier > 0 ? `+${modifier}` : `${modifier}` : '';
  return `${quantity}D${sides} ${modifierString}`;
}

export function updateDiceSides(dice: Dice, sides: number): Dice {
  return {
    ...dice,
    sides: sides,
  }
}

export function updateDiceQuantity(dice: Dice, quantity: number): Dice {
  return {
    ...dice,
    quantity: quantity,
  }
}

export function updateDiceModifier(dice: Dice, modifier: number): Dice {
  return {
    ...dice,
    modifier: modifier,
  }
}

export function updateDiceAdvantage(dice: Dice, advantage: boolean): Dice {
  return {
    ...dice,
    advantage: advantage,
  }
}

export function updateDiceDisadvantage(dice: Dice, disadvantage: boolean): Dice {
  return {
    ...dice,
    disadvantage: disadvantage,
  }
}
