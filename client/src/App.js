import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import JobPost from './Pages/JobsPosting';
import Error from './Pages/Error';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/job-post" element={<JobPost></JobPost>}></Route>
        <Route path="/error" element={<Error></Error>}></Route>
      </Routes>
    </div>
  );
}

export default App;
