import React, { useState, useEffect } from "react"
import { fetchData } from "../requests/requests";
import './sandbox.scss'
const Sandbox = () => {

    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    useEffect(() => {
        console.log(response)

    }, [response])

    const handleClick = async () => {
        try {
            const response = await fetchData(input);
            setResponse(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="sandbox-container">
            <h2>Tell me something, and I'll tell you more</h2>
            <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={5}
                placeholder="Type in some words and I'll finish the rest..."
            />
            <button className="button" onClick={handleClick}>Complete Sentence</button>
            {response && <p>Chat GPT says: {response}</p>}
        </div>
    );
}


export default Sandbox