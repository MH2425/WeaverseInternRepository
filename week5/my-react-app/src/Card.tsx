import profilePic from "./assets/profile.jpg"

function Card() {
    return(
        <div className="border rounded-md shadow-sm w-60 text-center justify-items-center">
            <img className="w-36 rounded-2xl" src={profilePic} alt="My profile picture " />
            <hr className="mt-3 border-gray-700" />
            <h2 className="font-extrabold">Minh Hoang</h2>
            <p className="pb-5">I study Computer Science & Mathematics</p>
        </div>
    );
}

export default Card;