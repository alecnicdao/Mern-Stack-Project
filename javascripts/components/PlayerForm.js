import React, { useContext, useState } from 'react'
import { PlayerContext } from './PlayerList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

toast.configure()

export function VHelp({message}){
    return <p className="help">{message}</p>
}

const validationSchema = yup.object({
    year: yup.number().required().min(1946).max(new Date().getFullYear()),
    name: yup.string().required(),
    team: yup.string().required(),
    description: yup.string().required(),
    position: yup.string().required(),
    number: yup.number().required().max(99),
    nickname: yup.string().required(),
    rating: yup.number().required(),
    birthdate: yup.date().required(),
    drafted: yup.number().required().min(1946).max(new Date().getFullYear()),
    allstarVotes: yup.number().required().max(9000000),
    poster: yup.string().url().required()
})

export default function PlayerForm(){
    let { players, setPlayers, authenticated, setAuthenticated } = useContext(PlayerContext)
    let {pid} = useParams()

    if(!authenticated){
        document.location = '/signin'
        return <></>
    }

    let player = pid ? players.find(p => p.id == pid) : {}
    let is_new = pid === undefined
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: is_new ? {
            year: "",
            name: "",
            team: "",
            description: "",
            position: "",
            number: "",
            nickname: "",
            rating: "",
            birthdate: "",
            drafted: "",
            allstarVotes: "",
            poster: "",
        } : {...player},
        validationSchema,
        onSubmit(values){
            fetch(`api/players${is_new ? '' : '/' + player.id}`, {
                method: is_new ?"POST" : "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'same-origin',
                body: JSON.stringify(values)
            }).then(() => {
                toast('Successfully submitted', {
                    onClose: () => {
                        document.location = "/players"
                    }
                })
            }).catch((error) => {
                toast('Failed to submit', {
                    onClose: () => {
                        document.location = "/players"
                    }
                })
            })
        }
    })

    const history = useHistory()

    return (
        <form onSubmit={handleSubmit}>
            <h1>Adding/Editing a player</h1>
            <div className="field">
                <label htmlFor="year">Year</label>
                <div className="control">
                    <input type="text" name="year" value={values.year} onChange={handleChange}/>
                    <VHelp message={errors.year}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="name">Name</label>
                <div className="control">
                    <input type="text" name="name" value={values.name} onChange={handleChange}/>
                    <VHelp message={errors.name}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="team">Team</label>
                <div className="control">
                    <input type="text" name="team" value={values.team} onChange={handleChange}/>
                    <VHelp message={errors.team}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="description">Description</label>
                <div className="control">
                    <textarea name="description" value={values.description} onChange={handleChange}></textarea>
                    <VHelp message={errors.description}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="position">Position</label>
                <div className="control">
                    <input type="text" name="position" value={values.position} onChange={handleChange}/>
                    <VHelp message={errors.position}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="number">Number</label>
                <div className="control">
                    <input type="text" name="number" value={values.number} onChange={handleChange}/>
                    <VHelp message={errors.number}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="nickname">Nickname</label>
                <div className="control">
                    <input type="text" name="nickname" value={values.nickname} onChange={handleChange}/>
                    <VHelp message={errors.nickname}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="rating">Rating</label>
                <div className="control">
                    <input type="text" name="rating" value={values.rating} onChange={handleChange}/>
                    <VHelp message={errors.rating}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="birthdate">Birthdate</label>
                <div className="control">
                    <DatePicker name="birthdate" selected={values.birthdate} onChange={date => setFieldValue('birthdate', date)}/>
                    <VHelp message={errors.birthdate}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="drafted">Drafted</label>
                <div className="control">
                    <input type="text" name="drafted" value={values.drafted} onChange={handleChange}/>
                    <VHelp message={errors.drafted}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="allstarVotes">'20 All-Star votes</label>
                <div className="control">
                    <input type="text" name="allstarVotes" value={values.allstarVotes} onChange={handleChange}/>
                    <VHelp message={errors.allstarVotes}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="poster">Poster</label>
                <div className="control">
                    <input type="url" name="poster" value={values.poster} onChange={handleChange}/>
                    <VHelp message={errors.poster}/>
                </div>
            </div>

            <div className="field">
                <label></label>
                <div className="control">
                    <button className="primary">Submit</button>
                    <button className="primary" onClick={() => history.push('/players')}>Cancel</button>
                </div>
            </div>
        </form>
    )
}