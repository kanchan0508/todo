import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { getWeatherData } from '../services/weatherApi';
import './TaskInput.css';

const TaskInput = () => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [location, setLocation] = useState('');
  const [isOutdoor, setIsOutdoor] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      let weatherData = null;
      if (isOutdoor && location) {
        weatherData = await getWeatherData(location);
      }

      dispatch(addTask({
        id: Date.now(),
        text: task,
        description: description || task,
        priority,
        completed: false,
        weather: weatherData,
        location,
        isOutdoor,
        createdAt: new Date().toISOString()
      }));

      setTask('');
      setDescription('');
      setLocation('');
      setIsOutdoor(false);
    }
  };

  return (
    <div className="task-input-container">
      <form className="task-input" onSubmit={handleSubmit}>
        <div className="task-input__header">
          <h2>Create New Task</h2>
          <div className="task-input__priority-wrapper">
            <span className="priority-label">Priority:</span>
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`task-input__priority priority-${priority}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="task-input__main">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What needs to be done?"
            className="task-input__field"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description (optional)"
            className="task-input__description"
          />

          <div className="task-input__outdoor-section">
            <label className="task-input__checkbox-label">
              <input
                type="checkbox"
                checked={isOutdoor}
                onChange={(e) => setIsOutdoor(e.target.checked)}
                className="task-input__checkbox"
              />
              <span className="checkbox-custom"></span>
              <span>Outdoor Activity</span>
            </label>

            {isOutdoor && (
              <div className="task-input__location-wrapper">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location for weather info..."
                  className="task-input__field location-input"
                />
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="task-input__button">
          <span className="button-icon">+</span>
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
};

export default TaskInput;
