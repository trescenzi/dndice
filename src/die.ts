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
}
export class Dice {
  private dice: Die[];

  constructor(private sides: number, private quantity: number, private modifier: number) {
    this.dice = Array.from(Array(quantity), () => new Die(sides));
  }

  roll(): Roll {
    const rolls = this.dice.map(die => die.roll());

    return {
      rolls,
      modifier: this.modifier,
      string: this.toString(),
      sum: rolls.reduce((sum, x) => sum + x) + this.modifier,
    }
  }

  toString(): string {
    const modifierString = this.modifier !== 0 ? this.modifier > 0 ? `+${this.modifier}` : `${this.modifier}` : '';
    return `${this.quantity}D${this.sides} ${modifierString}`;
  }
}
