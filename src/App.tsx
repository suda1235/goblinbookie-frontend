import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import SearchResults from './pages/SearchResults.tsx';
import CardDetailPage from './pages/CardDetailPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/card/:uuid" element={<CardDetailPage />} />
      </Routes>
    </Router>
  );
}
export default App;
