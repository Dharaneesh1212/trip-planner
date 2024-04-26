import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planIt, editIt } from "../app/reducer";
import { useNavigate, useLocation } from "react-router";

const PlanTrip = () => {
  const data = useSelector((state) => state.planning.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const size = data.length;

  // after clicking on plan it button on this page user is directly navigated to the my trip page
  const navigate = useNavigate();

  const [planningTrip, setPlanningTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    activities: [],
  });

  useEffect(() => {
    if (location.state && location.state.editData) {
      setPlanningTrip(location.state.editData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newTrip =
      type === "checkbox"
        ? checked
          ? e.target.nextSibling.textContent
          : ""
        : value;
    setPlanningTrip((prevState) => ({
      ...prevState,
      [name]: newTrip,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPlanningTrip((prevState) => ({
      ...prevState,
      activities: checked
        ? [...prevState.activities, name]
        : prevState.activities.filter((activity) => activity !== name),
    }));
  };

  // function for creating a trip
  const planTrip = () => {
    try {
      const { destination, startDate, endDate, activities } = planningTrip;
      if (destination && startDate && endDate && activities.length > 0) {
        if (startDate > endDate) {
          alert("Start date cannot be later than end date.");
          return;
        }

        if (location.state && location.state.editData) {
          const editedTrip = { ...planningTrip };
          dispatch(editIt(editedTrip));
        } else {
          const newId = Date.now();
          const newData = { ...planningTrip, id: newId };
          dispatch(planIt(newData));
        }
        navigate("/mytrip");
      } else {
        alert("Please fill out all fields and select at least one activity.");
      }
    } catch (error) {
      if (error) {
        alert("An error occurred. Please try again.");
        console.log(error);
      } else {
        alert("Please fill out all fields and select at least one activity.");
        console.log(error);
      }
    }

    // console.log(planningTrip);
  };

  return (
    <main className="flex items-center justify-center h-full w-full">
      <main className="flex items-center justify-center flex-col">
        <div className="flex items-center justify-center h-20 text-4xl font-semibold capitalize text-slate-800">
          <h1>Plan your trip</h1>
        </div>
        <main
          onChange={(e) => handleChange(e)}
          className="h-fit w-fit flex items-center justify-center flex-col gap-8 rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.35)] p-8 m-6"
        >
          <div id="plansub" className="flex flex-wrap">
            {/* to destination */}
            <div className="flex items-center justify-center flex-col">
              <p className="capitalize text-xl font-semibold animate__animated animate__zoomIn">
                destination
              </p>
              <select
                onChange={(e) => handleChange(e)}
                required
                className="capitalize outline-none w-full p-4 text-lg animate__animated animate__zoomIn"
                name="destination"
                id="destination"
                value={planningTrip.destination}
              >
                <option value="">select</option>
                <option>kodaikanal, Tamil Nadu</option>
                <option>ooty,Tamil Nadu</option>
                <option>hogenakkal,Tamil Nadu</option>
                <option>coonoor,Tamil Nadu</option>
                <option>kolli hills,Tamil Nadu</option>
                <option>yercaud,Tamil Nadu</option>
                <option>valparai,Tamil Nadu</option>
                <option>munnar,Kerala</option>
                <option>Keralamkundu,Kerala</option>
                <option>alleppey,Kerala</option>
                <option>athirapilly,Kerala</option>
                <option>varkala,Kerala</option>
                <option>chikmagalur,Karnataka</option>
                <option>coorg,Karnataka</option>
                <option>hampi,Karnataka</option>
                <option>dandeli,Karnataka</option>
                <option>sakleshpura,Karnataka</option>
                <option>jalvane falls,Goa</option>
                <option>lonavala,Maharashtra</option>
                <option>mahabaleshwar,Maharashtra</option>
                <option>igtapuri,Maharashtra</option>
                <option>rajmachi,Maharashtra</option>
                <option>malshej ghat,Maharashtra</option>
              </select>
            </div>
            {/*start Date */}
            <div className="flex items-center justify-center flex-col">
              <p className="capitalize text-xl font-semibold animate__animated animate__zoomIn">
                start Date
              </p>
              <span>
                <input
                  onChange={(e) => handleChange(e)}
                  required
                  name="startDate"
                  className="outline-none w-full p-4 text-lg animate__animated animate__zoomIn"
                  type="date"
                  value={planningTrip.startDate}
                />
              </span>
            </div>
            {/* end date */}
            <div className="flex items-center justify-center flex-col">
              <p className="capitalize text-xl font-semibold animate__animated animate__zoomIn">
                end Date
              </p>
              <span>
                <input
                  required
                  onChange={(e) => handleChange(e)}
                  name="endDate"
                  className="outline-none w-full p-4 text-lg animate__animated animate__zoomIn"
                  type="date"
                  value={planningTrip.endDate}
                />
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-center flex-col">
              <p className="capitalize text-xl font-semibold animate__animated animate__zoomIn">
                activities
              </p>
              <form
                onChange={(e) => handleChange(e)}
                required
                action=""
                name="activities"
                className="capitalize w-full pt-2 flex gap-8 text-lg animate__animated animate__zoomIn"
              >
                <div action="">
                  <input
                    name="campfire"
                    type="checkbox"
                    checked={planningTrip.activities.includes("campfire")}
                    onChange={handleCheckboxChange}
                    id="campfire"
                  />
                  <label> campfire</label>
                  <br />
                  <input
                    name="djnight"
                    type="checkbox"
                    checked={planningTrip.activities.includes("djnight")}
                    onChange={handleCheckboxChange}
                    id="djnight"
                  />
                  <label> djnight</label>
                  <br />
                  <input
                    name="jeepsafari"
                    type="checkbox"
                    checked={planningTrip.activities.includes("jeepsafari")}
                    onChange={handleCheckboxChange}
                    id="jeepsafari"
                  />
                  <label> jeepsafari</label>
                  <br />
                  <input
                    name="trekking"
                    type="checkbox"
                    checked={planningTrip.activities.includes("trekking")}
                    onChange={handleCheckboxChange}
                    id="trekking"
                  />
                  <label> trekking</label>
                  <br />
                </div>
                <div action="">
                  <input
                    name="viewpoint"
                    type="checkbox"
                    checked={planningTrip.activities.includes("viewpoint")}
                    onChange={handleCheckboxChange}
                    id="viewpoint"
                  />
                  <label> viewpoint</label>
                  <br />
                  <input
                    name="touristvisit"
                    type="checkbox"
                    checked={planningTrip.activities.includes("touristvisit")}
                    onChange={handleCheckboxChange}
                    id="touristvisit"
                  />
                  <label> touristvisit</label>
                  <br />
                  <input
                    name="shopping"
                    type="checkbox"
                    checked={planningTrip.activities.includes("shopping")}
                    onChange={handleCheckboxChange}
                    id="shopping"
                  />
                  <label> shopping</label>
                  <br />
                  <input
                    name="bunjijumping"
                    type="checkbox"
                    checked={planningTrip.activities.includes("bunjijumping")}
                    onChange={handleCheckboxChange}
                    id="bunjijumping"
                  />
                  <label> bunjijumping</label>
                </div>
              </form>
            </div>
          </div>
          <div>
            <button
              onClick={planTrip}
              className="animate__animated animate__zoomIn py-2 px-4 bg-sky-600 flex items-center justify-center capitalize text-xl rounded-md font-medium text-slate-900 hover:shadow-[0_5px_15px_rgba(0,0,0,0.35)]"
            >
              plan it
            </button>
          </div>
        </main>
      </main>
    </main>
  );
};

export default PlanTrip;
