import { useEffect, useState } from 'react';
import './App.css'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "YOUR_SUPABASE_API Settings"
  , "YOUR_SUPABASE_PROJECT_API_KEYS"
);

function App() {

  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")



  async function createTodo() {
    await supabase
      .from('todos')
      .insert({ title: text })
    setText("")
    await getTodos()
  }

  async function getTodos() {
    const { data } = await supabase
      .from("todos")
      .select()
      .order("id")
    setTodos(data)
  }

  async function updateTodoDone(todo) {
    await supabase
      .from("todos")
      .update({ done: !todo.done })
      .eq("id", todo.id);
    await getTodos();
  }

  async function deleteTodo(todo) {
    await supabase
      .from('todos')
      .delete()
      .eq('id', todo.id);

    await getTodos()
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>

      <div className="todo-container">
        <h1>Todo List</h1>
        <div>
          <input
            value={text}
            placeholder='Type Task Title'
            onChange={(e) => setText(e.target.value)} />
          <button onClick={createTodo}>Add</button>
        </div>
        <ul>

          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => updateTodoDone(todo)} />
              {<span>{todo.title}</span>}
              <button onClick={() => deleteTodo(todo)}>X</button>
              {/* </div> */}
            </li>)
          )}
        </ul>
      </div>

    </>
  )
}

export default App
