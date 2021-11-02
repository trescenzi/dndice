import React, {useState} from "react"
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
import {Dice, Roll} from './die';

function expandRoll({rolls}: Roll): string {
  return `${rolls.join('+')}`;
}

export const App = () => {
  const [{
    numberOfDice,
    type,
    modifier,
  }, setState] = useState({numberOfDice: 1, type: 4, modifier: 0});
  const [rolls, setRolls] = useState<Roll[]>([]);
  return <ChakraProvider theme={theme}>
    <Center>
        <Grid p={4} gridRowGap={4}>
    <form onSubmit={e => {
      e.preventDefault();
      const dice = new Dice(type, numberOfDice, modifier);
      setRolls([dice.roll(), ...rolls]);
    }}>
          <Flex>
            <FormControl id="#OfDice" flex="4">
              <FormLabel># Of Dice</FormLabel>
              <Input value={numberOfDice} onChange={({target: {value}}) => setState({
                numberOfDice: parseInt(value),
                modifier,
                type,
              })}
/>
            </FormControl>
            <Box flex="1" />
            <FormControl id="type" flex="4">
              <FormLabel>Type</FormLabel>
              <Select value={type} onChange={({target: {value}}) => setState({
                numberOfDice,
                modifier,
                type: parseInt(value),
              })} >
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
              <Input number={modifier} onChange={({target: {value}}) => setState({
                numberOfDice,
                modifier: parseInt(value) || 0,
                type,
              })}
            />
            </FormControl>
          </Flex>
          <Box paddingTop={2}>
            <Button w="100%" type="submit">Roll!</Button>
          </Box>
      </form>
      <Flex border="1px solid #7C7C7C" p={4} w="100%" direction="column">
        {rolls.map((roll, i) => (
          <Box w="100%" key={i}>
            <Text>{roll.string} = {roll.sum}</Text>
            <Text fontSize="xs" mt="-1">({expandRoll(roll)})</Text>
          </Box>
        ))}
      </Flex>
        </Grid>
    </Center>
  </ChakraProvider>
}
