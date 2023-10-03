import React, {useEffect, useState} from 'react'






export default function Resume() {
    const [resumeData, setResumeData] = useState(null)
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false)

    async function requestResume() {
        const response = await fetch('https://api.tamir.tech/resume', {
            method: "GET",
            body: JSON.stringify({password: password}), // body data type must match "Content-Type" header
        });

        if (response.ok) {
            setResumeData(response.body)
            setAuthenticated(true)
        }
        else if (response.status >= 500 && response.status < 600) {
            alert('Server is down!')
        } else {
            alert('Wrong password!')
        }
    }

    return(
        <div className='h-full text-base lg:text-lg mx-auto mb-5 max-w-7xl px-4 sm:px-6 lg:px-8 flex-col justify-between text-center'>
            <p className='text-lg lg:text-xl font-bold text-black'>Resume</p>
            {
                !authenticated ?
                    <div>
                        <label>
                            password:
                            <input
                                type='password' value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <button type='submit' onClick={requestResume}>Submit</button>
                    </div>
                :
                    <div>
                        <object data={`data:application/pdf;base64,${resumeData}`} type='application/pdf'></object>
                    </div>
            }
            {/*<p className='mt-2 font-medium text-black'>*/}
            {/*    Based out of colorful Colorado, I fill my days outside of coding...outside!*/}
            {/*</p>*/}
            {/*<p className='mt-2 font-medium text-black text-opacity-50'>*/}
            {/*    Some pictures I have taken:*/}
            {/*</p>*/}
            {/*<ImageCarousel images={images} />*/}
        </div>
    )
}