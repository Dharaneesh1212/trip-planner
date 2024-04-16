import { useDispatch, useSelector } from "react-redux";
import { deleteIt, editIt } from "../app/reducer";
import { useNavigate } from "react-router";

const MyTrip = () => {
// navigate to pages
  const navigate = useNavigate()
  const dispatch = useDispatch();

  // edit function
  const editTrip = (trip) => {
    dispatch(editIt(trip.id));
    navigate("/plantrip", { state: { editData: trip } });
  };

  // delete function
  const deleteTrip = (id) => {
    dispatch(deleteIt(id));
  };

  const plannedTrip = useSelector((state) => state.planning.data);
  console.log(plannedTrip);

  return (
    <main className="flex items-center justify-center h-full w-full">
      <main className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center h-20 text-4xl font-semibold capitalize text-slate-800">
          <h1>My trips</h1>
        </div>
        <div className="h-fit w-fit flex items-center justify-center flex-row flex-wrap gap-8 rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.35)] p-8 m-6">
          {plannedTrip.map((trip) => (
            <div
              key={trip.id}
              className="animate__animated animate__fadeIn flex items-center justify-center flex-col text-xl gap-4 border border-gray-300 rounded-md p-4"
            >
              <p>
                <span className="text-xl font-semibold">Destination : </span>
                {trip.destination}
              </p>
              <p>
                <span className="text-xl font-semibold">Start Date : </span>
                {trip.startDate}
              </p>
              <p>
                <span className="text-xl font-semibold">End Date : </span>
                {trip.endDate}
              </p>
              <p>
                <span className="text-xl font-semibold">Activities : </span>
                {trip.activities.join(", ")}
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => editTrip (trip)}
                  className="animate__animated animate__zoomIn py-2 px-4 bg-green-500 flex items-center justify-center capitalize text-xl rounded-md font-medium text-slate-900 hover:shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTrip (trip.id)}
                  className="animate__animated animate__zoomIn py-2 px-4 bg-red-500 flex items-center justify-center capitalize text-xl rounded-md font-medium text-slate-900 hover:shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </main>
  );
};

export default MyTrip;
