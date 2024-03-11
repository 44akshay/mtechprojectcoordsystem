import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import Login from "./components/Login";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
