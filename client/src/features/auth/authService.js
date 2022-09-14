import axios from 'axios';
const  API_URL = 'https://mywebdiaries.herokuapp.com/users/create'
const LOGIN_URL = 'https://mywebdiaries.herokuapp.com//users/login'
//Register user

const register = async (userData)=> {
    const response = await axios.post (API_URL, userData)

       
            return response.data
}
//Login user
const login = async (userData)=> {
    const response = await axios.post(LOGIN_URL, userData)
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}
const logout =()=> {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout,
}

export default authService