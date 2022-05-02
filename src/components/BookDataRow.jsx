import axios from 'axios'
import { useState } from 'react'
import { Button, InputGroup, Stack } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'




function BookDataRow(props) {
    const [allowUpdate, setAllowUpdate] = useState(true)
    const [bookUpdate, setBookUpdate] = useState(props.bookData)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (e) => {
        console.log(e)
        let id = props.bookData.id
        console.log("delete fired with id " + id)
        axios.delete(props.url + "/book?id="+id)
            .then((response) => {
                console.log(response)
                setShow(false)
                props.setReload(true)
            })
    }
    const handleUpdate = () => {
        setAllowUpdate(false)

    }
    const handleOK = () => {
        let id = props.bookData.id
        let data = bookUpdate
        setAllowUpdate(true)
        axios.patch(props.url + "/book?id=" + id, data)
            .then((response) => console.log(response))
            .catch((error) => {handleCancel()})
    }
    const handleCancel = () => {
        setAllowUpdate(true)
        setBookUpdate(props.bookData)
    }
    const handleChange = (e) => {
        let name = e.target.name
        setBookUpdate({ ...bookUpdate, [name]: e.target.value })
        e.target.value = bookUpdate[name]

        console.log(bookUpdate)
    }
    return (
        <>
            <tr onChange={(e) => { handleChange(e) }}>
                <td><Form.Control size="sm" name="isbn" value={bookUpdate.isbn} disabled={allowUpdate} /></td>
                <td>
                    <InputGroup>
                        <Form.Control size="sm" name="authorName" value={bookUpdate.authorName} disabled={allowUpdate} />
                        <Form.Control size="sm" name="authorSurname" value={bookUpdate.authorSurname} disabled={allowUpdate} />
                    </InputGroup>
                </td>
                <td><Form.Control size="sm" name="bookName" value={bookUpdate.bookName} disabled={allowUpdate} /></td>
                <td><Form.Control size="sm" name="description" value={bookUpdate.description} disabled={allowUpdate} /></td>
                <td>
                    <Stack direction='horizontal' className="justify-content-md-center" gap={1}>
            
                        {allowUpdate ? <Button size='sm' variant="danger" onClick={(e) => { handleShow(e) }}>&nbsp;Delete&nbsp;</Button> : <Button size='sm' variant="success" onClick={(e) => { handleOK(e) }}>Confirm</Button>}
                        {allowUpdate ? <Button size='sm' onClick={(e) => { handleUpdate(e) }}>Update</Button> : <Button size='sm' onClick={handleCancel}>Cancel</Button>}
                  
                    </Stack>
                </td>
            </tr>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header>
                    <Modal.Title>Delete Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Stack direction='vertical' gap={2}>
                        <Form.Control size="sm" name="isbn" value={bookUpdate.isbn} disabled={true} />
                        <Form.Control size="sm" name="authorName" value={bookUpdate.authorName} disabled={true} />
                        <Form.Control size="sm" name="authorSurname" value={bookUpdate.authorSurname} disabled={true} />
                        <Form.Control size="sm" name="bookName" value={bookUpdate.bookName} disabled={true} />
                        <Form.Control size="sm" name="description" value={bookUpdate.description} disabled={true} />
                    </Stack>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Confirm delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BookDataRow