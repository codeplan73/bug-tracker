import axios from 'axios'

const API_URL = 'api/v1/auth/'

// register user
const register = async(userData)=>{
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}  

// login user
const login = async(userData)=>{
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
 
    return response.data
}
 
// logout user
const logout = () =>{
    localStorage.removeItem('user')
    const response = axios.get(API_URL + 'logout')
    return response.data   
}
    

const authService = {
    login,
    logout,
    register
}

export default authService