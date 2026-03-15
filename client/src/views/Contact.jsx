import React, { useState, useEffect } from 'react'

const DEFAULT_FORM = { email: '', subject: '', message: '' }

function validate(formData) {
    const errors = {}
    if (!formData.email) {
        errors.email = 'Email is required'
    } else if (formData.email.length > 254) {
        errors.email = 'Email is too long'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email'
    }
    if (!formData.subject) {
        errors.subject = 'Subject is required'
    } else if (formData.subject.length > 200) {
        errors.subject = 'Subject must be under 200 characters'
    }
    if (!formData.message) {
        errors.message = 'Message is required'
    } else if (formData.message.length > 5000) {
        errors.message = 'Message must be under 5000 characters'
    }
    return errors
}

export default function Contact() {
    const [formData, setFormData] = useState(() => {
        try { return JSON.parse(localStorage.getItem('contact')) || DEFAULT_FORM }
        catch { return DEFAULT_FORM }
    })
    const [status, setStatus] = useState(() =>
        sessionStorage.getItem('sent') === 'true' ? 'success' : 'idle'
    )
    const [errors, setErrors] = useState({})

    useEffect(() => {
        const t = setTimeout(() => localStorage.setItem('contact', JSON.stringify(formData)), 20)
        return () => clearTimeout(t)
    }, [formData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setErrors(prev => {
            if (!prev[name]) return prev
            const next = { ...prev }
            delete next[name]
            return next
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate(formData)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }
        setStatus('submitting')
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            if (response.ok) {
                sessionStorage.setItem('sent', 'true')
                localStorage.removeItem('contact')
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleSendAnother = () => {
        sessionStorage.removeItem('sent')
        setFormData(DEFAULT_FORM)
        setStatus('idle')
    }

    if (status === 'success') {
        return (
            <section>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">Thanks for messaging!</h2>
                    <button onClick={handleSendAnother} className="button-primary mt-4">Send another</button>
                </div>
            </section>
        )
    }

    if (status === 'error') {
        return (
            <section>
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">Something went wrong</h2>
                    <p className="mb-4 text-black">There was an issue sending your message. Your form data has been preserved.</p>
                    <button onClick={() => setStatus('idle')} className="button-primary mt-4">Try again</button>
                </div>
            </section>
        )
    }

    const isSubmitting = status === 'submitting'

    return (
        <section>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-black">Contact Me</h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-secondary sm:text-xl">
                    <a href="mailto:tamitai147@gmail.com" className="text-black hover:text-white transition">tamitai147@gmail.com</a>
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Your email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="shadow-sm bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 placeholder-gray-500"
                            placeholder="name@email.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-black">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="block p-3 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-600 shadow-sm focus:ring-white focus:border-white placeholder-gray-500"
                            placeholder="Let me know how I can help you"
                        />
                        {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">Your message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows="6"
                            value={formData.message}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg shadow-sm border border-gray-600 focus:ring-white focus:border-white placeholder-gray-500"
                            placeholder="Leave a message..."
                        />
                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button-primary py-3 px-5 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
                    >
                        {isSubmitting && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                </form>
            </div>
        </section>
    )
}
