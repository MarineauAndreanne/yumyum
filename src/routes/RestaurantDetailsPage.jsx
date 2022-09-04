import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import RestaurantFinder from "../api/RestaurantFinder"
import { RestaurantsContext } from "../context/RestaurantsContext"
import Reviews from "../components/Reviews"
import AddReviews from "../components/AddReviews"
import StarRating from "../components/StarRating"

const RestaurantDetailsPage = () => {
  const { id } = useParams()
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`)

        setSelectedRestaurant(response.data.data)
      } catch (error) {}
    }
    fetchData()
  }, [])
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1 font-weight-light my-4">
            {selectedRestaurant.restaurant[0].name}
          </h1>
          <div className="text-center">
            <StarRating
              rating={selectedRestaurant.restaurant[0].average_rating}
            />
            <span className="text-warning ml-1">
              {selectedRestaurant.restaurant[0].count
                ? `(${selectedRestaurant.restaurant[0].count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReviews />
        </>
      )}
    </div>
  )
}

export default RestaurantDetailsPage
