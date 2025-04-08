import axios from 'axios';

// Action Types
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';

// Action to add a task (including weather data for outdoor tasks)
export const addTask = (task) => async (dispatch) => {
  // Make sure we have a task object with all required properties
  const newTask = {
    id: Date.now(),
    text: task.text || '',
    description: task.description || '',
    priority: task.priority || 'medium',
    completed: false,
    weather: null
  };

  // Check if task is outdoor-related
  if (newTask.description && newTask.description.toLowerCase().includes('outdoor')) {
    try {
      const apiKey = '18babe00d5da447519c4a1a1f7e6eeb8'; // Replace with your API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`
      );
      newTask.weather = response.data;
    } catch (error) {
      newTask.weather = { error: 'Weather data unavailable' };
    }
  }

  dispatch({ type: ADD_TASK, payload: newTask });
};

export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId
});

export const updateTask = (id, updates) => ({
  type: UPDATE_TASK,
  payload: { id, updates }
});

export const toggleTask = (taskId) => ({
  type: TOGGLE_TASK,
  payload: taskId
});
