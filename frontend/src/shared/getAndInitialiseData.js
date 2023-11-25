import axios from 'axios';

export const getAllData = async () => {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/thoughts")
            .then((res) => {
                const data = res.data;
                //console.log(data); 
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}