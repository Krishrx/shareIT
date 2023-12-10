import axios from 'axios';

export const getAllData = async (user) => {
    
    axios.interceptors.request.use(
        config => {
            const authToken = user.token;

            if (authToken) {
                config.headers.Authorization = `Bearer ${authToken}`;
            }

            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

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