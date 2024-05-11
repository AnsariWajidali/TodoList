import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import './App.css'  
import Navbar from "./component/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CgAddR } from "react-icons/cg";


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
const [showfinshed, setshowfinshed] = useState(true)


useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if (todoString){

    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
  }
}, [])



const toggleFinished = (e) => {
  setshowfinshed(!showfinshed)
}



const saveToLS = (params) => {
  localStorage.setItem("todos", JSON.stringify(todos))
}


 const handleAdd = () => {
    settodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    settodo("")
    saveToLS()
 } 


 const handleEdit = (e, id) => {
  let t = todos.filter(i=>i.id === id)
  settodo(t[0].todo)

  let newTodos = todos.filter(item=>{
    return item.id!==id
  });
  settodos(newTodos)
  saveToLS()
} 


 const handleDelete = (e, id) => {
  // Display a confirmation dialog
  if (window.confirm("Are you sure you want to delete this todo?")) {
    // If the user clicks "OK", proceed with deletion
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newTodos);
  } else {
    // If the user clicks "Cancel", do nothing
    // You may add optional behavior here, such as displaying a message
    console.log("Deletion canceled");
  }
  saveToLS()
}


 const handleChange = (e) => {
    settodo(e.target.value) 
 } 
 
 
 const handleCheckbox = (e) => {
    let id = e.target.name
    console.log(e, e.target)
    console.log("the id is", id)

    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    console.log(newTodos, todos)
    saveToLS()
 } 


  return (
    <>
      <Navbar /> 
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[85vh] md:w-[35%] ">
        <h1 className="  font-bold text-center text-3xl">iTask - Manage Our Todos at one Place</h1>
        <div className="addTodo my-5  ">
          <h2 className="text-2xl font-bold mb-3 ">Add a Todo</h2>
          <div className="insave flex ">

          <input onChange={handleChange} value={todo} placeholder="Add your Todo here"  className=".input w-3/4 rounded-full  px-5 py-1 " type="text"  />
          <button onClick={handleAdd} disabled={todo.length<=3} className="save bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-full px-5 flex gap-3 items-center py-1 mx-3 cursor-pointer">Save<CgAddR /></button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showfinshed} className=" cursor-pointer" /> Show Finished
        <div className="h-[2px] bg-black opacity-15 w-[90%] mx-auto my-2"><hr /></div>
        <h2 className="text-2xl font-bold my-4 ">Your Todo</h2>
        <div className="todos">
        {todos.length ===0 && <div className="m-5">No Todos Display</div>}
      {todos.map(item=>{
        
        return (showfinshed || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
          <div className="flex gap-5">
            
          <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className=" cursor-pointer" name={item.id} id="" />
          <div className={item.isCompleted?"line-through":"" }>{item.todo}</div>
          </div>
          <div className="buttons flex h-full gap-3">
          <button onClick={(e)=>handleEdit(e, item.id)} className=" bg-violet-800 hover:bg-violet-950 text-white rounded-md py-2 px-2 mx-1"><FaRegEdit /></button>
          <button onClick={(e)=>{handleDelete(e, item.id)}} className=" bg-red-700 hover:bg-red-800 text-white rounded-md md:py-2 px-2 mx-1"><MdDeleteOutline />
</button>
        </div>
          </div>
        })}
      </div>

    </div>
    </>
  );
}

export default App;
