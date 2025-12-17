import { useState } from 'react';
import { Review } from './Sandbox';

type ReviewFormProps = {
  onSubmit: (review: Review) => void;
};


const Form = ({ onSubmit }: ReviewFormProps) => {
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length >= 10) {
      const newReview = { email, rating, text };
      onSubmit(newReview);
      setEmail('');
      setRating('');
      setText('');
      setError('');
    } else {
      setError('Review must be at least 10 characters long');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-8 space-y-4'>
      <div>
        <label htmlFor='email' className='block mb-2'>
          Email
        </label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>

      <div>
        <label htmlFor='rating' className='block mb-2'>
          Rating
        </label>
        <select
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className='w-full p-2 border rounded'
          required
        >
          <option value=''>Select rating</option>
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} star{num !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='text' className='block mb-2'>
          Your Review
        </label>
        <textarea
          id='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full p-2 border rounded'
          rows={4}
          required
        />
        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>

      <button
        type='submit'
        className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
      >
        Submit Review
      </button>
    </form>
  );
};

export default Form;
