import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import { 
  Plus, 
  Trash2, 
  Check, 
  X, 
  Tag, 
  Award, 
  Clock, 
  Edit2,
  Save,
  XCircle,
  CheckCircle2,
  Circle,
  BookOpen
} from 'lucide-react';
import './QuestList.css';

const QuestList = () => {
  const { 
    quests, 
    completedQuests, 
    addQuest, 
    completeQuest, 
    deleteQuest,
    updateQuest,
    categories,
    difficultyLevels
  } = useGame();
  
  const [editingQuestId, setEditingQuestId] = useState(null);
  const [animatingOutQuestId, setAnimatingOutQuestId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDifficulty, setEditDifficulty] = useState('medium');
  const [editCategory, setEditCategory] = useState('personal');
  const editInputRef = useRef(null);
  
  // Focus edit input when editing starts
  useEffect(() => {
    if (editingQuestId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingQuestId]);
  
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [newQuestDifficulty, setNewQuestDifficulty] = useState('medium');
  const [newQuestCategory, setNewQuestCategory] = useState('personal');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Convert categories object to array for rendering
  const categoriesList = useMemo(() => {
    return Object.entries(categories || {}).map(([id, { name, color }]) => ({
      id,
      name,
      color,
      icon: (
        <div key={id} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
      )
    }));
  }, [categories]);

  const handleCompleteQuest = useCallback((questId) => {
    setAnimatingOutQuestId(questId);
    setTimeout(() => {
      completeQuest(questId);
      setAnimatingOutQuestId(null);
    }, 300); // Match this with your CSS animation duration
  }, [completeQuest]);
  
  const handleCancelQuest = useCallback((questId) => {
    completeQuest(questId, 'cancelled');
  }, [completeQuest]);
  
  const startEditing = useCallback((quest) => {
    setEditingQuestId(quest.id);
    setEditTitle(quest.title);
    setEditDifficulty(quest.difficulty);
    setEditCategory(quest.category);
  }, []);
  
  const saveEdit = useCallback((e, questId) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    
    // Update the quest with new values
    updateQuest(questId, {
      title: editTitle,
      difficulty: editDifficulty, 
      category: editCategory
    });
    
    setEditingQuestId(null);
  }, [editTitle, editDifficulty, editCategory]);
  
  const cancelEdit = useCallback(() => {
    setEditingQuestId(null);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (newQuestTitle.trim()) {
      addQuest(newQuestTitle, newQuestDifficulty, newQuestCategory);
      setNewQuestTitle('');
      setShowAddForm(false);
    }
  }, [addQuest, newQuestTitle, newQuestDifficulty, newQuestCategory]);

  const renderQuestCategory = (categoryId) => {
    const category = categoriesList.find(cat => cat.id === categoryId) || categoriesList[0];
    return category ? (
      <span className="quest-category" style={{ color: category.color }}>
        {category.icon}
        {category.name}
      </span>
    ) : null;
  };

  const filteredQuests = useMemo(() => {
    // Only show active (uncompleted) quests in the main list
    const activeQuests = quests.filter(quest => !quest.completed);
    
    const filtered = activeCategory === 'all' 
      ? [...activeQuests] 
      : activeQuests.filter(quest => quest.category === activeCategory);
    
    // Sort by creation date (newest first)
    return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [quests, activeCategory]);
  
  const recentCompletedQuests = useMemo(() => {
    // Combine completed quests from both arrays (for backward compatibility)
    const allCompleted = [
      ...completedQuests,
      ...quests.filter(q => q.completed)
    ];
    
    // Remove duplicates by ID
    const uniqueCompleted = allCompleted.reduce((acc, current) => {
      if (!acc.some(quest => quest.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, []);
    
    return uniqueCompleted
      .sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt))
      .slice(0, 3);
  }, [completedQuests, quests]);

  return (
    <div className="quest-list">
      <div className="quest-list-header">
        <h2>Your Quests</h2>
        <button 
          className="add-quest-btn"
          onClick={() => setShowAddForm(!showAddForm)}
          aria-expanded={showAddForm}
        >
          <Plus size={18} /> {showAddForm ? 'Cancel' : 'Add Quest'}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        <button 
          className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categoriesList.map(category => (
          <button
            key={category.id}
            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
            style={activeCategory === category.id ? { 
              borderBottomColor: category.color,
              color: category.color 
            } : {}}
          >
            {React.cloneElement(category.icon, { 
              size: 16, 
              style: { marginRight: '6px' } 
            })}
            {category.name}
          </button>
        ))}
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="add-quest-form">
          <div className="form-group">
            <input
              type="text"
              value={newQuestTitle}
              onChange={(e) => setNewQuestTitle(e.target.value)}
              placeholder="Enter quest title"
              className="quest-input"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>
                <Tag size={16} /> Category
              </label>
              <select
                value={newQuestCategory}
                onChange={(e) => setNewQuestCategory(e.target.value)}
                className="category-select"
              >
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>
                <Award size={16} /> Difficulty
              </label>
              <select
                value={newQuestDifficulty}
                onChange={(e) => setNewQuestDifficulty(e.target.value)}
                className="difficulty-select"
              >
                {Object.entries(difficultyLevels || {}).map(([key, { label, xp }]) => (
                  <option key={key} value={key}>
                    {label} ({xp} XP)
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setShowAddForm(false)}
            >
              <X size={16} /> Cancel
            </button>
            <button type="submit" className="add-button">
              <Plus size={16} /> Add Quest
            </button>
          </div>
        </form>
      )}

      <div className="quests-container">
        {filteredQuests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <BookOpen size={48} className="text-gray-300" />
            </div>
            <h3>No quests found</h3>
            <p>Add a new quest to get started!</p>
            <button 
              className="primary-button"
              onClick={() => setShowAddForm(true)}
            >
              <Plus size={16} /> Add Your First Quest
            </button>
          </div>
        ) : (
          <ul className="quests">
            {filteredQuests.map((quest) => {
              const difficulty = difficultyLevels[quest.difficulty] || Object.values(difficultyLevels || {})[0] || { label: 'Medium', xp: 25, color: '#FFC107' };
              
              return (
                <li 
                  key={quest.id} 
                  className={`quest-item ${
                    quest.status === 'completed' ? 'completed' : 
                    quest.status === 'cancelled' ? 'cancelled' : ''
                  }`}
                >
                  <div className="quest-info">
                    <div className="quest-header">
                      {renderQuestCategory(quest.category)}
                      <span 
                        className="difficulty-badge"
                        style={{
                          backgroundColor: `${difficulty.color}15`,
                          color: difficulty.color,
                          border: `1px solid ${difficulty.color}30`
                        }}
                      >
                        {difficulty.label}
                        <span className="xp-badge">+{difficulty.xp} XP</span>
                      </span>
                    </div>
                    <div className="quest-title">
                      {editingQuestId === quest.id ? (
                        <form onSubmit={(e) => saveEdit(e, quest.id)} className="edit-form">
                          <input
                            ref={editInputRef}
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="edit-input"
                          />
                          <div className="edit-actions">
                            <button type="submit" className="icon-button save-button" title="Save">
                              <Save size={16} />
                            </button>
                            <button type="button" onClick={cancelEdit} className="icon-button cancel-button" title="Cancel">
                              <X size={16} />
                            </button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <span className="status-indicator">
                            {quest.status === 'completed' ? (
                              <CheckCircle2 size={18} className="completed-icon" />
                            ) : quest.status === 'cancelled' ? (
                              <XCircle size={18} className="cancelled-icon" />
                            ) : (
                              <Circle size={18} className="incomplete-icon" />
                            )}
                          </span>
                          <span className="title-text">{quest.title}</span>
                        </>
                      )}
                    </div>
                    <div className="quest-meta">
                      <span className="quest-date">
                        <Clock size={14} /> 
                        {new Date(quest.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="quest-actions">
                    {editingQuestId !== quest.id && (
                      <>
                        <label className="complete-checkbox-container">
                          <input
                            type="checkbox"
                            checked={quest.status === 'completed'}
                            onChange={() => {
                              if (quest.status !== 'completed') {
                                handleCompleteQuest(quest.id);
                              }
                            }}
                            className="complete-checkbox"
                            aria-label={quest.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                            title={quest.status === 'completed' ? 'Mark as incomplete' : 'Mark as complete'}
                          />
                          <span className="checkmark"></span>
                        </label>
                        {quest.status !== 'cancelled' && quest.status !== 'completed' && (
                          <button
                            onClick={() => handleCancelQuest(quest.id)}
                            className="action-button cancel-button"
                            aria-label="Cancel quest"
                            title="Cancel quest"
                          >
                            <X size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => startEditing(quest)}
                          className="action-button edit-button"
                          aria-label="Edit quest"
                          title="Edit quest"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteQuest(quest.id)}
                          className="action-button delete-button"
                          aria-label="Delete quest"
                          title="Delete quest"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {completedQuests.length > 0 && (
        <div className="completed-quests">
          <h3>Recently Completed ({completedQuests.length})</h3>
          <ul className="completed-quests-list">
            {recentCompletedQuests.map((quest) => {
              const difficulty = difficultyLevels[quest.difficulty] || Object.values(difficultyLevels || {})[0] || { label: 'Medium', xp: 25, color: '#FFC107' };
              const category = categoriesList.find(cat => cat.id === quest.category) || categoriesList[0];
              
              return (
                <li 
                key={quest.id} 
                className={`completed-quest ${
                  animatingOutQuestId === quest.id ? 'animate-out' : ''
                }`}
              >
                  <div className="quest-title">
                    <Check size={14} className="completed-icon" />
                    {quest.title}
                  </div>
                  <div className="quest-details">
                    <span 
                      className="difficulty-tag" 
                      style={{ backgroundColor: `${difficulty?.color || '#999'}15`, color: difficulty?.color || '#666' }}
                    >
                      {difficulty?.label || 'Medium'} (+{difficulty?.xp || 25} XP)
                    </span>
                    <span 
                      className="category-tag" 
                      style={{ backgroundColor: `${category?.color || '#999'}15`, color: category?.color || '#666' }}
                    >
                      {category?.name || 'Uncategorized'}
                    </span>
                    <span className="xp-earned">+{quest.xp || 0} XP</span>
                  </div>
                </li>
              );
            })}
            {completedQuests.length > 3 && (
              <li className="more-quests">...and {completedQuests.length - 3} more completed</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestList;
