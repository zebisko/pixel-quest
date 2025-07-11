import React from 'react';
import { Check, Trash2, Edit, Ban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BORDER_RADIUS, TYPOGRAPHY, ANIMATIONS, ARIA_LABELS } from '../constants/ui.js';

const QuestCard = React.memo(({ quest, onComplete, onDelete, onEdit, onStatusChange }) => {
  const [isCompleted, setIsCompleted] = React.useState(false);

  const COMPLETION_ANIMATION_DELAY = 300;

  const handleComplete = () => {
    // If already completed, don't do anything
    if (quest.status === 'completed') {
      return;
    }
    
    setIsCompleted(true);
    setTimeout(() => {
      onComplete(quest.id);
    }, COMPLETION_ANIMATION_DELAY);
  };

  const handleDelete = () => {
    onDelete(quest.id);
  };

  const handleEdit = () => {
    onEdit(quest.id);
  };

  const handleCancel = () => {
    onStatusChange(quest.id, 'cancelled');
  };

  const getDifficultyStars = (difficulty) => {
    const starCount = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: starCount }).map((_, i) => (
      <span key={i} className="text-yellow-500 text-xs">⭐</span>
    ));
  };

  const getQuestTitleClasses = () => {
    const baseClasses = `font-medium text-sm truncate text-foreground leading-tight transition-all ${ANIMATIONS.TRANSITION_DURATION}`;
    
    if (isCompleted || quest.status === 'completed') {
      return `${baseClasses} line-through opacity-60`;
    }
    
    if (quest.status === 'cancelled') {
      return `${baseClasses}`;
    }
    
    return baseClasses;
  };

  const getQuestTitleStyle = () => {
    if (quest.status === 'cancelled') {
      return {
        textDecoration: 'line-through',
        textDecorationStyle: 'double',
        textDecorationColor: 'rgb(239 68 68)', // red-500
        textDecorationThickness: '2px'
      };
    }
    
    return {};
  };

  return (
    <Card className={`group hover:shadow-md transition-all duration-200 border-border bg-card ${BORDER_RADIUS.MEDIUM}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleComplete}
            className={`flex-shrink-0 w-5 h-5 ${BORDER_RADIUS.FULL} border-2 border-gray-400 hover:border-primary transition-colors duration-200 flex items-center justify-center group/checkbox`}
            aria-label={`${ARIA_LABELS.COMPLETE_QUEST}: ${quest.title}`}
          >
            <Check className="h-3 w-3 text-gray-400 group-hover/checkbox:text-primary transition-colors duration-200" />
          </button>
          
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className={getQuestTitleClasses()} style={getQuestTitleStyle()}>
              {quest.title}
            </h4>
            <div className="flex items-center gap-2">
              <span className={`${TYPOGRAPHY.SMALL_TEXT} text-muted-foreground font-medium`} style={{ marginTop: '0' }}>
                +{quest.xp} xp
              </span>
              <div className="flex items-center gap-0.5">
                {getDifficultyStars(quest.difficulty)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {quest.status !== 'completed' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className={`h-8 w-8 p-0 text-muted-foreground hover:text-red-500 hover:scale-105 transition-all ${BORDER_RADIUS.SMALL}`}
                aria-label={`Cancel quest: ${quest.title}`}
              >
                <Ban className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className={`h-8 w-8 p-0 text-muted-foreground hover:text-primary hover:scale-105 transition-all ${BORDER_RADIUS.SMALL}`}
              aria-label={`Edit quest: ${quest.title}`}
            >
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className={`h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:scale-105 transition-all ${BORDER_RADIUS.SMALL}`}
              aria-label={`${ARIA_LABELS.DELETE_QUEST}: ${quest.title}`}
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