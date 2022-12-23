import { Routes, Route } from "react-router-dom"

const Home = () => (
    <h1>Hello world</h1>
);

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ <Home/> } />
            </Routes>
        </div>
    )
}

export default App
