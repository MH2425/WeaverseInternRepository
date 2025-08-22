export default function Signup() {
    return(
        <form onSubmit={e => {
            e.preventDefault(); // Stop form to refresh the page whenever user click send button
            alert('Submitting')
        }}>
            <input type="text" />
            <button>Send</button>
        </form>
    );
}