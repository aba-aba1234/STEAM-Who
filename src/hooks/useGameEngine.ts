import { useState, useCallback, useMemo } from 'react';
import { characters, questions, Character, Question } from '@/data/characters';

export type GameState = 'start' | 'playing' | 'guessing' | 'won' | 'lost';

export interface GameEngineState {
  gameState: GameState;
  currentQuestion: Question | null;
  questionIndex: number;
  remainingCharacters: Character[];
  answeredQuestions: { question: Question; answer: boolean }[];
  guessedCharacter: Character | null;
  correctCharacter: Character | null;
}

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [remainingCharacters, setRemainingCharacters] = useState<Character[]>(characters);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ question: Question; answer: boolean }[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  const [guessedCharacter, setGuessedCharacter] = useState<Character | null>(null);
  const [correctCharacter, setCorrectCharacter] = useState<Character | null>(null);

  // Find the best next question that maximizes information gain
  const findBestQuestion = useCallback((chars: Character[], usedIds: Set<string>): Question | null => {
    const availableQuestions = questions.filter(q => !usedIds.has(q.id));
    
    if (availableQuestions.length === 0) return null;

    let bestQuestion: Question | null = null;
    let bestScore = -1;

    for (const question of availableQuestions) {
      const yesCount = chars.filter(char => {
        if (typeof question.attribute === 'function') {
          return question.attribute(char);
        }
        return char[question.attribute as keyof Character] === question.expectedValue;
      }).length;

      const noCount = chars.length - yesCount;
      
      // Score based on how balanced the split is (closer to 50-50 is better)
      const balance = Math.min(yesCount, noCount);
      
      // Also consider if this question eliminates at least some characters
      if (balance > bestScore && yesCount > 0 && noCount > 0) {
        bestScore = balance;
        bestQuestion = question;
      }
    }

    // If no balanced question found, pick any that can eliminate something
    if (!bestQuestion && availableQuestions.length > 0) {
      for (const question of availableQuestions) {
        const yesCount = chars.filter(char => {
          if (typeof question.attribute === 'function') {
            return question.attribute(char);
          }
          return char[question.attribute as keyof Character] === question.expectedValue;
        }).length;

        if (yesCount > 0 && yesCount < chars.length) {
          return question;
        }
      }
      return availableQuestions[0];
    }

    return bestQuestion;
  }, []);

  const currentQuestion = useMemo(() => {
    if (gameState !== 'playing') return null;
    return findBestQuestion(remainingCharacters, usedQuestionIds);
  }, [gameState, remainingCharacters, usedQuestionIds, findBestQuestion]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setRemainingCharacters(characters);
    setAnsweredQuestions([]);
    setUsedQuestionIds(new Set());
    setGuessedCharacter(null);
    setCorrectCharacter(null);
  }, []);

  const answerQuestion = useCallback((answer: boolean) => {
    if (!currentQuestion) return;

    const newRemaining = remainingCharacters.filter(char => {
      let matches: boolean;
      if (typeof currentQuestion.attribute === 'function') {
        matches = currentQuestion.attribute(char);
      } else {
        matches = char[currentQuestion.attribute as keyof Character] === currentQuestion.expectedValue;
      }
      return answer ? matches : !matches;
    });

    setAnsweredQuestions(prev => [...prev, { question: currentQuestion, answer }]);
    setUsedQuestionIds(prev => new Set([...prev, currentQuestion.id]));
    setRemainingCharacters(newRemaining);

    // Decision logic
    if (newRemaining.length === 1) {
      // Only one character left, make a guess
      setGuessedCharacter(newRemaining[0]);
      setGameState('guessing');
    } else if (newRemaining.length === 0) {
      // No characters match - shouldn't happen with good data
      setGameState('lost');
    } else if (answeredQuestions.length >= 10 || !findBestQuestion(newRemaining, new Set([...usedQuestionIds, currentQuestion.id]))) {
      // After 10 questions or no more useful questions, make best guess
      setGuessedCharacter(newRemaining[0]);
      setGameState('guessing');
    }
  }, [currentQuestion, remainingCharacters, answeredQuestions, usedQuestionIds, findBestQuestion]);

  const confirmGuess = useCallback((isCorrect: boolean, actualCharacter?: Character) => {
    if (isCorrect) {
      setCorrectCharacter(guessedCharacter);
      setGameState('won');
    } else {
      setCorrectCharacter(actualCharacter || null);
      setGameState('lost');
    }
  }, [guessedCharacter]);

  const resetGame = useCallback(() => {
    setGameState('start');
    setRemainingCharacters(characters);
    setAnsweredQuestions([]);
    setUsedQuestionIds(new Set());
    setGuessedCharacter(null);
    setCorrectCharacter(null);
  }, []);

  return {
    gameState,
    currentQuestion,
    questionIndex: answeredQuestions.length + 1,
    remainingCharacters,
    answeredQuestions,
    guessedCharacter,
    correctCharacter,
    allCharacters: characters,
    startGame,
    answerQuestion,
    confirmGuess,
    resetGame,
  };
}
