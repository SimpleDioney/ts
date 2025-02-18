const express = require('express');
const axios = require('axios');
const router = express.Router();

const TMDB_API_KEY = process.env.TMDB_API_KEY || '4ea270f32fe4e8fcdfd68b4cd5a7074f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

const createTMDBRequest = (language = 'pt-BR') => {
  const region = language.split('-')[1] || 'BR';
  return axios.create({
    baseURL: TMDB_BASE_URL,
    params: {
      api_key: TMDB_API_KEY,
      language,
      region,
    },
  });
};

// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const { language } = req.query;
    const response = await createTMDBRequest(language).get('/trending/movie/week');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get top rated movies
router.get('/top-rated', async (req, res) => {
  try {
    const { language } = req.query;
    const response = await createTMDBRequest(language).get('/movie/top_rated');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const { language } = req.query;
    const response = await createTMDBRequest(language).get('/movie/popular');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get now playing movies
router.get('/now-playing', async (req, res) => {
  try {
    const { language } = req.query;
    const response = await createTMDBRequest(language).get('/movie/now_playing');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie genres
router.get('/genres', async (req, res) => {
  try {
    const { language } = req.query;
    const response = await createTMDBRequest(language).get('/genre/movie/list');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie details
router.get('/movie/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const response = await createTMDBRequest(language).get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,watch/providers',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get movie recommendations
router.get('/movie/:id/recommendations', async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const response = await createTMDBRequest(language).get(`/movie/${id}/recommendations`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Discover movies by genre
router.get('/discover', async (req, res) => {
  try {
    const { language, with_genres } = req.query;
    const response = await createTMDBRequest(language).get('/discover/movie', {
      params: {
        with_genres,
        sort_by: 'popularity.desc',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search movies
router.get('/search', async (req, res) => {
  try {
    const { language, query } = req.query;
    const response = await createTMDBRequest(language).get('/search/movie', {
      params: { query },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get actor details
router.get('/actor/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { language } = req.query;
    const response = await createTMDBRequest(language).get(`/person/${id}`, {
      params: {
        append_to_response: 'movie_credits',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;