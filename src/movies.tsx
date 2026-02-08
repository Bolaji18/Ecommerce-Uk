import React from "react";
import { useState, useEffect } from "react";

interface Movie {
    Title: string,
    Year: string,
    Rated : string,
    Director: string,
    Plot: string,
    Images: string[],
}

export default function Movies() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
                if(!response.ok){
                    throw new Error("Network response was not ok");
                }
                const data: Movie[] = await response.json();
                setMovies(data);
                setLoading(false);
            }
            catch (error:any) {
                setError(error.message);
                setLoading(false);
            }
            finally{
                setLoading(false);
            }

        }
        fetchMovies();
    }, []);

    if(loading){
        return <div>Loading...</div>;
    }
    if(error){
        return <div>Error: {error}</div>;
    }

    return(
        <div>
            <h1 className="text-5xl text-center mb-8 text-blue-500">Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
                <div onClick={() => {setSelectedMovie(movie); document.getElementById('my_modal_1')?.showModal()}} className="card bg-base-100 w-96 shadow-sm">
            <figure>
             <img
      src={movie.Images[0]}
      alt={movie.Title} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{movie.Title}</h2>
    <p>{movie.Plot}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => setSelectedMovie(movie)}>Buy Now</button>
    </div>
  </div>
</div>
            ))}
            </div>


            {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
   
    <div className="carousel rounded-box w-auto ">
  <div className="carousel-item w-full">
    <img
      src={selectedMovie?.Images[0]}
      className="w-full"
      alt="Tailwind CSS Carousel component" />
  </div>
  <div className="carousel-item w-full">
    <img
      src={selectedMovie?.Images[1]}
      className="w-full"
      alt="Tailwind CSS Carousel component" />
  </div>
  <div className="carousel-item w-full">
    <img
      src={selectedMovie?.Images[2]}
      className="w-full"
      alt="Tailwind CSS Carousel component" />
  </div>
  <div className="carousel-item w-full">
    <img
      src={selectedMovie?.Images[3]}
      className="w-full"
      alt="Tailwind CSS Carousel component" />
  </div>
  
</div>
    <h3 className="font-bold text-lg">{selectedMovie?.Title}</h3>
    <p className="py-4">{selectedMovie?.Plot}</p>
    <p>Directed by: {selectedMovie?.Director}</p>
    <p>Rated: {selectedMovie?.Rated}</p>
    <p>Year: {selectedMovie?.Year}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


        </div>
    )

}