import React, { Component } from "react";
import { movieQuery } from "../../actions/movie";
import Movie from "../../components/Movie";
import "./MovieList.scss";

// A show case of class component and life-cycle methods

export type movieType = {
  id: string;
  image: string;
  title: string;
  genre: string;
  director: {
    name: string;
  };
};

class MoviesList extends Component {
  state = {
    movies: [],
  };

  async componentDidMount() {
    const movies = await movieQuery({
      operationName: "Movies",
      query: `query Movies {
            movies {
              id
              title
              image
              description
              genre
              director {
                name
                description
                image
              }
            }
          }`,
    }).catch((e) => {
      console.log(e);
    });

    this.setState({
      movies: movies.data.movies,
    });
  }

  render() {
    return (
      <div className="movieList__movieGrid">
        {this.state.movies.map((movie: movieType) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

export default MoviesList;
