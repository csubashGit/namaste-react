import { IMG_CDN_URL } from "../utils/constants";
// Restaurant card component: Image, name, cuisine
const RestaurantCard = ({
    cloudinaryImageId,
    name,
    cuisines,
    areaName,
    sla,
    costForTwo,
    avgRatingString,
  }) => {
    return (
      <div className="m-2 p-2 w-[240px] bg-gray-100 rounded-sm hover:bg-gray-300  ease-in-out duration-150">
        <img className="h-[150px] w-[100%] rounded-md" src={IMG_CDN_URL + cloudinaryImageId} />
        <div className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{name}</div>
        <div className="overflow-hidden whitespace-nowrap text-ellipsis">{cuisines.join(", ")}</div>
        <div>{areaName}</div>
        <span className="flex space-x-2">
        <h4 className="flex"
          style={
            avgRatingString < 4
              ? { backgroundColor: "var(--light-red)" }
              : avgRatingString === "--"
                ? { backgroundColor: "white", color: "black" }
                : { color: "black" }
          }
        >
          <i className="fa-solid fa-star"></i>
          {avgRatingString}
        </h4>
          <h4>•</h4>
          <h4>{sla?.lastMileTravelString ?? '2.0 km'}</h4>
          <h4>•</h4>
          <h4>{costForTwo ?? '₹200 for two'}</h4>
        </span>
      </div>
    );
  };

export default RestaurantCard