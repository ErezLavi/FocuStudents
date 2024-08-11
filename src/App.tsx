import { Routes, Route, Navigate} from "react-router-dom";
import TasksPage from "./pages/TasksPage";
import TimerPage from "./pages/TimerPage";
import DataPage from './pages/DataPage';
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";

function App() {

  return (
    <div>
      <Layout >
        <Routes>
          <Route path="/Tasks" element={<TasksPage />}></Route>
          <Route path="/Timer" element={<TimerPage />}></Route>
          <Route path="/Data" element={<DataPage />}></Route>
          <Route path="/Settings" element={<SettingsPage />}></Route>
          <Route path="/login" element ={<LoginPage />}></Route>
          <Route path="*" element={<Navigate to="/Tasks" replace />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
