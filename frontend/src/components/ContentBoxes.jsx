import {Pencil,Trash2} from 'lucide-react'
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateProvider';


function ContentBoxes() {
  const { globalState,setGlobalState} = useGlobalState();
  const { totalData } = globalState;

  const formattedContent = totalData.map((c) => {

    const handleEdit = () => {
      const uri = "http://localhost:8000/api/thoughts/"+c._id;
      axios.get(uri).then((res) => {
        //console.log(res.data);
        const { _id, title, content, isPublicBool } = res.data;
        setGlobalState({
          ...globalState,_id: _id,
          title: title,
          content: content,
          isPublic: isPublicBool ? "Public" : "Private",
          onEdit: true
        });
      }).catch((err) => {
        console.log(err);
      })
    }
    const handleDelete = () => {
      const uri = "http://localhost:8000/api/thoughts/"+c._id;
      // eslint-disable-next-line no-unused-vars
      axios.delete(uri).then((res) => {
        //console.log(res.data.message);
        alert('deleted successfully!');
        setGlobalState({ ...globalState, totalData: totalData.filter(item => item._id !== c._id)});
      }).catch((err)=>console.log(err))
    }

    return (
      <div key={c._id} className="w-full h-fit bg-accent flex flex-col justify-center px-4 py-4 text-white rounded-lg space-y-2">
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
    <section className={`w-10/12 md:w-8/12 h-full flex flex-col flex-wrap justify-between items-center px-10 py-4 space-y-5 mx-auto`}>
        {formattedContent}
    </section>
  )
}

export default ContentBoxes