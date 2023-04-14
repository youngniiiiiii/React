import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.js';
import Home from './component/Home.js';
import BoardList from './component/board/BoardList';
import BoardWrite from './component/board/BoardWrite';
import ScoreList from './component/score/ScoreList';
import ScoreWrite from './component/score/ScoreWrite';
import HeroList from './component/hero/HeroList';
import HeroWrite from './component/hero/HeroWrite';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path="/board/list" element={<BoardList/>}/>
            <Route path="/board/write" element={<BoardWrite/>}/>
            <Route path="/board/view/:id" element={<BoardWrite/>}/>
            <Route path="/score/list" element={<ScoreList/>}/>
            <Route path="/score/write" element={<ScoreWrite/>}/>
            <Route path="/hero/list" element={<HeroList/>}/>
            <Route path="/hero/write" element={<HeroWrite/>}/>
            <Route path="/hero/view/:id" element={<BoardWrite/>}/>

          </Route>
      </Routes>
    </div>
  );
}

export default App;
