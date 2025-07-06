import React, { forwardRef } from 'react';
import { Plus } from 'lucide-react';
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
}, ref) => (
  <Card className="border-border bg-card shadow-sm rounded-2xl">
    <CardHeader className="pb-3 p-4">
      <CardTitle className="text-lg font-semibold text-foreground mb-0.5">add new quest</CardTitle>
      <CardDescription className="text-sm text-muted-foreground">
        create a task to complete and earn xp
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-3 p-4 pt-0">
      <div className="space-y-0.5">
        <label className="text-sm font-medium text-muted-foreground" htmlFor="quest-title">
          quest description
        </label>
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
      
      <div className="flex gap-3">
        <div className="flex-1 space-y-0.5">
          <label className="text-sm font-medium text-muted-foreground" htmlFor="quest-difficulty">
            difficulty
          </label>
          <select
            id="quest-difficulty"
            value={newQuestDifficulty}
            onChange={(e) => setNewQuestDifficulty(e.target.value)}
            className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary/20 transition-all"
          >
            <option value="easy">⭐ easy (25 xp)</option>
            <option value="medium">⭐⭐ medium (50 xp)</option>
            <option value="hard">⭐⭐⭐ hard (100 xp)</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={onAddQuest}
            disabled={!newQuestTitle.trim()}
            className="h-10 gap-2 font-medium hover:scale-105 transition-transform disabled:hover:scale-100 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            add quest
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
));

QuestForm.displayName = 'QuestForm';

export default QuestForm;