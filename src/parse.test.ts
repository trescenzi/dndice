import { expect, test } from 'vitest'
import { parseDiceString, Die } from './parse'

test('it works with just a number', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('2');
  expect(dice.length).toBe(1);
  expect(dice[0]).toBe(2);
  expect(operatorsText).toEqual(['+']);
  expect(operators.length).toEqual(1);
});

test('it works with just a die', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('d6');
  expect(dice.length).toBe(1);
  expect(dice[0]).toBeInstanceOf(Die);
  expect((<Die>dice[0]).sides).toBe(6);
  expect(operatorsText).toEqual(['+']);
  expect(operators.length).toEqual(1);
});

test('it works with a die and a number', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('d6 + 1');
  expect(dice.length).toBe(2);
  expect(dice[0]).toBeInstanceOf(Die);
  expect((<Die>dice[0]).sides).toBe(6);
  expect(dice[1]).toBe(1);
  expect(operatorsText).toEqual(['+', '+']);
  expect(operators.length).toEqual(2);
});

test('it works with a multiple dice of the same kind', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('3d6');
  expect(dice.length).toBe(3);
  expect(dice[0]).toBeInstanceOf(Die);
  expect((<Die>dice[0]).sides).toBe(6);
  expect(dice[1]).toBeInstanceOf(Die);
  expect((<Die>dice[1]).sides).toBe(6);
  expect(operatorsText).toEqual(['+', '+', '+']);
  expect(operators.length).toEqual(3);
});

test('it works with a multiple dice of different kinds', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('d4 + 3d6');
  expect(dice.length).toBe(4);
  expect(dice[0]).toBeInstanceOf(Die);
  expect((<Die>dice[0]).sides).toBe(4);
  expect(dice[1]).toBeInstanceOf(Die);
  expect((<Die>dice[1]).sides).toBe(6);
  expect(operatorsText).toEqual(['+', '+', '+', '+']);
  expect(operators.length).toEqual(4);
});

test('it works with subtraction', () => {
  const {
    operators,
    dice,
    operatorsText
  } = parseDiceString('d4 - 2d6 + d20 + 1');
  expect(dice.length).toBe(5);
  expect(dice[0]).toBeInstanceOf(Die);
  expect((<Die>dice[0]).sides).toBe(4);
  expect(dice[1]).toBeInstanceOf(Die);
  expect((<Die>dice[1]).sides).toBe(6);
  expect(dice[3]).toBeInstanceOf(Die);
  expect((<Die>dice[3]).sides).toBe(20);
  expect(dice[4]).toBe(1);
  expect(operatorsText).toEqual(['+', '-', '-', '+', '+']);
  expect(operators.length).toEqual(5);
});
