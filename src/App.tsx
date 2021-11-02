import React, {useState} from "react"
import {useImmer} from "use-immer";
import {
  ChakraProvider,
  Box,
  Center,
  Text,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Select,
  theme,
} from "@chakra-ui/react"
import {
  Dice,
  Roll,
  rollDiceSet,
} from './die';

function expandRoll({rolls}: Roll): string {
  return `${rolls.join('+')}`;
}

const DiceSection = ({
  quantity,
  modifier,
  sides,
  updateDice,
}: {
  quantity: number,
  modifier: number,
  sides: number,
  updateDice: (dice: Dice) => void
}) => {
  return    <>
  <Flex>
            <FormControl id="#OfDice" flex="4">
              <FormLabel># Of Dice</FormLabel>
              <Input value={quantity} onChange={({target: {value}}) => 
                updateDice({
                  modifier,
                  sides,
                  quantity: parseInt(value, 10) || 0,
                })}
              />
            </FormControl>
            <Box flex="1" />
            <FormControl id="type" flex="4">
              <FormLabel>Type</FormLabel>
              <Select value={sides} onChange={({target: {value}}) => 
                updateDice({
                  modifier,
                  sides: parseInt(value, 10) || 0,
                  quantity,
                })}
              >

                <option value="4">D4</option>
                <option value="6">D6</option>
                <option value="8">D8</option>
                <option value="10">D10</option>
                <option value="12">D12</option>
                <option value="20">D20</option>
                <option value="100">D100</option>
              </Select>
            </FormControl>
            <Box flex="1" />
            <FormControl id="modifier" flex="4">
              <FormLabel>Modifier</FormLabel>
              <Input value={modifier} onChange={({target: {value}}) => 
                updateDice({
                  modifier: parseInt(value, 10) || 0,
                  sides,
                  quantity,
                })}
              />
            </FormControl>
          </Flex>
          {/*
          <RadioGroup marginY={2} name="form-name">
            <Flex>
              <Radio flex="1"><Text fontSize="xs">Advantage</Text></Radio>
              <Radio flex="1"><Text fontSize="xs">Disadvantage</Text></Radio>
              <Radio flex="1"><Text fontSize="xs">Flat</Text></Radio>
            </Flex>
          </RadioGroup>
          */}
          </>
}

const defaultDice = {
    sides: 4,
    quantity: 1,
    modifier: 0,
};

export const App = () => {
  const [diceSet, setDice] = useImmer<Dice[]>([defaultDice]);
  const [rolls, setRolls] = useState<Roll[][]>([]);
  return <ChakraProvider theme={theme}>
    <Center>
        <Grid p={4} gridRowGap={4}>
    <form onSubmit={e => {
      e.preventDefault();
      setDice([defaultDice]);
      setRolls([rollDiceSet(diceSet), ...rolls]);
    }}>
      {diceSet.map((dice, i) => {
        return <DiceSection {...dice} updateDice={(dice: Dice) => setDice(draft => {
          draft[i] = dice;
          return draft;
        })} />
      })}
      <Flex marginTop={2}>
        <Button flex="3" onClick={() => setDice(draft => {draft.push(defaultDice)})}>Add More Dice</Button>
        <Box flex="1" />
        <Button flex="3" type="submit">Roll!</Button>
      </Flex>
      </form>
      <Flex border="1px solid #7C7C7C" p={4} w="100%" direction="column">
        {rolls.map((rolls, i) => (
          <Box w="100%" key={i}>
            <Text>
              {rolls.map(({string}) => string).join(' + ')} =
              {rolls.reduce((total, {sum}) => total + sum, 0)}
            </Text>
            <Text fontSize="xs" mt="-1">({rolls.map(expandRoll).join(' | ')})</Text>
          </Box>
        ))}
      </Flex>
        </Grid>
    </Center>
  </ChakraProvider>
}
