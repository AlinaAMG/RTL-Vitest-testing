import { useState } from 'react';
import Form from './Form';
import List from './List';

export type Review = {
  email: string,
  rating: string,
  text:string,
}


const Sandbox = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
 
  const addReview = (review: Review) => {
    setReviews([...reviews, review]);
}

  return (
    <div className='max-w-xl p-8 mx-auto'>
      <h1 className='mb-8 text-2xl font-bold'>Reviews App</h1>
      <Form onSubmit={addReview} />
      <List reviews={reviews} />
      </div>
  )
};
export default Sandbox;
