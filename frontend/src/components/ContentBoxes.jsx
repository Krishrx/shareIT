import {Pencil,Trash2} from 'lucide-react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useGlobalState } from './GlobalStateProvider';
function ContentBoxes() {

  const [content, setContent] = useState([]);
  //const { name } = useGlobalState();

  useEffect(() => {
    axios.get("http://localhost:8000/thoughts").then((res) => setContent(res.data));
  },[])

  const formattedContent = content.map((c) => {
    const handleEdit = () => {
      const uri = "http://localhost:8000/thoughts/"+c._id;
      axios.get(uri).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
    const handleDelete = () => {
      const uri = "http://localhost:8000/thoughts/"+c._id;
      axios.delete(uri).then((res)=>console.log(res.data.message)).catch((err)=>console.log(err))
    }
    return (
      <div key={c._id} className="min-w-[500px] w-fit h-fit bg-accent flex flex-col justify-center px-4 py-4 text-white rounded-lg space-y-2">
        <h1 className="text-xl">{c.title}</h1>
        <p>{c.content}</p>
        <p className="">Status:<span className="font-semibold">{c.isPublic?'Public':'Private'}</span></p>
          <div className='flex justify-end items-center space-x-4 cursor-pointer'>
            <Pencil onClick={handleEdit}/>
            <Trash2 onClick={handleDelete}/>
          </div>
      </div>
    )
  })

  return (
    <section className={`w-full h-full flex flex-col flex-wrap justify-between items-center px-10 py-4 space-y-5`}>
        {formattedContent}
    </section>
  )
}

export default ContentBoxes