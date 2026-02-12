import axios from "axios";

const accessTime = 54000 * 60

setTimeout(() => {
    setInterval(async() => {
        localStorage.removeItem('token')
        const res = await axios.post('/refresh', {}, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        localStorage.setItem('token', res.data.token)
        
    },accessTime)
}, accessTime)