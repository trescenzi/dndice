import './style.css'
import { parseDiceString, rollDice } from './parse';


// add the ids we know exist onto the window type
declare global {
  interface Window {
    roll_form: HTMLFormElement;
    die: HTMLInputElement;
    rolls: HTMLUListElement;
    result: HTMLDivElement;
    result_container: HTMLDivElement;
  }
}
const form = window.roll_form;
const input = window.die;
const rolls = window.rolls;
const result = window.result;
const resultContainer = window.result_container;

function createRollItem({sum, text}: {sum: number, text: string}) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  const sm = document.createElement('small');
  sm.innerText = text;
  p.innerText = `${sum}`;
  p.appendChild(sm);
  li.appendChild(p);
  result.innerText = `${sum}`;
  resultContainer.classList.toggle('good', sum > 15);
  resultContainer.classList.toggle('bad', sum < 6);
  return li;
}

form.onsubmit = function(e) {
  e.preventDefault();
  const parsed = parseDiceString(input.value);
  const result = rollDice(parsed);
  if (rolls.children.length > 9) {
    rolls.removeChild(rolls.children[9]);
  }
  rolls.prepend(createRollItem(result));
}

