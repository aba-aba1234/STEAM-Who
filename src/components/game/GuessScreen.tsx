import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles } from 'lucide-react';
import { Character } from '@/data/characters';

interface GuessScreenProps {
  character: Character;
  allCharacters: Character[];
  onConfirm: (isCorrect: boolean, actualCharacter?: Character) => void;
}

export function GuessScreen({ character, allCharacters, onConfirm }: GuessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Thinking animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Sparkles className="w-12 h-12 mx-auto text-primary animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-2xl md:text-3xl font-light text-muted-foreground mb-4"
        >
          Penso che il tuo personaggio sia...
        </motion.h2>

        {/* Character reveal card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          className="glass rounded-3xl p-8 max-w-md mx-auto mb-8 shadow-glow"
        >
          {/* Character image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/50 shadow-lg"
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&size=128&background=7c3aed&color=fff`;
              }}
            />
          </motion.div>

          {/* Character name */}
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2"
          >
            {character.name}
          </motion.h3>

          {/* Character description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-muted-foreground text-lg"
          >
            {character.description}
          </motion.p>

          {/* Field badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium capitalize">
              {character.field === 'science' && '🔬 Scienza'}
              {character.field === 'technology' && '💻 Tecnologia'}
              {character.field === 'engineering' && '⚙️ Ingegneria'}
              {character.field === 'arts' && '🎨 Arte'}
              {character.field === 'mathematics' && '📐 Matematica'}
            </span>
          </motion.div>
        </motion.div>

        {/* Confirmation question */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6"
        >
          Ho indovinato?
        </motion.h3>

        {/* Confirmation buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
        >
          <Button
            onClick={() => onConfirm(true)}
            size="lg"
            className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground py-6 text-lg font-display font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-button"
          >
            <Check className="mr-2" size={22} />
            Sì, esatto!
          </Button>
          <Button
            onClick={() => onConfirm(false)}
            size="lg"
            variant="outline"
            className="flex-1 border-2 border-muted-foreground/50 hover:border-muted-foreground py-6 text-lg font-display font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            <X className="mr-2" size={22} />
            No, sbagliato
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
