import { CharacterDirector, ConcreteCharacterBuilder, WarriorBuilder } from "./jeu";

const characterDirector = new CharacterDirector(new ConcreteCharacterBuilder());
const warriorDirector = new CharacterDirector(new WarriorBuilder());

const baseElf = characterDirector.createElf().setName('Base Elf');
const warriorElf = warriorDirector.createElf().setName('Warrior Elf');

baseElf.getCharacter().display();
warriorElf.getCharacter().display();