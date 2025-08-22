export default function Button() {

    function handleClick() {
        alert('You clicked me');
    }

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}

/**
 * Event handler: được định nghĩa bên trong component
 * Có tên bắt đầu bằng "handle"
 */

// More concisely
{/* <button onClick={() => {
    alert('You clicked me');
}}>
    Click me
</button> */}

function AlertButton({message, children} : {message: string, children: any}) {
    return (
        <button onClick={() => {
            alert(message);
        }}>
            {children}
        </button>
    );
}

export function Toolbar() {
    return (
        <div>
            <AlertButton message="Playing!">
                Playing
            </AlertButton>

            <AlertButton message="Uploading">
                Uploading
            </AlertButton>
        </div>
    );
}

// Event Propagation
export function AnotherToolbar() {
    return (
        <div className="AnotherToolbar bg-red-300" onClick={() => {
            alert('You clicked the toolbar')
        }}>
            <button className="border-solid rounded mr-5 bg-orange-300" onClick={() => {alert('playing');}}>
                Play Button
            </button>

            <button className="border-solid rounded mr-5 bg-blue-300" onClick={() => {alert('uploading')}}>
                Upload Button
            </button>
        </div>
    );
}


