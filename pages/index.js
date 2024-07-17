import useSWR from 'swr';
import Link from 'next/link';
import JokeForm from '../components/JokeForm';

export default function HomePage() {
  const { data, isLoading, mutate } = useSWR('/api/jokes');

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  // Handler function for creating a joke - POST request
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    const response = await fetch('/api/jokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jokeData),
    });

    if (response.ok) {
      mutate();
    }

    event.target.reset();
  }

  return (
    <>
      <JokeForm onSubmit={handleSubmit} value="" />
      <ul>
        {data.map((joke) => (
          <li key={joke._id}>
            <Link href={`/${joke._id}`}>{joke.joke}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
