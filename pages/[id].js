import useSWR, { mutate } from 'swr';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import JokeForm from '@/components/JokeForm';

export default function JokeDetailPage() {
  //🆕🆕🆕
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/jokes/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) return;

  // 🆕 Handler function for updating a joke - PUT request
  async function handleEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    console.log('Updated Joke', jokeData);

    const response = await fetch(`api/jokes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jokeData),
    });

    if (response.ok) {
      mutate();
    }
  }

  // 🆕 🆕 Handler function for removing a joke - DELETE request
  async function handleDelete() {
    const response = await fetch(`api/jokes/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.push('/');
      return;
    }
  }

  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.joke} </h1>
      <div>
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}>
          <span role="img" aria-label="A pencil">
            ✏️
          </span>
        </button>
        <button onClick={handleDelete} disabled={isEditMode}>
          <span role="img" aria-label="A cross indicating deletion">
            ❌
          </span>
        </button>
      </div>
      {isEditMode && <JokeForm onSubmit={handleEdit} value={data.joke} isEditMode={true} />}
      <Link href="/">Back to all</Link>
    </>
  );
}
