export interface PhonicsLetter {
  letter: string;
  word: string;
  sound: string;
  color: string;
  image?: string;
}

export const ALPHABET_DATA: PhonicsLetter[] = [
  { letter: "A", word: "Apple", sound: "ah", color: "#FF6B6B" },
  { letter: "B", word: "Ball", sound: "buh", color: "#4DABF7" },
  { letter: "C", word: "Cake", sound: "cuh", color: "#51CF66" },
  { letter: "D", word: "Dog", sound: "duh", color: "#FF922B" },
  { letter: "E", word: "Egg", sound: "eh", color: "#FCC419" },
  { letter: "F", word: "Fish", sound: "fuh", color: "#845EF7" },
  { letter: "G", word: "Goat", sound: "guh", color: "#20C997" },
  { letter: "H", word: "Hat", sound: "huh", color: "#FF8787" },
  { letter: "I", word: "Igloo", sound: "ih", color: "#339AF0" },
  { letter: "J", word: "Jam", sound: "juh", color: "#FFD43B" },
  { letter: "K", word: "Kite", sound: "kuh", color: "#94D82D" },
  { letter: "L", word: "Lion", sound: "luh", color: "#FAB005" },
  { letter: "M", word: "Moon", sound: "muh", color: "#E599F7" },
  { letter: "N", word: "Nose", sound: "nuh", color: "#B197FC" },
  { letter: "O", word: "Octopus", sound: "ah", color: "#FFA94D" },
  { letter: "P", word: "Pig", sound: "puh", color: "#FF8EBB" },
  { letter: "Q", word: "Queen", sound: "kwuh", color: "#748FFC" },
  { letter: "R", word: "Rabbit", sound: "ruh", color: "#FF6B6B" },
  { letter: "S", word: "Sun", sound: "suh", color: "#FFD43B" },
  { letter: "T", word: "Tiger", sound: "tuh", color: "#FD7E14" },
  { letter: "U", word: "Umbrella", sound: "uh", color: "#BE4BDB" },
  { letter: "V", word: "Van", sound: "vuh", color: "#12B886" },
  { letter: "W", word: "Watch", sound: "wuh", color: "#228BE6" },
  { letter: "X", word: "Xylophone", sound: "ksuh", color: "#B197FC" },
  { letter: "Y", word: "Yo-yo", sound: "yuh", color: "#FFD43B" },
  { letter: "Z", word: "Zebra", sound: "zuh", color: "#495057" },
];
