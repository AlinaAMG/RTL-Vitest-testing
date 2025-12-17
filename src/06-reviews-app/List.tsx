import { type Review } from './Sandbox';

export type ReviewsProps = {
  reviews: Review[];
};

const List = ({ reviews }: ReviewsProps) => {
  return (
    <div className="mt-8 ">
      <h2 className="mb-4 text-xl font-bold">Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review, index) => {
          return (
            <article key={index} className="p-4 mb-4 border rounded">
              <div className="font-bold">{review.email}</div>
              <div className="text-yellow-500">
                {'⭐'.repeat(Number(review.rating))}
                  </div>
                  <p className="mt-2">{review.text}</p>
            </article>
          );
        })
      )}
    </div>
  );
};

export default List;
