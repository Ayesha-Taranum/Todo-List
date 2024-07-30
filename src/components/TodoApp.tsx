import React, { useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setInputText('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(prevTodos =>
        prevTodos.map(todo => {
          if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
      <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-lg w-full mx-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">TO-Do List</h1>
          <div className="flex mb-4">
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="flex-grow bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600 border-2 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a new todo..."
            />
            <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map(todo => (
                <li
                    key={todo.id}
                    className={`flex items-center bg-gray-700 p-3 rounded-md ${
                        todo.completed ? 'text-gray-500 line-through' : 'text-gray-200'
                    }`}
                >
                  <span className="flex-grow">{todo.text}</span>
                  {!todo.completed ? (
                      <button
                          onClick={() => handleToggleComplete(todo.id)}
                          className="text-green-500 hover:text-green-600 ml-2 focus:outline-none"
                      >
                        ✓
                      </button>
                  ) : null}
                  <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-600 ml-2 focus:outline-none"
                  >
                    X
                  </button>
                </li>
            ))}
          </ul>
          <div className="mt-8 text-gray-200">
            <p>
              Total Todos: {totalTodos} | Completed Todos: {completedTodos}
            </p>
          </div>
        </div>
      </div>
  );
};

export default TodoApp;
