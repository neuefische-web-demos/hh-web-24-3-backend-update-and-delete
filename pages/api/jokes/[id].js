import dbConnect from '../../../db/connect';
import Joke from '../../../db/models/Joke';

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === 'GET') {
    const joke = await Joke.findById(id);

    if (!joke) {
      return response.status(404).json({ status: 'Not Found' });
    }

    response.status(200).json(joke);
  }

  // Todo -- define PUT Route for updating a joke

  if (request.method === 'PUT') {
    try {
      // neue Joke
      const updatedJoke = request.body;
      await Joke.findByIdAndUpdate(id, updatedJoke);
      return response.status(200).json({ status: 'Joke updated' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  // Todo -- define DELETE Route for removing a a Joke

  if (request.method === 'DELETE') {
    try {
      await Joke.findByIdAndDelete(id);
      return response.status(200).json({ message: 'Joke deleted' });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
