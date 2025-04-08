import { ADD_TASK, DELETE_TASK, UPDATE_TASK, TOGGLE_TASK } from '../actions/taskActions';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
};

export const taskReducer = (state = initialState, action) => {
  let updatedTasks;
  
  switch (action.type) {
    case ADD_TASK:
      updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
      
    case DELETE_TASK:
      updatedTasks = state.tasks.filter(task => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
      
    case UPDATE_TASK:
      updatedTasks = state.tasks.map(task =>
        task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
      
    case TOGGLE_TASK:
      updatedTasks = state.tasks.map(task =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
      
    case 'SET_TASKS':
      localStorage.setItem('tasks', JSON.stringify(action.payload));
      return { ...state, tasks: action.payload };
      
    default:
      return state;
  }
};

export default taskReducer;
