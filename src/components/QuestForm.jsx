import React, { forwardRef, useState } from 'react';
import { Plus, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="border-border bg-card shadow-sm rounded-2xl">
      <CardHeader 
        className="pb-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground mb-0.5">add new quest</CardTitle>
            <CardDescription className="text-sm text-muted-foreground mt-1">
              create a task to complete and earn xp
            </CardDescription>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-3 p-4 pt-0">
      <div>
        <Input
          id="quest-title"
          ref={ref}
          value={newQuestTitle}
          onChange={(e) => setNewQuestTitle(e.target.value)}
          onKeyDown={onInputKeyDown}
          placeholder="what quest shall you embark on?"
          className="h-10 text-sm border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all rounded-lg"
        />
      </div>
      
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <div className="flex border-2 border-black bg-gray-200 p-1 h-10 pixel-group">
            {[
              { value: 'easy', stars: 1, xp: 25 },
              { value: 'medium', stars: 2, xp: 50 },
              { value: 'hard', stars: 3, xp: 100 }
            ].map((difficulty, index) => (
              <button
                key={difficulty.value}
                type="button"
                onClick={() => setNewQuestDifficulty(difficulty.value)}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium transition-all border border-black hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] ${
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
        </div>
        <Button
          onClick={onAddQuest}
          disabled={!newQuestTitle.trim()}
          className="h-10 gap-2 font-medium hover:scale-105 transition-transform disabled:hover:scale-100 rounded-lg"
        >
          <Plus className="h-4 w-4" />
          add quest
        </Button>
      </div>
        </CardContent>
      )}
    </Card>
  );
});

QuestForm.displayName = 'QuestForm';

export default QuestForm;