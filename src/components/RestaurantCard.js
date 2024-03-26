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
      <div className="res-card">
        <img src={IMG_CDN_URL + cloudinaryImageId} />
        <h3>{name}</h3>
        <span>{cuisines.join(", ")}</span>
        <span>{areaName}</span>
        <span>
        <h4
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