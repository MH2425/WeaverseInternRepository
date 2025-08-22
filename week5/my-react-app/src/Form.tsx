import { useState } from "react";

export default function Form() {
    const [isSent, setIsSent] = useState(false);
    const [message, setMessage] = useState('Hi!');

    if (isSent) {
        return <h1>Your message is on its way</h1>
    }

    return (
        <form action=""
              onSubmit={e => {e.preventDefault(); setIsSent(true)}}
        >
            <textarea name="" id=""
                      placeholder="Message"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
            >

            </textarea>
            <button type="submit">Send</button>
        </form>
    );
}
