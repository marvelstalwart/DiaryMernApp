import Axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => Axios.get(url);