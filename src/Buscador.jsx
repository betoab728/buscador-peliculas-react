
import { useState } from 'react'
export const Buscador = () => {

    const url_base= 'https://api.themoviedb.org/3/search/movie'
    const api_key = '168a5a37b95a2e9e9e4e05a0868757ed'

    const [busqueda, setBusqueda] = useState('');
    const [peliculas, setPeliculas] = useState([]);

    const handleInputChange = (e) => {
        setBusqueda(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetchPeliculas();
    }

    const fetchPeliculas = async () => {

        //'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=168a5a37b95a2e9e9e4e05a0868757ed'
       
        try {

            const response = await fetch(`${url_base}?query=${busqueda}&api_key=${api_key}`);
            const data = await response.json();

            

            setPeliculas(data.results);

            
        } catch (error) {
            console.error(error);
            
        }
    }

  return (
    <div className="container">
      <h1>Buscador de Peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Buscar..." value={busqueda} onChange={handleInputChange}  />
        <button type="submit" className='search-button'>Buscar</button>
      </form>

            <div> <h2>Resultados</h2></div>
        <div className="movie-list">

            {peliculas.map(pelicula => (
                <div className="movie-card" key={pelicula.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
                    <h2>{pelicula.title}</h2>
                    <p>{pelicula.overview}</p>

                    
                </div>
            ))}
           
        
        </div>
      
    </div>
  )
}
