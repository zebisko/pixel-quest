import React, { forwardRef, useState } from 'react';
import { Plus, Star, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const QuestForm = forwardRef(({ 
  newQuestTitle, 
  setNewQuestTitle, 
  newQuestDifficulty, 
  setNewQuestDifficulty, 
  onAddQuest, 
  onInputKeyDown 
}, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-0">add new quest</h2>
        <p className="text-sm text-muted-foreground">
          create a task to complete and earn xp
        </p>
      </div>
      
      <Card className="border-border bg-card shadow-sm rounded-2xl">
        {isExpanded && (
          <CardContent className="space-y-3 p-4">
            <div>
              <Input
                id="quest-title"
                ref={ref}
                value={newQuestTitle}
                onChange={(e) => setNewQuestTitle(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="what quest shall you embark on?"
                className="border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
                style={{
                  borderRadius: '6px',
                  fontSize: '20px',
                  height: 'auto',
                  padding: '12px 16px'
                }}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[
                  { value: 'easy', stars: 1, xp: 25 },
                  { value: 'medium', stars: 2, xp: 50 },
                  { value: 'hard', stars: 3, xp: 100 }
                ].map((difficulty, index) => (
                  <button
                    key={difficulty.value}
                    type="button"
                    onClick={() => setNewQuestDifficulty(difficulty.value)}
                    className={`flex items-center justify-center gap-1 h-10 px-4 py-2 text-sm font-medium transition-all border border-black rounded-full hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] ${
                      newQuestDifficulty === difficulty.value
                        ? 'bg-primary text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-black hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none'
                    }`}
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
                disabled={!newQuestTitle.trim()}
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
            className="h-16 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors rounded-t-2xl"
            onClick={() => setIsExpanded(true)}
          >
            <span className="text-sm text-muted-foreground">click to add quest</span>
          </div>
        )}
        
        {/* Collapse bar - only show when expanded */}
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full bg-gray-200 hover:bg-gray-300 transition-colors py-2 px-4 rounded-b-2xl flex items-center justify-center gap-2 text-sm text-gray-600"
          >
            <ChevronUp className="h-4 w-4" />
            <span>collapse</span>
          </button>
        )}
      </Card>
    </div>
  );
});

QuestForm.displayName = 'QuestForm';

export default QuestForm;