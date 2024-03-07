import React, {useEffect, useState} from 'react'

export default function Resume() {
    const [resumeData, setResumeData] = useState(null)
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    function requestResume() {
        fetch('https://tamir.tech/resume', {
            method: 'POST',
            mode: 'cors',
            referrerPolicy: 'same-origin',
            body: JSON.stringify({password: password}),
        }).then(response => {
            if (response.ok) {
                response.text().then((text)=> {
                    setResumeData(text)
                    setAuthenticated(true)
                })
            }
            else if (response.status >= 500 && response.status < 600) {
                alert('Server is down!')
            } else if (response.status == 406) {
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
        <div className=''>
            <p className=''>Resume</p>
            {
                !authenticated ?
                    <div>
                        <label>
                            Password:
                            <input
                                type='password' value={password}
                                onChange={e => setPassword(escape(e.target.value))}
                                autocomplete="off"
                                className="mx-2"
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