export default function Note({ id, note, percentage, deleteNote }) {
  return (
    <li className="list-group-item ">
      <div className="row">
        <div className="col-md-10 row">
          <div className="col-md-6">
            <strong>Nota: </strong>{note}
          </div>
          <div className="col-md-6">
            <strong>Porcentaje: </strong>{percentage}%
          </div>
        </div>
        <div className="col-md-2 d-flex justify-content-center align-items-center" style={{ cursor: 'pointer' }} onClick={() => deleteNote(id)} >
          <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-dash-circle-fill" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
          </svg>
        </div>
      </div>
    </li>
  )
}