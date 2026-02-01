import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sparkles, Brain, Lightbulb, Atom } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  characterCount: number;
}

export function StartScreen({ onStart, characterCount }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
    >
      {/* Floating icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-primary/20"
        >
          <Atom size={80} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-20 text-accent/20"
        >
          <Lightbulb size={60} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-20 text-secondary/20"
        >
          <Brain size={70} />
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center z-10"
      >
        {/* Logo/Title */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold text-gradient mb-2">
            STEAM
          </h1>
          <h2 className="font-display text-4xl md:text-6xl font-light text-foreground/90">
            Who?
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-12"
        >
          Pensa a un personaggio famoso del mondo STEAM.
          <br />
          <span className="text-foreground/80">Io indovinerò chi è!</span>
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center gap-8 mb-12"
        >
          <div className="glass rounded-xl px-6 py-4">
            <div className="font-display text-3xl font-bold text-primary">{characterCount}</div>
            <div className="text-sm text-muted-foreground">Personaggi</div>
          </div>
          <div className="glass rounded-xl px-6 py-4">
            <div className="font-display text-3xl font-bold text-accent">Sì/No</div>
            <div className="text-sm text-muted-foreground">Domande</div>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-button px-12 py-6 text-xl font-display font-semibold rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="mr-2" />
            Inizia il Gioco
          </Button>
        </motion.div>

        {/* STEAM explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { letter: 'S', word: 'Science', color: 'bg-blue-500/20 text-blue-400' },
            { letter: 'T', word: 'Technology', color: 'bg-green-500/20 text-green-400' },
            { letter: 'E', word: 'Engineering', color: 'bg-orange-500/20 text-orange-400' },
            { letter: 'A', word: 'Arts', color: 'bg-pink-500/20 text-pink-400' },
            { letter: 'M', word: 'Mathematics', color: 'bg-purple-500/20 text-purple-400' },
          ].map(({ letter, word, color }) => (
            <div
              key={letter}
              className={`${color} px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm`}
            >
              <span className="font-bold">{letter}</span>
              <span className="opacity-80"> - {word}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
