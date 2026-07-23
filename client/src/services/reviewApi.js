import api from "./api";

export const getReviews = (productId) =>
    api.get(`/reviews/${productId}`);

export const addReview = (productId, review) =>
    api.post(`/reviews/${productId}`, review);