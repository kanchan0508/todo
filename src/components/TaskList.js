import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask } from '../redux/actions/taskActions';
import './TaskList.css';

const TaskList = () => {
  const tasks = useSelector(state => state.taskState.tasks) || [];
  const dispatch = useDispatch();

  if (!Array.isArray(tasks)) {
    return (
      <div className="task-list__error">
        <h3>Oops! Something went wrong</h3>
        <p>We're having trouble loading your tasks.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="task-list__empty">
          <div className="empty-illustration">📝</div>
          <h3>No tasks yet</h3>
          <p>Add some tasks to get started!</p>
        </div>
      ) : (
        <div className="task-list__grid">
          {tasks.map(task => (
            <div key={task.id} className={`task-item priority-${task.priority}`}>
              <div className="task-item__header">
                <label className="task-item__checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleTask(task.id))}
                  />
                  <span className="checkmark">
                    <span className="check-icon">✓</span>
                  </span>
                </label>
                <span className={`priority-badge ${task.priority}`}>
                  {task.priority}
                </span>
              </div>
              
              <div className="task-item__content">
                <h3 className={`task-item__title ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </h3>
                {task.description && (
                  <p className="task-item__description">{task.description}</p>
                )}
              </div>

              <div className="task-item__footer">
                <div className="task-item__info">
                  <span className="task-item__date">
                    <span>📅</span>
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                  {task.location && (
                    <span className="task-item__location">
                      <span>📍</span>
                      {task.location}
                    </span>
                  )}
                </div>
                {task.weather && (
                  <div className="task-item__weather">
                    <img 
                      src={`http://openweathermap.org/img/w/${task.weather.icon}.png`}
                      alt={task.weather.condition}
                    />
                    <span>{task.weather.temp}°C</span>
                  </div>
                )}
                <button 
                  className="task-item__delete"
                  onClick={() => dispatch(deleteTask(task.id))}
                  aria-label="Delete task"
                >
                  <span>🗑️</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
