import { Route,BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./components/HomePage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
