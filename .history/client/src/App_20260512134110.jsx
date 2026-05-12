import { BrowserRouter, Route, Routes } from 'react-router'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App