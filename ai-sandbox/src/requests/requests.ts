import axios from "axios";


export const fetchData = async (input: string) => {
    const response = await axios.post(
        "https://api.openai.com/v1/chat/completions", {
        messages: [{ "role": "user", "content": `${input}` }],
        model: 'gpt-3.5-turbo', //latest model, we have a few to choose from
        max_tokens: 50,
        n: 1,
        stop: ".",
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
    }
    );



    return response.data.choices[0].message.content;
};