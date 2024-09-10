import { Routes, Route } from 'react-router-dom';
import SampleSanity from './pages/SampleSanity';


function App() {
  return (
    <Routes>
      <Route path="/" element={<SampleSanity />} />
      {/* <Route path="/users" element={<ListUsers />} />
      <Route path="/sanity" element={<UsersSanity />} /> */}
    </Routes>
  );
}

export default App;
