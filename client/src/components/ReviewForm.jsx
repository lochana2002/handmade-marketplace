import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { addReview } from "../services/reviewApi";

function ReviewForm({ productId, onReviewAdded }) {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");


  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await addReview(productId, {
        rating,
        comment,
      });


      setRating(5);
      setComment("");


      alert("Review submitted successfully");


      if(onReviewAdded){
        onReviewAdded();
      }


    } catch(error){

      alert(
        error.response?.data?.message ||
        "Failed to submit review"
      );

    }

  };



  return (

    <form
      onSubmit={submitHandler}
      className="
        mt-8
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        space-y-5
      "
    >


      <h3 className="
        text-xl
        font-bold
      ">
        Write a Review
      </h3>



      {/* STAR RATING */}

      <div>

        <p className="
          font-semibold
          mb-3
        ">
          Your Rating
        </p>


        <div className="
          flex
          gap-2
        ">

          {
            [1,2,3,4,5].map((star)=>(

              <FaStar

                key={star}

                onClick={() => setRating(star)}

                className={`
                  cursor-pointer
                  text-3xl
                  transition
                  ${
                    star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                  }

                  hover:scale-110
                `}

              />

            ))
          }


        </div>


      </div>




      {/* COMMENT */}

      <textarea

        value={comment}

        onChange={(e)=>setComment(e.target.value)}

        placeholder="Write your review..."

        required

        className="
          w-full
          border
          rounded-xl
          p-4
          h-32
          focus:outline-none
          focus:ring-2
          focus:ring-orange-400
        "

      />





      <button

        type="submit"

        className="
          bg-gradient-to-r
          from-orange-500
          to-amber-500
          text-white
          px-6
          py-3
          rounded-xl
          font-semibold
          hover:scale-105
          transition
        "

      >

        Submit Review

      </button>



    </form>

  );

}

export default ReviewForm;