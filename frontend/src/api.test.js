import axios from 'axios';
import { getGenres } from './api';

jest.mock('axios');

describe('getGenres', () => {
  it('fetches genres successfully from an API and calls setGenres', async () => {
    const data = [{ name: 'Action' }, { name: 'Adventure' }];
    axios.get.mockResolvedValue({ data });

    const setGenres = jest.fn();

    await getGenres(setGenres);

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/genres');
    expect(setGenres).toHaveBeenCalledWith(data);
    console.log(data);
  });

  it('logs an error message when the API call fails', async () => {
    const errorMessage = 'Network Error';
    console.error = jest.fn();
    axios.get.mockRejectedValue(new Error(errorMessage));

    const setGenres = jest.fn();

    await getGenres(setGenres);

    expect(console.error).toHaveBeenCalledWith('Error fetching genres:', new Error(errorMessage));
  });
});