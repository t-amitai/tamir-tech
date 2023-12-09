import React, {useEffect, useState} from 'react'

export default function Resume() {
    const [resumeData, setResumeData] = useState(null)
    const [password, setPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    function requestResume() {
        fetch('https://api.tamir.tech/resume', {
            method: "POST",
            body: JSON.stringify({password: password}), // body data type must match "Content-Type" header
        }).then(response => {
            if (response.ok) {
                response.text().then((text)=> {
                    setResumeData(text)
                    setAuthenticated(true)
                })
            }
            else if (response.status >= 500 && response.status < 600) {
                alert('Server is down!')
            } else if (response.status == 401) {
                alert('Wrong password!')
            } else {
                throw new Error('unexpected status from server')
            }
        }).catch((e) => {
            alert('Server is down!')
            throw new Error(e)
        })
    }

    return(
        <div className='h-full text-base lg:text-lg mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8 flex-col justify-between text-center'>
            <p className='text-lg lg:text-xl font-bold text-black'>Resume</p>
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