import React, { useMemo } from 'react';
import { Calendar, Trophy, Star, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGame } from '../context/GameContext';
import { BORDER_RADIUS, SPACING, TYPOGRAPHY } from '../constants/ui.js';

const QuestLogEntry = React.memo(({ quest }) => {
  const getDifficultyIcon = (difficulty) => {
    const starCount = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: starCount }).map((_, i) => (
      <Star key={i} className="h-3 w-3 text-yellow-500 fill-current" />
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Trophy className="h-4 w-4 text-green-500" />;
      case 'cancelled':
        return <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">✕</div>;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 border border-border bg-card hover:bg-muted/50 transition-colors",
      BORDER_RADIUS.MEDIUM
    )}>
      <div className="flex-shrink-0">
        {getStatusIcon(quest.status)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className={cn(
            "font-medium text-sm text-foreground",
            quest.status === 'cancelled' && "line-through text-muted-foreground"
          )}>
            {quest.title}
          </h4>
          <div className="flex items-center gap-1">
            {getDifficultyIcon(quest.difficulty)}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className={cn("font-medium", getDifficultyColor(quest.difficulty))}>
            +{quest.xp} xp
          </span>
          <span className="capitalize">{quest.difficulty}</span>
          {quest.category && (
            <span className="capitalize">{quest.category}</span>
          )}
          {quest.completedAt && (
            <span>{formatTime(quest.completedAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
});

QuestLogEntry.displayName = 'QuestLogEntry';

const LogbookView = React.memo(({ setCurrentView }) => {
  const { completedQuests, quests, level, xp } = useGame();

  // Combine and organize all quests by date
  const questsByDate = useMemo(() => {
    const allQuests = [...completedQuests, ...quests];
    
    const grouped = {};
    
    allQuests.forEach(quest => {
      // Use completedAt for completed quests, createdAt for others
      const timestamp = quest.completedAt || quest.createdAt;
      if (!timestamp) return;
      
      const date = new Date(timestamp);
      const dateKey = date.toDateString();
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          dateObj: date,
          quests: []
        };
      }
      
      grouped[dateKey].quests.push({
        ...quest,
        sortTimestamp: quest.completedAt || quest.createdAt
      });
    });

    // Sort quests within each date by completion time (newest first)
    Object.values(grouped).forEach(dateGroup => {
      dateGroup.quests.sort((a, b) => new Date(b.sortTimestamp) - new Date(a.sortTimestamp));
    });

    // Sort dates (newest first)
    return Object.values(grouped).sort((a, b) => b.dateObj - a.dateObj);
  }, [completedQuests, quests]);

  const totalQuests = useMemo(() => {
    return completedQuests.length + quests.length;
  }, [completedQuests, quests]);

  const totalXpEarned = useMemo(() => {
    return completedQuests.reduce((total, quest) => total + (quest.xp || 0), 0);
  }, [completedQuests]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="text-center space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">quest logbook</h2>
          <p className="text-muted-foreground">
            {totalQuests} quest{totalQuests !== 1 ? 's' : ''} recorded across your journey
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-card border border-border rounded-full">
            <span className="text-sm text-muted-foreground">current level:</span>
            <span className="font-semibold text-foreground">{level}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm text-primary">{xp} xp</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
            <Trophy className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700">{completedQuests.length} completed</span>
          </div>
        </div>
      </header>

      {questsByDate.length === 0 ? (
        <Card className="p-8 text-center border-border bg-card hover-lift">
          <div className="text-6xl mb-4 animate-bounce">📔</div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">no quests logged yet</h3>
          <p className="text-muted-foreground mb-6">start your adventure by creating your first quest!</p>
          <Button onClick={() => setCurrentView('dashboard')} className="hover:scale-105 transition-transform">
            create first quest
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {questsByDate.map((dateGroup) => (
            <section key={dateGroup.date} className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">
                  {formatDate(dateGroup.date)}
                </h3>
                <div className={cn(
                  "px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground",
                  BORDER_RADIUS.FULL
                )}>
                  {dateGroup.quests.length} quest{dateGroup.quests.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="space-y-2 pl-8">
                {dateGroup.quests.map((quest) => (
                  <QuestLogEntry key={quest.id} quest={quest} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {totalQuests > 0 && (
        <Card className="p-6 text-center mt-8 border-border bg-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-foreground">{totalQuests}</div>
              <div className={cn(TYPOGRAPHY.SMALL_TEXT, "text-muted-foreground")}>total quests</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{completedQuests.length}</div>
              <div className={cn(TYPOGRAPHY.SMALL_TEXT, "text-muted-foreground")}>completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{totalXpEarned}</div>
              <div className={cn(TYPOGRAPHY.SMALL_TEXT, "text-muted-foreground")}>xp earned</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
});

LogbookView.displayName = 'LogbookView';

export default LogbookView;