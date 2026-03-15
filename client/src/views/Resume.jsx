import React, {useEffect, useState} from 'react'
import {BiXCircle} from 'react-icons/bi';
import { Link } from 'react-router-dom';

export default function Resume() {
    const [resumeData, setResumeData] = useState(null)
    const [password, setPassword] = useState('')
    const checkIfAuthenticated = () => {
        const resume = sessionStorage.getItem('resume')
        if (resume) {
            setResumeData(resume)
            return true
        }
        return false
    }
    const [authenticated, setAuthenticated] = useState(checkIfAuthenticated)
    function requestResume(e) {
        e.preventDefault()
        fetch('/resume', {
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password: password}),
        }).then(response => {
            if (response.ok) {
                response.text().then((text)=> {
                    sessionStorage.setItem('resume', text)
                    setResumeData(text)
                    setAuthenticated(true)
                })
            }
            else if (response.status >= 500 && response.status < 600) {
                alert('Server is down!')
            } else if (response.status == 401) {
                alert('Wrong password!')
            } else {
                alert('Something is wrong with the server.')
                throw new Error('unexpected status from server')
            }
        }).catch((e) => {
            alert('Uncaught error')
            throw new Error(e)
        })
    }

    return(
        <div className='flex flex-col grow justify-center text-center text-body pt-2 sm:pt-3 md:pt-4'>
            <h1 className='text-title pb-2 sm:pb-3 md:pb-4'>Resume</h1>
            <p className={`text-muted pb-2 sm:pb-3 md:pb-4 ${authenticated?'hidden':''}`}>Ask me for the password</p>
            {!authenticated ?
                <div>
                    <label>
                        Password:
                        <input
                            type='password' value={password}
                            onChange={e => setPassword(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') requestResume(e) }}
                            className="mx-2 text-black rounded-lg p-1.5 sm:p-2"
                        />
                    </label>
                    <button type='submit' onClick={requestResume} className='button-primary'>Submit</button>
                </div>
            :
            <div className='text-title'>
                <Link to='/'>
                    <BiXCircle />
                </Link>
                <iframe
                    src={`data:application/pdf;base64,${resumeData}`}
                    className="w-full h-[50vh] sm:h-[65vh] md:h-[80vh]"
                ></iframe>
            </div>
            }
        </div>
    )
}