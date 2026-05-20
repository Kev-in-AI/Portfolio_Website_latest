import { useEffect, useRef, useState } from 'react'
import './GuguChat.css'

const starterMessages = [
  {
    role: 'assistant',
    content: "Hi, I'm Gugu. Ask me about Kevin's projects, skills, education, or why I think he's wildly hireable."
  }
]

const quickPrompts = [
  'What is Kevin strongest at?',
  'Summarise his projects',
  'Why hire Kevin?'
]

const readJsonResponse = async (response) => {
  const responseText = await response.text()
  const localViteHint = window.location.port === '3000'
    ? ' If you are local, run npm run dev:gugu so the local chat API is available.'
    : ''

  if (!responseText) {
    throw new Error(
      response.ok
        ? 'Gugu returned an empty response.'
        : `Gugu endpoint returned ${response.status || 'an error'} with an empty body.${localViteHint || ' If you are local, run npm run dev:gugu and use http://localhost:3000.'}`
    )
  }

  try {
    return JSON.parse(responseText)
  } catch {
    throw new Error(
      response.ok
        ? 'Gugu returned a non-JSON response.'
        : `Gugu endpoint returned ${response.status} ${response.statusText || ''}.${localViteHint || ' If you are local, run npm run dev:gugu and use http://localhost:3000.'}`
    )
  }
}

const GuguChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(starterMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 120)
    }
  }, [isOpen])

  const sendMessage = async (messageText = input) => {
    const trimmedMessage = messageText.trim()
    if (!trimmedMessage || isLoading) return

    const nextMessages = [
      ...messages,
      { role: 'user', content: trimmedMessage }
    ]

    setMessages(nextMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      })

      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.error || 'Gugu is unavailable right now.')
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'assistant', content: data.reply }
      ])
    } catch (error) {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: 'assistant',
          content: error.message || "Gugu hit a tiny robot-speed bump. Try again in a moment."
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage()
  }

  return (
    <div className="gugu-chat">
      <button
        type="button"
        className={`gugu-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="gugu-chat-panel"
      >
        <span className="gugu-trigger-orb" aria-hidden="true" />
        <span className="gugu-trigger-label">Ask Gugu</span>
      </button>

      {isOpen && (
        <div id="gugu-chat-panel" className="gugu-panel">
          <div className="gugu-panel-header">
            <div>
              <span className="gugu-kicker">Portfolio assistant</span>
              <h3>Gugu</h3>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Gugu chat">
              &times;
            </button>
          </div>

          <div className="gugu-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`gugu-message ${message.role}`}>
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="gugu-message assistant loading">
                <span />
                <span />
                <span />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="gugu-quick-prompts">
            {quickPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={isLoading}>
                {prompt}
              </button>
            ))}
          </div>

          <form className="gugu-input-row" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Kevin..."
              maxLength={500}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default GuguChat
