import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
            My Todo List
          </h1>

          <form onSubmit={addTodo} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <PlusCircle className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`flex-1 ${
                    todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-all duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {todos.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No todos yet. Add one above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;