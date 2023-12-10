import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const getAllData = async () => {
    const { user } = useAuthContext();
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:8000/api/thoughts")
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