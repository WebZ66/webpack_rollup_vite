import React, { memo, useState } from 'react'

const App = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            App Count:{count}
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    )
}

export default App
