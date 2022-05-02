import BookDataGrid from './components/BookDataGrid';
import './App.css';
import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Search from './components/Search';
import Export from './components/Export';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar'


function App() {
  const url = "http://localhost:8080"
  const [books, setBooks] = useState([])
  const [findTrigger, setFindTrigger] = useState(false)
  const [reload, setReload] = useState(false)



  useEffect(() => {
    reqBook()
  }, [])

  const reqBook = () => {
    axios.post(url + "/books")
      .then((response) => {
        setBooks(response.data)
        console.log(response)
      })
  }
  const handleClick = () => {
    reqBook()
    setFindTrigger(false)
  }

  if (reload) {
    reqBook()
    setFindTrigger(false)
    setReload(false)
  }

  return (
    <div className="App">
      <Navbar>
        <Container>

          <Navbar.Brand className='mx-2'>Book Library</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Item className=''>
              <Export className='align-middle' url={url}></Export>
            </Nav.Item>
            <Nav.Item className='mx-3'>
              <Search url={url} setFindTrigger={setFindTrigger} setBooks={setBooks} />
            </Nav.Item>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container >
        <BookDataGrid url={url} books={books} setReload={setReload} setBooks={setBooks} />
        {findTrigger ? <Button size='sm' onClick={handleClick}>Back</Button> : <></>}
      </Container>

    </div >
  );
}
export default App;
