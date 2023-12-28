import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import Layout from '../components/Layout.js';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  const exampleMovies = [
    { title: "Leave the World Behind", year: "2023" },
    { title: "Maestro", year: "2023" },
    { title: "Aquaman", year: "2023" },
    { title: "Napoléon", year: "2023" },
    { title: "Killer of the Flower Moon", year: "2023" },
    { title: "Wonka", year: "2023" },
    { title: "The Boy and the Heron", year: "2023" },
    { title: "The Three Musketeers - Part I: D'Artagnan", year: "2023" },
    { title: "The Hunger Games: The Ballad of Songbirds and Snakes", year: "2023" },
    { title: "Rebel Moon", year: "2023" },
    { title: "The Exorcist", year: "2023" },
    { title: "Saltburn", year: "2023" },
    { title: "Oppenheimer", year: "2023" },
    { title: "The Kill Room", year: "2023" },
    { title: "Manodrome", year: "2023" },
    { title: "The Killer", year: "2023" },
    { title: "The Wonderful Story of Henry Sugar", year: "2023" }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      // Check if there are at least five movies
      if (exampleMovies.length < 5) {
        console.error('Not enough movies in the list');
        return;
      }

      // Shuffle the exampleMovies array and take the first five movies
      const shuffledMovies = [...exampleMovies]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);

      const fetchedMovies = [];

      for (const movie of shuffledMovies) {
        const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&y=${encodeURIComponent(movie.year)}&apikey=aadb27a`);
        const data = await response.json();

        if (data.Response === "True") {
          fetchedMovies.push(data);
        }
      }

      setMovies(fetchedMovies);
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Layout>
      <Head>
        <title>Movie Carousel</title>
        <meta name="description" content="Browse movie information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-lg mx-auto">
        <Slider {...settings}>
          {movies.map((movie, index) => (
            <div key={index} className="p-4 flex">
                <img src={movie.Poster} alt={`Poster of ${movie.Title}`} className="w-64 h-96 object-cover" />
                <div className="w-1/2 ml-4">
                <h3 className="text-lg font-bold">{movie.Title} ({movie.Year})</h3>
                <p className="italic"><strong>Release Date:</strong> {movie.Released}</p>
                <p className="italic"><strong>Synopsis:</strong> {movie.Plot}</p>
                <p className="italic"><strong>Genres:</strong> {movie.Genre}</p>
                <p className="italic"><strong>Actors:</strong> {movie.Actors}</p>
                <p className="italic"><strong>Director:</strong> {movie.Director}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </Layout>
  );
};

export default MovieCarousel;