import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [Books, setBooks] = useState([]);
  const[title,setTitle]=useState("");
  const[releaseYear,setReleaseYear]=useState("")
  const[newtitle,setNewTitle]=useState("");

  useEffect(()=>{
    fetchBooks();
  },[]);

  const fetchBooks = async ()=>{
    try{
    const response= await fetch("http://127.0.0.1:8080/api/books/")
    const data= await response.json();
  
    setBooks(data);
    }
    catch(err){

    }
  }

   const addBook= async ()=>{
    const bookdata={
      title:title,
      release_year:releaseYear
    };
    try{
      const response= await fetch("http://127.0.0.1:8080/api/books/create",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(bookdata)
      })
      const data = await response.json();
      setBooks((prev)=>
        [...prev,data]
      )
      console.log(data);
    }
    catch(err){
      console.log(err)
    }


  }
  const updateBook=async (id,release_year)=>{
    const bookdata={
      title:newtitle,
      release_year,
    };
    try{
      const response= await fetch(`http://127.0.0.1:8080/api/books/${id}`,{
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(bookdata)
      })
      const data = await response.json();
      // setBooks((prev)=>
      //   [...prev,data]
      // )
      console.log(data);
    }
    catch(err){
      console.log(err)
    }


  }

  return (
    <>
     <h1>Book Website</h1>
     <div>
      <input type="text" placeholder='Book Title..' onChange={(e)=>setTitle(e.target.value)}></input><br/>
      <input type="number" placeholder='Release Date..' onChange={(e)=>setReleaseYear(e.target.value)}></input><br/>
      <button onClick={addBook}>Add Book</button>


     </div>
     {Books.map((b)=><div>
      <p >Title:{b.title}</p>
      <p>Release Year:{b.release_year}</p>
      <input type="text" placeholder='New Title...'
      onChange={(e)=>setNewTitle(e.target.value)}></input>
      <button onClick={()=>updateBook(b.id,b.release_year)} >Change Title</button>
      </div>)}
    </>
  )
}

export default App
