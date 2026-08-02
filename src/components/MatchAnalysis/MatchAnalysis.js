import { useEffect, useRef, useState } from 'react'

export default function MatchAnalysis({ analysisData, generateAnalysis, generateReply }) {
    const [analysisText, setAnalysisText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState('')
    const [sending, setSending] = useState(false)
    const [chatError, setChatError] = useState('')
    const [analysisHeight, setAnalysisHeight] = useState(140)
    const [isResizing, setIsResizing] = useState(false)
    const panelRef = useRef(null)

    useEffect(() => {
        let isActive = true

        const runAnalysis = async () => {
            if (!analysisData) {
                setAnalysisText('No analysis data was returned from the backend yet.')
                setError('')
                setLoading(false)
                setMessages([])
                return
            }

            setLoading(true)
            setError('')
            setChatError('')
            setMessages([])

            try {
                const result = await generateAnalysis(analysisData)
                if (isActive) {
                    setAnalysisText(result)
                }
            } catch (analysisError) {
                if (isActive) {
                    setError(analysisError.message || 'Unable to generate analysis.')
                    setAnalysisText('')
                }
            } finally {
                if (isActive) {
                    setLoading(false)
                }
            }
        }

        runAnalysis()

        return () => {
            isActive = false
        }
    }, [analysisData, generateAnalysis])

    useEffect(() => {
        if (!isResizing) {
            return undefined
        }

        const handlePointerMove = (event) => {
            if (!panelRef.current) {
                return
            }

            const rect = panelRef.current.getBoundingClientRect()
            const minHeight = 90
            const maxHeight = Math.max(minHeight, rect.height - 220)
            const nextHeight = event.clientY - rect.top - 48
            const clampedHeight = Math.min(Math.max(nextHeight, minHeight), maxHeight)

            setAnalysisHeight(clampedHeight)
        }

        const handlePointerUp = () => {
            setIsResizing(false)
        }

        window.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('pointerup', handlePointerUp)
        window.addEventListener('pointercancel', handlePointerUp)

        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
            window.removeEventListener('pointercancel', handlePointerUp)
        }
    }, [isResizing])

    const handleResizePointerDown = (event) => {
        event.preventDefault()
        setIsResizing(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const message = chatInput.trim()
        if (!message || loading || sending || error || !analysisData) {
            return
        }

        const nextConversation = [...messages, { role: 'user', content: message }]
        setMessages(nextConversation)
        setChatInput('')
        setSending(true)
        setChatError('')

        try {
            const reply = await generateReply(analysisData, analysisText, nextConversation, message)
            setMessages((currentMessages) => [...currentMessages, { role: 'assistant', content: reply }])
        } catch (replyError) {
            setChatError(replyError.message || 'Unable to generate a reply.')
        } finally {
            setSending(false)
        }
    }

    return (
        <aside className="match-analysis flex-container" ref={panelRef}>
            <div className="match-analysis-title">AI Analysis</div>
            <div className="match-analysis-summary" style={{ height: `${analysisHeight}px` }}>
                {loading ? (
                    <div className="match-analysis-message">Generating analysis...</div>
                ) : null}
                {error ? (
                    <div className="match-analysis-error">{error}</div>
                ) : null}
                {!loading && !error ? (
                    <div className="match-analysis-body">{analysisText || 'Waiting for analysis data.'}</div>
                ) : null}
            </div>
            <div
                className={`match-analysis-resizer ${isResizing ? 'active' : ''}`}
                onPointerDown={handleResizePointerDown}
                role="separator"
                aria-orientation="horizontal"
                aria-label="Resize analysis and chat sections"
            />
            <div className="match-analysis-chat">
                <div className="match-analysis-chat-title">Chat</div>
                <div className="match-analysis-chat-log">
                    {messages.length === 0 ? (
                        <div className="match-analysis-chat-empty">Ask about the analysis, your items, your KDA, lane phase, or what to improve.</div>
                    ) : null}
                    {messages.map((message, index) => (
                        <div key={index} className={`match-analysis-chat-message ${message.role}`}>
                            {message.content}
                        </div>
                    ))}
                </div>
                {chatError ? (
                    <div className="match-analysis-error">{chatError}</div>
                ) : null}
                <form className="match-analysis-chat-form" onSubmit={handleSubmit}>
                    <textarea
                        className="match-analysis-chat-input"
                        value={chatInput}
                        onChange={(event) => setChatInput(event.target.value)}
                        placeholder="Ask a follow-up question about the analysis..."
                        rows="3"
                    />
                    <button className="match-analysis-chat-button" type="submit" disabled={sending || loading}>
                        {sending ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </aside>
    )
}