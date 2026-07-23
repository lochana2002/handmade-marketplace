function ProductReviews({ reviews = [] }) {

  return (

    <div className="mt-10">

      <h2
        className="
          text-2xl
          font-bold
          text-gray-900
          mb-6
        "
      >
        Customer Reviews
      </h2>


      {
        reviews.length === 0 ? (

          <p className="text-gray-500">
            No reviews yet. Be the first to review this product.
          </p>

        ) : (


          <div className="space-y-5">

            {
              reviews.map((review)=>(

                <div
                  key={review._id}
                  className="
                    bg-white
                    rounded-xl
                    shadow
                    border
                    p-5
                  "
                >


                  <h4
                    className="
                      font-semibold
                      text-gray-800
                    "
                  >
                    {review.user?.name || "Anonymous"}
                  </h4>



                  <p
                    className="
                      text-yellow-500
                      mt-2
                    "
                  >
                    {"⭐".repeat(review.rating)}
                  </p>



                  <p
                    className="
                      text-gray-600
                      mt-3
                    "
                  >
                    {review.comment}
                  </p>



                </div>

              ))
            }

          </div>


        )
      }


    </div>

  );

}

export default ProductReviews;