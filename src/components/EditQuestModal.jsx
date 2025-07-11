import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Modal from './Modal';
import { DIFFICULTY_LEVELS } from '../constants/ui.js';

const EditQuestModal = ({ isOpen, onClose, quest, onSave }) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDifficulty, setEditedDifficulty] = useState('easy');

  useEffect(() => {
    if (quest) {
      console.log('EditQuestModal: Quest data:', quest);
      setEditedTitle(quest.title);
      // Find difficulty based on XP value
      const difficulty = DIFFICULTY_LEVELS.find(d => d.xp === quest.xp);
      console.log('EditQuestModal: Found difficulty:', difficulty, 'for XP:', quest.xp);
      setEditedDifficulty(difficulty?.value || 'easy');
    }
  }, [quest]);

  const handleSave = () => {
    if (editedTitle.trim()) {
      const selectedDifficulty = DIFFICULTY_LEVELS.find(d => d.value === editedDifficulty);
      const xpValue = selectedDifficulty?.xp || 25;
      onSave(quest.id, editedTitle.trim(), xpValue);
      onClose();
    }
  };

  const handleCancel = () => {
    setEditedTitle(quest?.title || '');
    const difficulty = DIFFICULTY_LEVELS.find(d => d.xp === quest?.xp);
    setEditedDifficulty(difficulty?.value || 'easy');
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!quest) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Quest</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="quest-title" className="block text-sm font-medium mb-2">
              Quest Title
            </label>
            <Input
              id="quest-title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter quest title"
              className="w-full"
              autoFocus
            />
          </div>
          
          <div>
            <label htmlFor="quest-difficulty" className="block text-sm font-medium mb-2">
              Difficulty & XP Reward
            </label>
            <select
              id="quest-difficulty"
              value={editedDifficulty}
              onChange={(e) => setEditedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {DIFFICULTY_LEVELS.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.xp} XP {'★'.repeat(difficulty.stars)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!editedTitle.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditQuestModal;