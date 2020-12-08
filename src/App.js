import { useState } from 'react'
import uuid from 'react-uuid'
import Note from './components/Nota';

function App() {
  const [classAlert, setClassAlert] = useState('')
  const [name, setName] = useState('')
  const [note, setNote] = useState('')
  const [percentage, setPercentage] = useState('')
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState([])

  const addNote = () => {
    if (note && percentage) {
      setNotes([...notes, { id: uuid(), note: parseFloat(note), percentage: parseFloat(percentage) }])
    }
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  const calculate = (e) => {
    e.preventDefault()
    const info = { name, notes }
    fetch(process.env.REACT_APP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setClassAlert('alert-danger')
        } else {
          setClassAlert('alert-success')
        }
        setMessage(res.message)
      })
      .catch(console.error)
  }

  return (
    <>
      <nav className="navbar navbar-light bg-dark d-flex color-white justify-content-center align-items-center">
        <a className="navbar-brand" href="/">
          <h3 style={{ color: 'white' }}>¡Calcula tu nota!</h3>
        </a>
      </nav>
      <div className="container d-flex justify-content-center">
        <div className="card " style={{ width: '900px', maxWidth: '100%', marginTop: '80px', padding: '50px' }}>
          <h5 className="card-header" style={{ padding: '20px' }}>Ingresa información de curso</h5>
          <div className="card-body">
            <div className="">
              <form>
                <div className="form-group">
                  <label htmlFor="validation01">Nombre</label>
                  <input type="text" className="form-control" value={name}
                    onChange={({ target }) => setName(target.value)} placeholder="Nombre " required />
                </div>
                <div className="form-group mt-2 mb-4">
                  <div className="mt-3 mb-3">
                    <div>Ingresa las notas</div>
                  </div>

                  <div className="row">
                    <div className="col-md-5">
                      <input type="number" className="form-control" name="value" value={note} max="5" min="0"
                        onChange={({ target }) => setNote(target.value)} id="validation02" placeholder="Nota" required />
                    </div>
                    <div className="col-md-5">
                      <input type="number" className="form-control" name="percentage" value={percentage} max="100" min="0"
                        onChange={({ target }) => setPercentage(target.value)} id="validation02" placeholder="Porcentaje" required />
                    </div>
                    <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer' }} onClick={addNote}>
                      <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus-circle-fill" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-md-10 mt-3 " >
                    <ul className="list-group">
                      {notes.map(note => <Note key={note.id} {...note} deleteNote={deleteNote} />)}
                    </ul>
                  </div>
                </div>
                <button type="submit" className="btn btn-dark" onClick={calculate}>Calcular</button>
              </form>
              <div className={`alert mt-3 ${classAlert}`} role="alert">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
