import { useEffect, useState } from 'react'

export default function MatchAnalysis({ analysisData, generateAnalysis }) {
    const [analysisText, setAnalysisText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        let isActive = true

        const runAnalysis = async () => {
            if (!analysisData) {
                setAnalysisText('No analysis data was returned from the backend yet.')
                setError('')
                setLoading(false)
                return
            }

            setLoading(true)
            setError('')

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

    return (
        <aside className="match-analysis flex-container">
            <div className="match-analysis-title">AI Analysis</div>
            {loading ? (
                <div className="match-analysis-message">Generating analysis...</div>
            ) : null}
            {error ? (
                <div className="match-analysis-error">{error}</div>
            ) : null}
            {!loading && !error ? (
                <div className="match-analysis-body">{analysisText || 'Waiting for analysis data.'}</div>
            ) : null}
        </aside>
    )
}