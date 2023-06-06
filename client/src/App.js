import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import JobPost from './Pages/JobsPosting';
import Error from './Pages/Error';
import Main from './Pages/Main';
import ViewDetails from './Pages/ViewDetails'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main></Main>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/job-post" element={<JobPost></JobPost>}></Route>
        <Route path="/view-details" element={<ViewDetails></ViewDetails>}></Route>
        <Route path="/error" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
