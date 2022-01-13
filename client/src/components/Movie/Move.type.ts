export interface MovieProps {
  movie: {
    id: string;
    image: string;
    title: string;
    genre: string;
    director: {
      name: string;
    };
  };
}
