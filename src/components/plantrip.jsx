import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { planIt } from "../app/reducer";
import { useNavigate } from "react-router";

const PlanTrip = () => {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const size = data.length;

  // after clicking on plan it button on this page user is directly navigated to the my trip page
  const navigate = useNavigate()

  const [planningTrip, setPlanningTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    activities: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newTrip = type === "checkbox" ? checked ? e.target.nextSibling.textContent : "" : value;
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
    const { destination, startDate, endDate, activities } = planningTrip;
    if (destination && startDate && endDate && activities.length > 0) {
      const newId = Date.now();
      const newData = { ...planningTrip, id: newId };
      dispatch(planIt(newData));
      setPlanningTrip({
        destination: "",
        startDate: "",
        endDate: "",
        activities: [],
      });
      navigate("/mytrip");
      // console.log(newData);
    } else {
      alert("Please fill out all fields and select atleast one activities.");
    }
  };

  // console.log(planTrip);
  // console.log(planningTrip);

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
              >
                <option value="">select</option>
                <option>Tamil Nadu, kodaikanal</option>
                <option>Tamil Nadu, ooty</option>
                <option>Tamil Nadu, hogenakkal</option>
                <option>Tamil Nadu, coonoor</option>
                <option>Tamil Nadu, kolli hills</option>
                <option>Tamil Nadu, yercaud</option>
                <option>Tamil Nadu, valparai</option>
                <option>Kerala, munnar</option>
                <option>Kerala, keralamkundu</option>
                <option>Kerala, alleppey</option>
                <option>Kerala, athirapilly</option>
                <option>Kerala, varkala</option>
                <option>Karnataka, chikmagalur</option>
                <option>Karnataka, coorg</option>
                <option>Karnataka, hampi</option>
                <option>Karnataka, dandeli</option>
                <option>Karnataka, sakleshpura</option>
                <option>Goa, jalvane falls</option>
                <option>Maharashtra, lonavala</option>
                <option>Maharashtra, mahabaleshwar</option>
                <option>Maharashtra, igtapuri</option>
                <option>Maharashtra, rajmachi</option>
                <option>Maharashtra, malshej ghat</option>
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
