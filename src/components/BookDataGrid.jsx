import React from 'react'
import BookDataRow from './BookDataRow'
import { InputGroup, Table } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

function BookDataGrid(props) {
    const defaultData = {
        isbn: "",
        authorName: "",
        authorSurname: "",
        bookName: "",
        description: ""
    }

    const [data, setData] = useState(defaultData)
  
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleCreate = (e) => {
        e.preventDefault()
        console.log(data)
        axios.post(props.url + "/book", data)
            .then((response) => {
                console.log(response)
                props.setReload(true)
                setData(defaultData);
            })
    }
    return (
        <form className='form' >
            <Table hover size='sm' responsive>
                <thead>
                    <tr>
                        <th>isbn</th>
                        <th>Author</th>
                        <th>Book</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr onChange={(e) => { handleChange(e) }}>
                        <td><Form.Control size="sm" label="ISBN" placeholder="ISBN" name="isbn" value={data.isbn} onChange={function () { }} /></td>
                        <td>
                            <InputGroup>
                                <Form.Control size="sm" label="name of Author" placeholder="name of Author" name="authorName" value={data.authorName} onChange={function () { }} />
                                <Form.Control size="sm" label="2nd name of Author" placeholder="2nd name of Author" name="authorSurname" value={data.authorName.Surname} onChange={function () { }} />
                            </InputGroup>
                        </td>
                        <td><Form.Control size="sm" label="name of Book" placeholder="name of Book" name="bookName" value={data.bookName} onChange={function () { }} /></td>
                        <td> <Form.Control size="sm" label="description" placeholder="description" name="description" value={data.description} onChange={function () { }} /></td>
                        <td>
                                <Button  variant="success" size="sm" id="create" onClick={(e) => handleCreate(e)}>Create</Button>
                        </td>

                    </tr>
                    {props.books.map((book) =>
                        <BookDataRow key={book.id} bookData={book} url={props.url} setReload={props.setReload} />
                    )}
                </tbody>
            </Table>
        </form >
    )
}

export default BookDataGrid