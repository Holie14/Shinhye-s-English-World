
export interface Story {
  title: string;
  content: string[]; // Divided into pages for long stories
  emoji: string;
  type: "short" | "long";
  quiz: {
    question: string;
    options: string[];
    answer: string;
  };
}

export const STORIES_DATA: Story[] = [
  {
    title: "The Friendly Kitty",
    content: ["The kitty is on the mat.", "The kitty has a red hat.", "The kitty is happy."],
    emoji: "🐱",
    type: "short",
    quiz: {
      question: "Where is the kitty?",
      options: ["Mat", "Box", "Car"],
      answer: "Mat"
    }
  },
  {
    title: "Sun and Fun",
    content: ["The sun is hot.", "I see a big dog.", "The dog is in the sun."],
    emoji: "☀️",
    type: "short",
    quiz: {
      question: "The ___ is hot.",
      options: ["Ice", "Sun", "Hat"],
      answer: "Sun"
    }
  },
  {
    title: "The Blue Bird",
    content: ["I see a blue bird.", "The bird is in the tree.", "The bird sings a song."],
    emoji: "🐦",
    type: "short",
    quiz: {
      question: "Where is the bird?",
      options: ["Tree", "House", "Lake"],
      answer: "Tree"
    }
  },
  {
    title: "Lost in the Woods",
    content: [
      "Once there was a little bear named Teddy.",
      "Teddy loved to walk in the big green woods.",
      "But one day, Teddy found a shiny blue rock.",
      "He followed the rock and got very lost!",
      "He saw a wise owl in a tall pine tree.",
      "The owl said, 'Follow the silver river home.'",
      "Teddy found the river and skipped all the way back."
    ],
    emoji: "🧸",
    type: "long",
    quiz: {
      question: "What did Teddy find?",
      options: ["A Bone", "A Blue Rock", "A Red Hat"],
      answer: "A Blue Rock"
    }
  },
  {
    title: "Shinhye's Space Trip",
    content: [
      "Shinhye put on her shiny silver space suit.",
      "She hopped into a fast rocket ship! 3, 2, 1, Blast off!",
      "She flew past the moon and saw many bright stars.",
      "Shinhye met a friendly green alien named Zog.",
      "They danced on the rings of Saturn together.",
      "Then Shinhye shared her space cookies with Zog.",
      "It was the best space trip ever!"
    ],
    emoji: "🚀",
    type: "long",
    quiz: {
      question: "Who did Shinhye meet?",
      options: ["A Dog", "A Green Alien", "A Robot"],
      answer: "A Green Alien"
    }
  },
  {
    title: "The Magic Garden",
    content: [
      "In the magic garden, flowers can sing songs.",
      "Shinhye found a rose that sang a happy tune.",
      "She watered the flowers with a golden can.",
      "A butterfly landed on her nose and giggled!",
      "The grass was as soft as a cozy blanket.",
      "Large trees gave her shade and sweet apples.",
      "Every day is a party in the magic garden."
    ],
    emoji: "🌻",
    type: "long",
    quiz: {
      question: "What did the flowers do?",
      options: ["They Slept", "They Sang", "They Ran"],
      answer: "They Sang"
    }
  },
  {
    title: "Underwater Party",
    content: [
      "Deep in the ocean, a dolphin invited Shinhye to a party.",
      "She wore a special bubble hat to breathe underwater.",
      "A friendly crab showed her the way to the coral castle.",
      "There were glowing jellyfish that looked like lanterns.",
      "The fish were playing tag near the giant seaweed.",
      "Shinhye danced with a seahorse and ate star-shaped snacks.",
      "The ocean is full of wonder and hidden friends!"
    ],
    emoji: "🐬",
    type: "long",
    quiz: {
      question: "What did the jellyfish look like?",
      options: ["Apples", "Lanterns", "Balls"],
      answer: "Lanterns"
    }
  },
  {
    title: "The Tiny Robot",
    content: [
      "Shinhye found a tiny robot in her toy box.",
      "She pressed a yellow button and it started to beep!",
      "The robot's name was Roby, and he loved to clean.",
      "Roby helped Shinhye put away all her blocks and books.",
      "Then Roby did a funny robot dance on the desk.",
      "Shinhye gave Roby a small battery for a snack.",
      "Now, cleaning is Shinhye's favorite thing to do!"
    ],
    emoji: "🤖",
    type: "long",
    quiz: {
      question: "What did Shinhye give Roby?",
      options: ["A Cake", "A Battery", "A Hug"],
      answer: "A Battery"
    }
  },
  {
    title: "The Red Car",
    content: ["Look at the car.", "The car is red.", "The car goes fast!"],
    emoji: "🚗",
    type: "short",
    quiz: {
      question: "The car is ___.",
      options: ["Blue", "Red", "Green"],
      answer: "Red"
    }
  },
  {
    title: "Pink Piggy",
    content: ["The pig is pink.", "The pig is big.", "The pig plays in mud."],
    emoji: "🐷",
    type: "short",
    quiz: {
      question: "What color is the pig?",
      options: ["Pink", "Grey", "Black"],
      answer: "Pink"
    }
  },
  {
    title: "Ice Cream Shop",
    content: ["I like ice cream.", "I want a big cone.", "It is a sweet treat."],
    emoji: "🍦",
    type: "short",
    quiz: {
      question: "The ice cream is ___.",
      options: ["Sour", "Sweet", "Hot"],
      answer: "Sweet"
    }
  }
];
