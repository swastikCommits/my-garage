import {useState, useEffect} from 'react';
import {CreateTodo} from './components/CreateTodo.jsx';
import {Todos} from './components/Todos.jsx';

export function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then(async function (res){
        const data = await res.json();
        setTodos(data);
      });
  }, []);

  
  return(
    <div>
        <CreateTodo/>
        <Todos todos={todos} setTodos={setTodos}/>
    </div>
  )
}