import { useGameEngine } from '@/hooks/useGameEngine';
import { StartScreen } from '@/components/game/StartScreen';
import { QuestionScreen } from '@/components/game/QuestionScreen';
import { GuessScreen } from '@/components/game/GuessScreen';
import { ResultScreen } from '@/components/game/ResultScreen';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const {
    gameState,
    currentQuestion,
    questionIndex,
    remainingCharacters,
    answeredQuestions,
    guessedCharacter,
    correctCharacter,
    allCharacters,
    startGame,
    answerQuestion,
    confirmGuess,
    resetGame,
  } = useGameEngine();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background glow effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StartScreen onStart={startGame} characterCount={allCharacters.length} />
          </motion.div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuestionScreen
              question={currentQuestion}
              questionNumber={questionIndex}
              remainingCount={remainingCharacters.length}
              onAnswer={answerQuestion}
            />
          </motion.div>
        )}

        {gameState === 'guessing' && guessedCharacter && (
          <motion.div
            key="guessing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GuessScreen
              character={guessedCharacter}
              allCharacters={allCharacters}
              onConfirm={confirmGuess}
            />
          </motion.div>
        )}

        {(gameState === 'won' || gameState === 'lost') && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResultScreen
              isWin={gameState === 'won'}
              character={correctCharacter || guessedCharacter}
              questionsCount={answeredQuestions.length}
              onPlayAgain={resetGame}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
