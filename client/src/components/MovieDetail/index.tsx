import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalModalContext } from "../../context/Modal";
import toast from "react-hot-toast";
import "./MovieDetail.scss";
import { movieQuery } from "../../actions/movie";

type movieWrapperType = {
  MovieWrapper: {
    [key: string]: string;
  };
};

const toastStyle = {
  style: {
    borderRadius: "10px",
    background: "#333",
    color: "#fff",
  },
};

const MoviesList = () => {
  const { setVisible, setContent } = useContext<any>(GlobalModalContext);

  const [state, setState] = useState<any>({
    movie: [],
  });

  const [isFav, setIsFav] = useState<boolean>(false);
  const [styles, setStyles] = useState<movieWrapperType>({
    MovieWrapper: {
      paddingTop: "50vh",
      backgroundSize: "cover",
    },
  });
  let { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setStyles({
      MovieWrapper: {
        ...styles.MovieWrapper,
        backgroundImage: `url(${state.movie.image})`,
      },
    });
  }, [state.movie.length]);

  useEffect(() => {
    let fav = localStorage.getItem("fav")?.includes(state.movie.id)
      ? true
      : false;

    setIsFav(fav);
  }, [state.movie]);

  const fetchData = async () => {
    const movie = await movieQuery({
      operationName: "Movie",
      query: `query Movie($movieId: String!) {
                movie(id: $movieId) {
                  id
                  title
                  description
                  image
                  genre
                  director {
                    name
                    image
                    description
                  }
                }
              }`,
      variables: {
        movieId: id,
      },
    }).catch((e) => {
      console.log(e);
    });
    setState({
      movie: movie.data.movie,
    });
  };

  return (
    <div>
      <div style={{ position: "relative", ...styles.MovieWrapper }}>
        <div className="movieDetail__movieInfo">
          <div style={{ display: "flex" }}>
            <img
              className="movie__poster"
              src={`${state.movie.image}`}
              alt={state.movie.title}
            />
            <div style={{ marginLeft: "2rem" }}>
              <h5>{state.movie.genre}</h5>
              <p
                onClick={() => {
                  setVisible("block");
                  setContent(state.movie.director);
                }}
                style={{ cursor: "pointer" }}
              >
                {state.movie?.director?.name}
              </p>
              {isFav ? (
                <button
                  onClick={() => {
                    let newFav: string | undefined = localStorage
                      .getItem("fav")
                      ?.split(",")
                      .filter((id) => {
                        console.log(id, state.movie.id);
                        return id.trim() !== state.movie.id;
                      })
                      .join(",");

                    newFav && localStorage.setItem("fav", newFav);
                    setIsFav(false);
                    toast.success("Removed from favourites!", toastStyle);
                  }}
                  className="movieDetail__favouriteButton"
                >
                  Favourite
                </button>
              ) : (
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "fav",
                      `${localStorage.getItem("fav")}, ${state.movie.id}`
                    );
                    setIsFav(true);
                    toast.success("Added as favourite!", toastStyle);
                  }}
                  className="movieDetail__favouriteButton"
                >
                  Add to favourite
                </button>
              )}
            </div>
          </div>

          <div>
            <h2>{state.movie.title}</h2>
            <p>{state.movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MoviesList;
