import React, { forwardRef, useState } from 'react';
import { Plus, Star, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { 
  DIFFICULTY_LEVELS, 
  INPUT_STYLES, 
  QUEST_FORM_MESSAGES, 
  BORDER_RADIUS, 
  SPACING, 
  BUTTON_GROUP 
} from '../constants/ui.js';

const QuestForm = forwardRef(({ 
  newQuestTitle, 
  setNewQuestTitle, 
  newQuestDifficulty, 
  setNewQuestDifficulty, 
  onAddQuest, 
  onInputKeyDown 
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    
    // Auto-focus input when expanding
    if (newExpanded) {
      setTimeout(() => {
        ref.current?.focus();
      }, 100); // Small delay to ensure DOM update
    }
  };
  
  const isQuestTitleValid = newQuestTitle.trim().length > 0;

  // Helper function to get button styling following Clean Code principles
  const getDifficultyButtonClasses = (difficulty, index) => {
    const isSelected = newQuestDifficulty === difficulty.value;
    const isFirst = index === 0;
    const isLast = index === DIFFICULTY_LEVELS.length - 1;
    
    let borderRadius = BORDER_RADIUS.NONE;
    if (isFirst) borderRadius = BORDER_RADIUS.LEFT_ONLY;
    if (isLast) borderRadius = BORDER_RADIUS.RIGHT_ONLY;
    
    return cn(
      BUTTON_GROUP.BASE,
      BUTTON_GROUP.HOVER,
      borderRadius,
      isSelected ? BUTTON_GROUP.SELECTED : BUTTON_GROUP.NOT_SELECTED
    );
  };

  return (
    <div className="space-y-3">
      <div className={SPACING.LEFT_PADDING_SMALL}>
        <h2 className="text-lg font-semibold text-foreground mb-0">{QUEST_FORM_MESSAGES.TITLE}</h2>
        <p className="text-sm text-muted-foreground">
          {QUEST_FORM_MESSAGES.DESCRIPTION}
        </p>
      </div>
      
      <Card className={`border-border bg-card shadow-sm ${BORDER_RADIUS.LARGE}`}>
        {isExpanded && (
          <CardContent className={`space-y-3 ${SPACING.CARD_PADDING}`}>
            <div>
              <Input
                id="quest-title"
                ref={ref}
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder={QUEST_FORM_MESSAGES.PLACEHOLDER}
                className="border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                style={{
                  borderRadius: INPUT_STYLES.BORDER_RADIUS,
                  fontSize: INPUT_STYLES.FONT_SIZE,
                  height: INPUT_STYLES.HEIGHT,
                  padding: INPUT_STYLES.PADDING
                }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className={cn(
                BUTTON_GROUP.CONTAINER,
                BUTTON_GROUP.HEIGHT,
                SPACING.BUTTON_GROUP_PADDING,
                BORDER_RADIUS.SMALL
              )}>
                {DIFFICULTY_LEVELS.map((difficulty, index) => (
                  <button
                    key={difficulty.value}
                    type="button"
                    onClick={() => setNewQuestDifficulty(difficulty.value)}
                    className={getDifficultyButtonClasses(difficulty, index)}
                  >
                    <div className="flex">
                      {Array.from({ length: difficulty.stars }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                    <span>{difficulty.xp} xp</span>
                  </button>
                ))}
              </div>
              <Button
                onClick={onAddQuest}
                disabled={!isQuestTitleValid}
                className="h-10 px-4 py-2 gap-2 font-medium hover:scale-105 transition-transform disabled:hover:scale-100"
              >
                <Plus className="h-4 w-4" />
                add quest
              </Button>
            </div>
          </CardContent>
        )}
        
        {/* Collapsed state - clickable area */}
        {!isExpanded && (
          <div 
            className={`h-16 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${BORDER_RADIUS.LARGE}`}
            onClick={handleToggleExpansion}
          >
            <span className="text-sm text-muted-foreground">{QUEST_FORM_MESSAGES.CLICK_TO_ADD}</span>
          </div>
        )}
        
        {/* Collapse bar - only show when expanded */}
        {isExpanded && (
          <button
            onClick={handleToggleExpansion}
            className={`w-full bg-gray-200 hover:bg-gray-300 transition-colors py-2 px-4 ${BORDER_RADIUS.BOTTOM_ONLY_LARGE} flex items-center justify-center gap-2 text-sm text-gray-600`}
          >
            <ChevronUp className="h-4 w-4" />
            <span>{QUEST_FORM_MESSAGES.COLLAPSE}</span>
          </button>
        )}
      </Card>
    </div>
  );
});

QuestForm.displayName = 'QuestForm';

export default QuestForm;