import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuestCard = React.memo(({ quest, onComplete, onDelete }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete(quest.id);
    }, 300);
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-border bg-card rounded-xl">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-400 hover:border-primary transition-colors duration-200 flex items-center justify-center group/checkbox"
            aria-label={`Complete quest: ${quest.title}`}
          >
            <Check className="h-3 w-3 text-gray-400 group-hover/checkbox:text-primary transition-colors duration-200" />
          </button>
          
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className={`font-medium text-sm truncate text-foreground leading-tight transition-all duration-300 ${
              isCompleted ? 'line-through opacity-60' : ''
            }`}>
              {quest.title}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium" style={{ marginTop: '0' }}>
                +{quest.xp} xp
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: quest.difficulty === 'easy' ? 1 : quest.difficulty === 'medium' ? 2 : 3 }).map((_, i) => (
                  <span key={i} className="text-yellow-500 text-xs">⭐</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(quest.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:scale-105 transition-all rounded-md"
              aria-label={`Delete quest: ${quest.title}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

QuestCard.displayName = 'QuestCard';

export default QuestCard;