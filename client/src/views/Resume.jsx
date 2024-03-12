import React, {useEffect, useState} from 'react'
import {BiLogoLinkedin} from 'react-icons/bi';

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
                alert('Server is down!')
                throw new Error('unexpected status from server')
            }
        }).catch((e) => {
            alert('Server is down!')
            throw new Error(e)
        })
    }

    return(
        <div className='flex flex-col grow justify-center text-center text-primary pt-1 md:pt-2'>
            <h1 className='text-title pb-1 md:pb-2'>Resume</h1>
            <p className='text-secondary pb-1 md:pb-2'>Ask me for the password</p>
            {!authenticated ?
                <div>
                    <label>
                        Password:
                        <input
                            type='password' value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mx-2 text-black"
                        />
                    </label>
                    <button type='submit' onClick={requestResume}>Submit</button>
                </div>
            :
                <iframe
                    src={`data:application/pdf;base64,${resumeData}`}
                    width="100%"
                    height="600px"
                ></iframe>
            }
        </div>
    )
}