import { useState } from 'react'
import './App.css'

function App () {
  const [textJs, setTextJs] = useState('')
  const [textFormated, setTextFormated] = useState('')

  const formatJson = () => {
    const textFormatedJson = customStringify(textJs)
    setTextFormated(textFormatedJson)
  }
  const formatJs = () => {
    const textFormatedJs = textFormated.replace(/\\r\\n/g, '\n').replace(/\\"/g, '"')
    setTextJs(textFormatedJs)
    console.log(textFormatedJs)
  }

  function customStringify (obj: string) {
    const formattedJsonString = obj.replace(/\n/g, '\\r\\n').replace(/"/g, '\\"')
    return formattedJsonString
  }
  return (
    <>
      <h1>Formateador</h1>
      <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'space-between' }}>
        {/* <input type="text" /> */}
        <div style={{ width: '40%', position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0, top: 5 }}>

            <CopyButton text={textJs} />
          </div>
          <textarea placeholder='js' value={textJs} onChange={(e) => { setTextJs(e.target.value) }} name="" id="" style={{ width: '100%', height: '100%', resize: 'none' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
          <button style={{ height: '40px' }} onClick={formatJson}>de JS a Json ➡️</button>
          <button style={{ height: '40px' }} onClick={formatJs}>⬅️ de Json a Js</button>
        </div>
        <div style={{ width: '40%', position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0, top: 5 }}>

            <CopyButton text={textFormated} />
          </div>
          <textarea placeholder='json' value={textFormated} onChange={(e) => { setTextFormated(e.target.value) }} name="" id="" style={{ width: '100%', height: '100%', resize: 'none' }} />

        </div>

      </div>
    </>
  )
}

export default App

function CopyButton (props: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(props.text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Error al copiar al portapapeles:', error)
    }
  }

  return (
    <div>
      <button onClick={handleCopyClick}>{copied ? 'Copiado' : 'Copiar'}</button>
    </div>
  )
}
