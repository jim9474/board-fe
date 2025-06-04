import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GameBoardListPage from './pages/GameBoardListPage'
import PoliticsBoardListPage from './pages/PoliticsBoardListPage'
import SportsBoardListPage from './pages/SportsBoardListPage'
import StreamingBoardListPage from './pages/StreamingBoardListPage'
import BoardCreateComp from './components/BoardCreateComp'
import BoardDetailPage from './pages/BoardDetailPage'
import CreateUserPage from './pages/CreateUserPage'

function App() {

  return (
    <BrowserRouter>
      <div>      
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<GameBoardListPage />} />
          <Route path='/politics' element={<PoliticsBoardListPage />} />
          <Route path='/streaming' element={<StreamingBoardListPage />} />
          <Route path='/sports' element={<SportsBoardListPage />} />
          <Route path='/create' element={<BoardCreateComp />} />
          <Route path='/detail/:board_id' element={<BoardDetailPage />} />
          <Route path='/createUser' element={<CreateUserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
