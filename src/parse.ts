type operator = (x: number, y: number) => number;
type tree = {
  operators: operator[],
  dice: (Die | number)[],
  operatorsText: string[],
}
const add = (x: number, y: number) => x + y;
const subtract = (x: number, y: number) => x - y;

export class Die {
  public sides: number;
  constructor(sides: number | string) {
    if (typeof sides === 'string') {
      this.sides = parseInt(sides, 10);
    } else {
      this.sides = sides;
    }
  }

  roll() {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}

export function parseDiceString(diceString: string) {
  let tree: tree = {
    operators: [],
    dice: [],
    operatorsText: [],
  }

  if (!diceString) {
    return tree;
  }

  tree = diceString.replace(/\s/g, '')
    .split(/([\+-])/)
    .reduce((tree, curr) => {
      if (curr === '+') {
        tree.operators.push(add);
        tree.operatorsText.push('+');
      } else if (curr === '-') {
        tree.operators.push(subtract);
        tree.operatorsText.push('-');
      } else if (curr.indexOf('d') === -1 && parseInt(curr, 10)) {
        tree.dice.push(parseInt(curr, 10));
      } else if (curr.indexOf('d') !== 0) {
        const [numDice, sides] = curr.split('d');
        const operator = tree.operators[tree.operators.length - 1] || add;
        for (var i = 0; i<parseInt(numDice, 10); i++) {
          tree.dice.push(new Die(sides));
          if (i !== 0) {
            tree.operators.push(operator);
            tree.operatorsText.push(operator === add ? '+' : '-');
          }
        }
      } else if (curr.indexOf('d') === 0) {
        tree.dice.push(new Die(curr.slice(1)));
      } else {
        throw new Error(`BAD DICE STRING ${diceString} ${curr}`);
      }
      
      if (tree.operators.length < tree.dice.length) {
        tree.operators.push(add);
        tree.operatorsText.push('+');
      }

      return tree;
    }, tree);

  return tree; 
}

export function rollDice({dice, operators, operatorsText}: tree) {
  return dice
    .map((d) => typeof d === 'number' ? d : d.roll())
    .reduce(({sum, text}, roll, i) => {
      return {
        sum: operators[i](sum,roll),
        text: `${text} ${i === 0 ? '' : operatorsText[i]} ${roll}`
      }
    }, {sum: 0, text: ''});
}
