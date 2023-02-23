import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Button } from 'react-vant'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <h1>Vite + React</h1>
            <div className="card">
                <Button type='primary' onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
            </div>
        </div>
    )
}

export default App
