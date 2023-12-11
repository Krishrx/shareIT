import axios from 'axios';

export const getAllData = async (user) => {

    const axiosConfig = {
        headers: {
            Authorization: user ? `Bearer ${user.token}` : '',
            'Content-Type': 'application/json',
        },
    };
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/api/thoughts",axiosConfig)
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