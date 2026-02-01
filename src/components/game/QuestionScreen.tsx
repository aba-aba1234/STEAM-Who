import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, HelpCircle, Users } from 'lucide-react';
import { Question } from '@/data/characters';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  remainingCount: number;
  onAnswer: (answer: boolean) => void;
}

export function QuestionScreen({
  question,
  questionNumber,
  remainingCount,
  onAnswer,
}: QuestionScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-6"
      >
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
          <HelpCircle size={18} className="text-primary" />
          <span className="text-sm font-medium">Domanda {questionNumber}</span>
        </div>
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
          <Users size={18} className="text-accent" />
          <span className="text-sm font-medium">{remainingCount} possibili</span>
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-2xl w-full shadow-glow"
        >
          {/* Question icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center"
          >
            <HelpCircle size={32} className="text-primary-foreground" />
          </motion.div>

          {/* Question text */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-display text-2xl md:text-3xl font-semibold text-center mb-10 text-foreground"
          >
            {question.text}
          </motion.h2>

          {/* Answer buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => onAnswer(true)}
              size="lg"
              className="flex-1 bg-success/20 hover:bg-success/30 text-success border-2 border-success/50 hover:border-success py-6 text-xl font-display font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Check className="mr-2" size={24} />
              Sì
            </Button>
            <Button
              onClick={() => onAnswer(false)}
              size="lg"
              className="flex-1 bg-destructive/20 hover:bg-destructive/30 text-destructive border-2 border-destructive/50 hover:border-destructive py-6 text-xl font-display font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <X className="mr-2" size={24} />
              No
            </Button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Thinking animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-2 text-muted-foreground"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Sto analizzando...
        </motion.span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
