export function Todos({todos}){
    return<div>
        {todos.map((todo) => (
            <div style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                <p>Status: {todo.completed ? 'Completed' : 'Pending'}</p>
            </div>
        ))}
    </div>
}