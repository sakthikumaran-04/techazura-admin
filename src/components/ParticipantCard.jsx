import { Link } from "react-router-dom"

function ParticipantCard({name , id }) {
  return (
    <Link to={`/participant/${id}`} className="flex justify-between w-full p-4 bg-blue-300 my-2 rounded-md"><p>{name}</p> <p>view</p></Link>
  )
}
export default ParticipantCard