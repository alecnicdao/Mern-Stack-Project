import React, { useContext, useState } from 'react'
import { FaThumbsUp } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import Modal from 'react-modal'
import { PlayerContext } from './PlayerList'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format } from 'date-fns'
toast.configure()

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function Player(props){
  let { players, setPlayers, authenticated, setAuthenticated } = useContext(PlayerContext)
  let [modalOpen, setModalOpen] = useState(false)
  const history = useHistory()
  const onLike = props.onLike
    const p = props.player
    const deletePlayer = () => {
      fetch(`/api/players/${p.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'same-origin',
      }).then(() => {
          toast('Successfully submitted', {
              onClose: () => {
                  document.location = "/players"
              }
          })

          setModalOpen(false)
      }).catch((error) => {
          toast('Failed to submit', {
              onClose: () => {
                  document.location = "/players"
              }
          })
      })
    }
    return (
      <>
        <div className="card">
          <img src={p.poster} alt={p.name}/>
          <h2>{p.name}</h2>
          <h3>{p.team}</h3>
          <p>{p.description} <strong>DOB</strong>: {format(p.birthdate, 'MM/dd/yyyy')}</p>
          <ul className="extra">
            <li><strong>{p.rating}</strong> rating</li>
            <li><strong>{p.allstarVotes}</strong> '20 all-star votes</li>
            <li>
      <FaThumbsUp color="black" onClick={onLike}/> <small>{p.likes ? p.likes : 0}</small>
            </li>
          </ul>
          <button className="primary" onClick={() => history.push(`/players/${p.id}/edit`)}>Edit</button>
          <button className="primary" onClick={() => {
            if(authenticated) setModalOpen(true)
            else document.location = '/signin'
          }}>Delete</button>
        </div>

        <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}
              style={customStyles} contentLabel="Are you sure?">
            <p>Are you sure you want to delete this player?</p>
            <button className="primary" onClick={deletePlayer}>Confirm Delete</button>
            <button className="primary" onClick={() => setModalOpen(false)}>Cancel</button>
        </Modal>
      </>
    )
  }