import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, RefreshCw, Frown, Sparkles } from 'lucide-react';
import { Character } from '@/data/characters';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ResultScreenProps {
  isWin: boolean;
  character: Character | null;
  questionsCount: number;
  onPlayAgain: () => void;
}

export function ResultScreen({ isWin, character, questionsCount, onPlayAgain }: ResultScreenProps) {
  useEffect(() => {
    if (isWin) {
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#7c3aed', '#06b6d4', '#ec4899'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#7c3aed', '#06b6d4', '#ec4899'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [isWin]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        {/* Result icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center ${
            isWin ? 'bg-gradient-primary shadow-glow' : 'bg-muted'
          }`}
        >
          {isWin ? (
            <Trophy className="w-12 h-12 text-primary-foreground" />
          ) : (
            <Frown className="w-12 h-12 text-muted-foreground" />
          )}
        </motion.div>

        {/* Result text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-4xl md:text-5xl font-bold mb-4"
        >
          {isWin ? (
            <span className="text-gradient">Ho Indovinato!</span>
          ) : (
            <span className="text-muted-foreground">Non ho indovinato</span>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-muted-foreground mb-8"
        >
          {isWin
            ? `Ho trovato il personaggio in ${questionsCount} domande!`
            : 'Mi hai battuto questa volta... riproverò!'}
        </motion.p>

        {/* Character card */}
        {character && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 flex-shrink-0">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(character.name)}&size=80&background=7c3aed&color=fff`;
                  }}
                />
              </div>
              <div className="text-left">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {character.name}
                </h3>
                <p className="text-sm text-muted-foreground">{character.description}</p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium capitalize">
                  {character.field === 'science' && '🔬 Scienza'}
                  {character.field === 'technology' && '💻 Tecnologia'}
                  {character.field === 'engineering' && '⚙️ Ingegneria'}
                  {character.field === 'arts' && '🎨 Arte'}
                  {character.field === 'mathematics' && '📐 Matematica'}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Play again button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-10 py-6 text-lg font-display font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-button"
          >
            <RefreshCw className="mr-2" size={22} />
            Gioca Ancora
          </Button>
        </motion.div>

        {/* Fun facts */}
        {isWin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex items-center justify-center gap-2 text-muted-foreground"
          >
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm">La mente artificiale ringrazia per aver giocato!</span>
            <Sparkles size={16} className="text-primary" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
