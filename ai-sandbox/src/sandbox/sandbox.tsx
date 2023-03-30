import React, { useState, useEffect } from "react"
import { fetchData } from "../GPTRequests/requests";
import './sandbox.scss'
import { Authenticate } from "../spotify/Authenticate";
import { ISpotifyUser } from "../spotify/Authenticate";
import { useAuth } from "../spotify/context";

const Sandbox = () => {
    //@ts-ignore
    const [spotifyUser, setSpotifyUser] = React.useState<ISpotifyUser>(undefined);
    const [input, setInput] = useState("");
    const [chatGPTResponse, setChatGPTResponse] = useState("");
    const [auth, setToken] = useAuth()
    const [artists, setTopArtists] = useState()
    const token = auth.tokens.spotify

    /**
     * After user authenticates vie <Authenticate/> we will get an access token back from spotify 
     * s/o <a href=https://github.com/Cutaiar/> for the auth logic
     * we then use spotify web api to get users top artists
     */
    useEffect(() => {
        (async () => {
            const artists = await spotifyUser.spotifyApi.getMyTopArtists()
            //@ts-ignore
            setTopArtists(artists)
        })();
    }, [auth.tokens.spotify])

    /**
     * Runs after the artist request is made, we can do CHAT GPT logic from here
     */
    useEffect(() => {
        if (token)
            console.log("here are the mf artists", artists)
    }, [artists])

    /**
     * When we get thre response from GPT we can display info to user here
     */

    useEffect(() => {
        console.log(chatGPTResponse)
    }, [chatGPTResponse])


    /**
     * On click submits an API call to Chat GPT
     * 
     * we don't actually need this just here for example
     */
    const handleClick = async () => {
        try {
            const response = await fetchData(input);
            setChatGPTResponse(response);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * css and html sux ass we can make it pretty tho xD
     */
    return (
        <div className="sandbox-container">
            <Authenticate onConnect={(user) => setSpotifyUser(user)} />
            <h2>Tell me something, and I'll tell you more</h2>
            <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={5}
                placeholder="Type in some words and I'll finish the rest..."
            />
            <button className="button" onClick={handleClick}>Complete Sentence</button>
            {chatGPTResponse && <p>Chat GPT says: {chatGPTResponse}</p>}
        </div>
    );
}

export default Sandbox