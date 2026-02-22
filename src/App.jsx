import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Subscription from './pages/Subscription';
import Device from './pages/Device';
import EasyAccess from './pages/EasyAccess';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Subscription />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/device" element={<Device />} />
        <Route path="/easy-access" element={<EasyAccess />} />
      </Routes>
    </Layout>
  );
}

export default App;
