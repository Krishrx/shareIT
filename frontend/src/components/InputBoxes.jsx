import { Input,Textarea,Select,Option,Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
function InputBoxes() {
    const [boxData, setBoxData] = useState({
        title: '',
        content: '',
        isPublic:'',
    })

    const handleFields = (e) => {
        const { name, value } = e.target;
        setBoxData({...boxData,[name]:value})
    }

    const handleSelect = (value) => {
        setBoxData({...boxData,isPublic:value})
    }

    const handlePost = () => {
        if (validateFields()) {
            //console.log(boxData);
            const dataToDb = {
               "title": boxData.title,
               "content": boxData.content,
                "isPublic": boxData.isPublic === 'Public' ? true : false
            }
            axios.post("http://localhost:8000/thoughts", dataToDb).then((res) => alert('Content added', res)).catch((err) => alert(err));
            setBoxData({...boxData,
                title: '',
                content: '',
                isPublic:'',
            })
        }
    }

    // const handleSave = () => {
        
    // }

    // const handleCancel = () => {
        
    // }

    const validateFields = () => {
        const { title, content, isPublic } = boxData;
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
    <section className={`flex flex-col justify-between items-center px-10 py-4 space-y-5`}>
          <Input label="Title" size="lg" color="purple" name="title" value={boxData.title} onChange={handleFields}/>
        <Textarea label="Write Something..." size="lg" color="purple" name="content" value={boxData.content} onChange={handleFields}/>
        <Select label="Select Visibility" size="lg" color="purple" name="isPublic" value={boxData.isPublic} onChange={handleSelect}>
        <Option value="Public">Public</Option>
        <Option value="Private">Private</Option>
        </Select>
        <Button variant="outlined" color="purple" onClick={handlePost}>Post</Button>
        {/* <div className="space-x-4">
            <Button variant="outlined" color="purple" onClick={handleSave}>Save</Button>
            <Button variant="outlined" color="gray" onClick={handleCancel}>Cancel</Button>
        </div> */}
    </section>
  )
}

export default InputBoxes