import React, { useState, useContext } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import RestaurantFinder from "../api/RestaurantFinder"
import { RestaurantsContext } from "../context/RestaurantsContext"
import { generateUUID } from "../utils"

const AddReviews = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const { setSelectedRestaurant, selectedRestaurant } =
    useContext(RestaurantsContext)

  const [name, setName] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState("1")

  const handleSubmitReview = async (e) => {
    e.preventDefault()

    const optimisticUUID = generateUUID()

    setSelectedRestaurant({
      ...selectedRestaurant,
      reviews: [
        ...selectedRestaurant.reviews,
        {
          name,
          review: reviewText,
          rating,
          optimisticUUID,
        },
      ],
    })

    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      })

      setSelectedRestaurant({
        ...selectedRestaurant,
        reviews: [...selectedRestaurant.reviews, response.data.data.review],
      })

      setName("")
      setReviewText("")
      setRating("1")
    } catch (e) {
      setSelectedRestaurant({
        ...selectedRestaurant,
        reviews: selectedRestaurant.reviews.filter(
          (r) => r.optimisticUUID !== optimisticUUID
        ),
      })
    }
  }

  return (
    <div className="mb-2">
      <form>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="from-control"
            style={{ width: "100%", resize: "none" }}
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default AddReviews
