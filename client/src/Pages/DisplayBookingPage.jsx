import { useParams } from "react-router-dom"

export default function DisplayBooking(){
    const {id} = useParams()
    return (
        <div>
            Display Booking Here :{id}
        </div>
    )
}