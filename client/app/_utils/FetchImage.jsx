// utils/fetchImage.js
import axios from 'axios';

const fetchImage = async (query) => {
  try {
    const response = await axios.get('https://real-time-image-search.p.rapidapi.com/search', {
      params: {
        query,
        limit: 1,
        size: 'any',
        color: 'any',
        type: 'any',
        time: 'any',
        usage_rights: 'any',
        file_type: 'any',
        aspect_ratio: 'any',
        safe_search: 'off',
        region: 'us',
      },
      headers: {
        'x-rapidapi-key': '7e41560ba9msh56d7d79162458c3p192511jsn536e5f59de3c',
		'x-rapidapi-host': 'real-time-image-search.p.rapidapi.com'
      },
    });
    return response.data.data.length > 0 ? response.data.data[0].url : null;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
};

export default fetchImage;
