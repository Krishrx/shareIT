import {Pencil,Trash2,Clock3,Globe,Lock} from 'lucide-react'
import axios from 'axios';
import { useGlobalState } from '../context/GlobalStateProvider';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect,useState } from "react";
import { formatDistanceToNow } from 'date-fns';

function ContentBoxes() {
  const { globalState,setGlobalState} = useGlobalState();
  const { totalData } = globalState;
  const { user } = useAuthContext();

  const [axiosHeader, setAxiosHeader] = useState(null);
  const [userId, setUserId] = useState('');

  useEffect(() => {
        if (user) {
         const axiosConfig = {
            headers: {
                Authorization: user ? `Bearer ${user.token}` : '',
                'Content-Type': 'application/json',
            },
          };
          setAxiosHeader(axiosConfig);

          axios.post('http://localhost:8000/api/users/getid', { email: user.email },axiosConfig)
          .then(response => {
            setUserId(response.data.id);
          })
          .catch(error => {
              console.error(error.response.data);
          });

        }
        else {
          setAxiosHeader(null);
          setUserId('')
        }
  },[user])
    
  
    
  const formattedDate = (createdAt) => {
    const distance = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    return distance;
  };

  const userDocuments = totalData.filter((doc) => doc.user_id === userId);
  const publicDocuments = totalData.filter((doc) => doc.isPublic && doc.user_id !== userId);
  

  const formattedContentUser = userDocuments.map((c) => {

    const handleEdit = () => {
      const uri = "http://localhost:8000/api/thoughts/"+c._id;
      axios.get(uri,axiosHeader).then((res) => {
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
      axios.delete(uri,axiosHeader).then((res) => {
        //console.log(res.data.message);
        alert('deleted successfully!');
        setGlobalState({ ...globalState, totalData: totalData.filter(item => item._id !== c._id)});
      }).catch((err)=>console.log(err))
    }

    return (
      <div key={c._id} className="w-full h-fit bg-accent flex flex-col justify-center px-4 py-4 text-white rounded-lg space-y-2">
        <div className='flex items-center py-2 space-x-2'>
          <p className='bg-white w-fit text-accent font-bold px-4 py-2 rounded-full'>{user.email.charAt(0).toUpperCase()}</p>
          <p>{user.email}</p>
        </div>
        <div className='flex justify-between items-center py-4'>
          <h1 className="text-xl uppercase font-medium">{c.title}</h1>
          <p className="font-semibold">{c.isPublic ? <Globe size={20}/> : <Lock size={20}/>}</p>
        </div>
        <p className='pb-4'>{c.content}</p>
          <div className='flex justify-between items-center'>
            <div className='flex justify-between items-center space-x-1'>
              <Clock3 size={14}/>
              <p className='text-xs'>{formattedDate(c.createdAt)}</p>
            </div>
            <div className='flex justify-between items-center space-x-2 cursor-pointer'>
              <Pencil size={20} onClick={handleEdit}/>
              <Trash2 size={20} onClick={handleDelete}/>
            </div>
          </div>
      </div>
    )
  })


  const formattedContentPublic = publicDocuments.map((c) => {

    return (
      <div key={c._id} className="w-full h-fit bg-accent flex flex-col justify-center px-4 py-4 text-white rounded-lg space-y-2">
        <div className='flex items-center py-2 space-x-2'>
          <p className='bg-white w-fit text-accent font-bold px-4 py-2 rounded-full'>{'A'}</p>
          <p>{'Anonymous User'}</p>
        </div>
        <div className='flex justify-between items-center py-4'>
          <h1 className="text-xl uppercase font-medium">{c.title}</h1>
          <p className="font-semibold">{c.isPublic ? <Globe size={20}/> : <Lock size={20}/>}</p>
        </div>
        <p className='pb-4'>{c.content}</p>
          <div className='flex justify-between items-center'>
            <div className='flex justify-between items-center space-x-1'>
              <Clock3 size={14}/>
              <p className='text-xs'>{formattedDate(c.createdAt)}</p>
            </div>
          </div>
      </div>
    )
  })

  return (
    <>
      <section className={`w-10/12 md:w-8/12 h-full flex flex-col flex-wrap justify-between items-center px-10 py-4 space-y-5 mx-auto`}>
      <h1 className='text-2xl font-medium'>Your Posts</h1>
        {formattedContentUser}
      </section>
      <section className={`w-10/12 md:w-8/12 h-full flex flex-col flex-wrap justify-between items-center px-10 py-4 space-y-5 mx-auto`}>
      <h1 className='text-2xl font-medium'>Public Feed</h1>
        {formattedContentPublic}
    </section>
    </>
  )
}

export default ContentBoxes