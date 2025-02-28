import React, { useState, useEffect } from 'react';

const Todo = () => {
  // Load tasks from localStorage or use default
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {
      todo: [
        { id: 1, title: 'CRM', description: 'Customer relationship management system', dueDate: '2025-03-15' },
        { id: 2, title: 'Project Planning', description: 'Create project timeline and resource allocation', dueDate: '2025-03-20' }
      ],
      done: [
        { id: 3, title: 'Detection of Fraudulent Transactions', description: 'Detect fraudulent activities in payment system', dueDate: '2025-02-25' }
      ]
    };
  });

  // Load notes from localStorage or use default
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes || '';
  });

  // Save tasks to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save notes to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notes', notes);
  }, [notes]);

  // State for task dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskList, setTaskList] = useState(null);
  
  // State for new task form
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  const styles = {
    container: {
      backgroundColor: '#f5f7fa',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
      textAlign: 'left',
    },
    mainContent: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 80px)',
    },
    board: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexGrow: 1,
    },
    column: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    item: {
      backgroundColor: '#f0f2f5',
      color: '#333',
      padding: '10px',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
    },
    itemTitle: {
      flexGrow: 1,
    },
    itemButtons: {
      display: 'flex',
      gap: '5px',
    },
    iconButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      padding: '0 5px',
    },
    addTaskButton: {
      backgroundColor: '#4a6cf7',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '6px',
      marginTop: '10px',
      cursor: 'pointer',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    notesSection: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      height: '250px',
    },
    notesHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    notesTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    notesContent: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    notesTextarea: {
      width: '100%',
      flexGrow: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      resize: 'none',
      fontFamily: 'inherit',
    },
    dialog: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    dialogContent: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      maxHeight: '90vh',
      overflowY: 'auto',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    },
    dialogTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500',
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '5px',
      cursor: 'pointer',
      border: 'none',
      fontWeight: '500',
    },
    cancelButton: {
      backgroundColor: '#f1f1f1',
      color: '#333',
    },
    saveButton: {
      backgroundColor: '#4a6cf7',
      color: 'white',
    },
    moveButton: {
      backgroundColor: '#6c757d',
      color: 'white',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
  };

  // Open dialog to view/edit a task
  const handleTaskClick = (task, list, event) => {
    setCurrentTask({...task});
    setTaskList(list);
    setIsDialogOpen(true);
    setIsAddingTask(false);
  };

  // Handle save changes to existing task
  const handleSaveTask = () => {
    if (taskList && currentTask) {
      setTasks(prevTasks => {
        const updatedTasks = {...prevTasks};
        const taskIndex = updatedTasks[taskList].findIndex(t => t.id === currentTask.id);
        if (taskIndex !== -1) {
          updatedTasks[taskList][taskIndex] = currentTask;
        }
        return updatedTasks;
      });
    }
    setIsDialogOpen(false);
  };

  // Move task between lists
  const handleMoveTask = () => {
    if (!taskList || !currentTask) return;
    
    const targetList = taskList === 'todo' ? 'done' : 'todo';
    
    setTasks(prevTasks => {
      const updatedTasks = {...prevTasks};
      // Remove from current list
      updatedTasks[taskList] = updatedTasks[taskList].filter(t => t.id !== currentTask.id);
      // Add to target list
      updatedTasks[targetList] = [...updatedTasks[targetList], currentTask];
      return updatedTasks;
    });
    
    setIsDialogOpen(false);
  };

  // Delete a task
  const handleDeleteTask = () => {
    if (!taskList || !currentTask) return;
    
    setTasks(prevTasks => {
      const updatedTasks = {...prevTasks};
      updatedTasks[taskList] = updatedTasks[taskList].filter(t => t.id !== currentTask.id);
      return updatedTasks;
    });
    
    setIsDialogOpen(false);
  };

  // Delete a task directly from the list
  const handleDeleteTaskFromList = (taskId, list, event) => {
    event.stopPropagation();
    setTasks(prevTasks => {
      const updatedTasks = {...prevTasks};
      updatedTasks[list] = updatedTasks[list].filter(t => t.id !== taskId);
      return updatedTasks;
    });
  };

  // Open dialog to add a new task
  const handleAddTaskClick = () => {
    setIsAddingTask(true);
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  // Add a new task
  const handleAddNewTask = () => {
    if (newTask.title.trim() === '') return;
    
    const newTaskWithId = {
      ...newTask,
      id: Date.now() // Simple way to generate unique IDs
    };
    
    setTasks(prevTasks => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTaskWithId]
    }));
    
    setNewTask({ title: '', description: '', dueDate: '' });
    setIsDialogOpen(false);
  };

  // Update field values for current task
  const handleTaskChange = (field, value) => {
    setCurrentTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update field values for new task
  const handleNewTaskChange = (field, value) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle notes changes
  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>To-Do List</h1>
      <div style={styles.mainContent}>
        <div style={styles.board}>
          <div style={styles.column}>
            <h2>To Do</h2>
            {tasks.todo.map(task => (
              <div 
                key={task.id} 
                style={styles.item}
                onClick={() => handleTaskClick(task, 'todo')}
              >
                <div style={styles.itemTitle}>{task.title}</div>
                <div style={styles.itemButtons}>
                  <button 
                    style={styles.iconButton} 
                    onClick={(e) => handleDeleteTaskFromList(task.id, 'todo', e)}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                  <button 
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(task, 'todo', e);
                    }}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
            <div 
              style={styles.addTaskButton}
              onClick={handleAddTaskClick}
            >
              + Add Task
            </div>
          </div>
          <div style={styles.column}>
            <h2>Done</h2>
            {tasks.done.map(task => (
              <div 
                key={task.id} 
                style={styles.item}
                onClick={() => handleTaskClick(task, 'done')}
              >
                <div style={styles.itemTitle}>{task.title}</div>
                <div style={styles.itemButtons}>
                  <button 
                    style={styles.iconButton} 
                    onClick={(e) => handleDeleteTaskFromList(task.id, 'done', e)}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                  <button 
                    style={styles.iconButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskClick(task, 'done', e);
                    }}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={styles.notesSection}>
          <div style={styles.notesHeader}>
            <h2 style={styles.notesTitle}>Notes</h2>
          </div>
          <div style={styles.notesContent}>
            <textarea 
              style={styles.notesTextarea}
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add your notes here..."
            />
          </div>
        </div>
      </div>

      {/* Task Dialog */}
      {isDialogOpen && (
        <div style={styles.dialog}>
          <div style={styles.dialogContent}>
            <div style={styles.dialogTitle}>
              {isAddingTask ? 'Add New Task' : 'Edit Task'}
            </div>
            
            {isAddingTask ? (
              // New Task Form
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Title</label>
                  <input 
                    type="text" 
                    style={styles.input} 
                    value={newTask.title}
                    onChange={(e) => handleNewTaskChange('title', e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea 
                    style={styles.input} 
                    rows="3"
                    value={newTask.description}
                    onChange={(e) => handleNewTaskChange('description', e.target.value)}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Due Date</label>
                  <input 
                    type="date" 
                    style={styles.input}
                    value={newTask.dueDate}
                    onChange={(e) => handleNewTaskChange('dueDate', e.target.value)}
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button 
                    style={{...styles.button, ...styles.cancelButton}}
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    style={{...styles.button, ...styles.saveButton}}
                    onClick={handleAddNewTask}
                  >
                    Add Task
                  </button>
                </div>
              </>
            ) : (
              // Edit Task Form
              currentTask && (
                <>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Title</label>
                    <input 
                      type="text" 
                      style={styles.input} 
                      value={currentTask.title}
                      onChange={(e) => handleTaskChange('title', e.target.value)}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description</label>
                    <textarea 
                      style={styles.input} 
                      rows="3"
                      value={currentTask.description}
                      onChange={(e) => handleTaskChange('description', e.target.value)}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Due Date</label>
                    <input 
                      type="date" 
                      style={styles.input}
                      value={currentTask.dueDate}
                      onChange={(e) => handleTaskChange('dueDate', e.target.value)}
                    />
                  </div>
                  <div style={styles.buttonGroup}>
                    <button 
                      style={{...styles.button, ...styles.cancelButton}}
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      style={{...styles.button, ...styles.deleteButton}}
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                    <button 
                      style={{...styles.button, ...styles.moveButton}}
                      onClick={handleMoveTask}
                    >
                      Move to {taskList === 'todo' ? 'Done' : 'To Do'}
                    </button>
                    <button 
                      style={{...styles.button, ...styles.saveButton}}
                      onClick={handleSaveTask}
                    >
                      Save
                    </button>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;