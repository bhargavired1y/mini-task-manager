'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000/tasks';

type Task = {
  id: string;
  title: string;
  status: 'pending' | 'done';
  createdAt: string;
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'done', label: 'Done' },
];

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newTask, setNewTask] = useState<{ title: string; status: 'pending' | 'done' }>({ title: '', status: 'pending' });
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<{ title: string; status: 'pending' | 'done' }>({ title: '', status: 'pending' });

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      setError('Failed to fetch tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!newTask.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      const res = await axios.post<Task>(API_URL, newTask);
      setTasks([...tasks, res.data]);
      setSuccess('Task added');
      setNewTask({ title: '', status: 'pending' });
    } catch (err) {
      setError('Failed to add task');
    }
  };

  // Delete task
  const handleDelete = async (id: string) => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
      setSuccess('Task deleted');
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  // Start editing
  const startEdit = (task: Task) => {
    setEditTaskId(task.id);
    setEditTask({ title: task.title, status: task.status });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTask({ title: '', status: 'pending' });
  };

  // Save edit
  const handleEditSave = async (id: string) => {
    setError('');
    setSuccess('');
    if (!editTask.title.trim()) {
      setError('Title is required');
      return;
    }
    try {
      const res = await axios.put<Task>(`${API_URL}/${id}`, editTask);
      setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
      setSuccess('Task updated');
      cancelEdit();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mini Task Manager</h1>
      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <select
          className="border rounded px-3 py-2"
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value as 'pending' | 'done' })}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {success && <div className="mb-4 text-green-600">{success}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Created At</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">No tasks found.</td>
                </tr>
              )}
              {tasks.map(task => (
                <tr key={task.id} className="border-t">
                  <td className="py-2 px-3">
                    {editTaskId === task.id ? (
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={editTask.title}
                        onChange={e => setEditTask({ ...editTask, title: e.target.value })}
                      />
                    ) : (
                      <span className={task.status === 'done' ? 'line-through text-gray-500' : ''}>{task.title}</span>
                    )}
                  </td>
                  <td className="py-2 px-3">
                    {editTaskId === task.id ? (
                      <select
                        className="border rounded px-2 py-1"
                        value={editTask.status}
                        onChange={e => setEditTask({ ...editTask, status: e.target.value as 'pending' | 'done' })}
                      >
                        {statusOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={task.status === 'done' ? 'text-green-600' : 'text-yellow-600'}>{task.status}</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-3 flex gap-2">
                    {editTaskId === task.id ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                          onClick={() => handleEditSave(task.id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                          onClick={cancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                          onClick={() => startEdit(task)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
