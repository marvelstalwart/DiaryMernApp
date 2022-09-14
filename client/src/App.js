import './App.css';
import Header from './components/header/Header';
import Posts from './components/posts/Posts';
import Notes from './components/notes/Notes';
import SingleNote from './components/notes/note/SingleNote';
import Life from './components/pages/life/Life';
import School from './components/pages/school/School';
import Work from './components/pages/work/Work';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Sidebar from './sidebar/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Layout from './sidebar/Layout';
import NotFound from './components/pages/404/NotFound';
import SignIn from './components/pages/signup/SignIn';
import NewEntry from './components/pages/newentry/NewEntry';
import SignUp from './components/pages/signup/SignUp';
import Welcome from './Welcome';
function App() {
  return (
    <body className='bg-white w-screen h-full font-nunito'>

   
    <div className="App flex ">
    {/* <Header/> */}
    
    <Router>
    
   
    
      <Routes>
      <Route element={<Layout hideHeaderPaths={["/sign-in", "/welcome", "/sign-up"]}/>}>
      <Route path='/' exact element={<Notes/>}/>
      <Route path='/new-entry' element={<NewEntry/>}/>
      <Route path='/edit/:id' element={<NewEntry/>}/>
      <Route path='/life' element={<Life/>}/>
      <Route path='/work' element={<Work/>}/>
      <Route path='/school' element={<School/>}/>
      <Route path='/sign-in' element={<SignIn/>}/>
      <Route path='/sign-up' element={<SignUp/>}/>
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/entry/:id' element={<SingleNote/>}/>
      </Route>
        
      
     </Routes>
    </Router>
   <ToastContainer/>
    </div>
    </body>
  );
}

export default App;
