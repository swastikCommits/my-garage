import { useState } from "react";
export function CreateTodo(){
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');


    return (
        <div>
            <input id="title" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <input id="description" type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>

            <button onClick = { () =>{
                fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        title: title,
                        description: description,
                    }),
                })
                .then(async function (res){
                    await res.json();
                    alert("Todo Created");
                })
            }
            }>Create Todo</button>
        </div>
    )
}