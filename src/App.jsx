import { useEffect, useState } from 'react';
import './App.css'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "YOUR_SUPABASE_API Settings"
  ,"YOUR_SUPABASE_PROJECT_API_KEYS"
  );

function App() {

  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  async function createTodo() {
    await supabase
      .from('todos')
      .insert({ title: text })
    await getTodos()
  }
  async function updateTodoDone(todo) {
    await supabase
      .from("todos")
      .update({ done: !todo.done })
      .eq("id", todo.id);
    await getTodos();
  }
  async function getTodos() {
    const { data } = await supabase
    .from("todos")
    .select()
    .order("id")
    setTodos(data)
  }
  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <input
        value={text}
        placeholder='Type Task Title'
        onChange={(e) => setText(e.target.value)} />
      <button onClick={createTodo}>Add</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={(e) => updateTodoDone(todo)} />
          {todo.title}
        </div>
      ))}
    </>
  )
}

export default App
