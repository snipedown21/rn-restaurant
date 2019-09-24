import { useEffect, useState } from 'react';
import yelp from '../apis/yelp';
import businesses from '../samples/businesses';

const SAMPLES = true;

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    if(SAMPLES) {
      setResults(businesses);
    }
    else {
      try {
        const response = await yelp.get('/search', {
          params: {
            term: searchTerm,
            location: 'san jose',
            limit: 50
          }
        });
        setResults(response.data.businesses);
      } catch(err) {
          setErrorMessage('Something went wrong');
      }
    }
  }

  useEffect(() => {
    searchApi('some initial businesses');
  }, []);

  return [searchApi, results, errorMessage];
};
