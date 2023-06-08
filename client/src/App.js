import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import JobPost from './Pages/JobsPosting';
import Error404 from './Pages/RedirectPages/Error404';
import Error500 from './Pages/RedirectPages/Error500';
import Main from './Pages/Main';
import ViewDetails from './Pages/ViewDetails';
import EditJobPost from './Pages/EditJobPosting';
import JobEditSuccess from './Pages/RedirectPages/JobEditSuccess';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/job-post" element={<JobPost></JobPost>}></Route>
        <Route path="/edit-job-post" element={<EditJobPost></EditJobPost>}></Route>
        <Route path="/view-details" element={<ViewDetails></ViewDetails>}></Route>
        <Route path="/error" element={<Error404></Error404>}></Route>
        <Route path="/error-500" element={<Error500></Error500>}></Route>
        <Route path="/job-edit-success" element={<JobEditSuccess></JobEditSuccess>}></Route>
      </Routes>
    </div>
  );
}

export default App;
