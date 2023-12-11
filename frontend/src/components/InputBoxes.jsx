import { Input,Textarea,Select,Option,Button } from "@material-tailwind/react";
import axios from "axios";
import { useGlobalState } from '../context/GlobalStateProvider';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect,useState } from "react";

function InputBoxes() {
    const { globalState,setGlobalState } = useGlobalState();
    const { _id, title, content, isPublic,onEdit,totalData } = globalState;
    const { user } = useAuthContext();

    const [axiosHeader, setAxiosHeader] = useState(null);

    useEffect(() => {
        if (user) {
         const axiosConfig = {
            headers: {
                Authorization: user ? `Bearer ${user.token}` : '',
                'Content-Type': 'application/json',
            },
          };
          setAxiosHeader(axiosConfig);
        }
        else {
          setAxiosHeader(null);
        }
    },[user])
    
    const handleFields = (e) => {
        const { name, value } = e.target;
        setGlobalState({...globalState,[name]:value})
    }

    const handleSelect = (value) => {
        setGlobalState({...globalState,isPublic:value})
    }

    const handlePost = () => {
        if (validateFields()) {
            //console.log(boxData);
            const dataToDb = {
               "title": title,
               "content": content,
                "isPublic": isPublic === 'Public' ? true : false
            }
            axios.post("http://localhost:8000/api/thoughts", dataToDb,axiosHeader).then((res) => {
                alert('Content added');
                const newData = [res.data,...globalState.totalData];
                setGlobalState({ ...globalState, totalData: newData,title: '',
                content: '',
                isPublic:'', });
            }).catch((err) => alert(err));
            
        }
    }

    const handleSave = () => {
        if (validateFields()) {
            //console.log(boxData);
            const dataToDb = {
               "title": title,
               "content": content,
                "isPublic": isPublic === 'Public' ? true : false
            }
            const uri = "http://localhost:8000/api/thoughts/"+_id;
            axios.patch(uri, dataToDb,axiosHeader).then((res) => {
                alert('Content updated');
                const deletedIndex = totalData.findIndex(item => item._id === _id);
                const updatedData = [
                    ...totalData.slice(0, deletedIndex),
                    res.data,
                    ...totalData.slice(deletedIndex + 1),
                ];
                setGlobalState({ ...globalState, totalData: updatedData,_id: '', title: '',
                content: '',
                isPublic:'',
                onEdit: false });
            }).catch((err) => alert(err));
            
        }
    }

    const handleCancel = () => {
        setGlobalState({...globalState,_id: '',
        title: '',
        content: '',
        isPublic: '',
        onEdit:false,})
    }

    const validateFields = () => {
        if (title.trim().length===0) {
            alert("Title can't be empty")
            return false;
        }
        if (content.trim().length===0) {
            alert("Content can't be empty")
            return false;
        }
        if (isPublic.trim().length===0) {
            alert("Select Visibility")
            return false;
        }
        return true;
    }

  return (
    <section className={`w-11/12 md:w-8/12 flex flex-col justify-between items-center px-10 py-4 space-y-5 mx-auto`}>
        <Input label="Title" size="lg" color="purple" name="title" value={title} onChange={handleFields}/>
        <Textarea label="Write Something..." size="lg" color="purple" name="content" value={content} onChange={handleFields}/>
        <Select label="Select Visibility" size="lg" color="purple" name="isPublic" value={isPublic} onChange={handleSelect}>
        <Option value="Public">Public</Option>
        <Option value="Private">Private</Option>
        </Select>
        
        {onEdit?(<div className="space-x-4">
            <Button variant="outlined" color="purple" onClick={handleSave}>Save</Button>
            <Button variant="outlined" color="gray" onClick={handleCancel}>Cancel</Button>
        </div>):(<Button variant="outlined" color="purple" onClick={handlePost}>Post</Button>)}
        
    </section>
  )
}

export default InputBoxes