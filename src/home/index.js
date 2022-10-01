import React from "react";
import { Link } from "react-router-dom";
import './index.css'
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null
          
        };
    }
    
    componentDidMount() {
        this.getMovies()
    }

    getMovies = async () => {
        try {
            let response = await fetch("https://hoblist.com/api/movieList", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    category: "movies",
                    language: "kannada",
                    sort: "voting",
                    genre: "all"
                })
            }).then(res => res.json());
            console.log("responsep==", response)

            if (response) {
                console.log("responsep inside", response.result)
                this.setState({
                    movies: response.result
                })

            }
        } catch (error) {
            console.log("get movies error", error)
        }
    }
    showMovies = () => {
        console.log("movies state", this.state.movies)
        return this.state.movies? this.state.movies.map(movie => {
            return(
            <div className="movie-conatainer-card">
                <div className="votes">
                    <p>{movie.totalVoted}</p>
                </div>
                <div className="poster" >
                    <img src={movie.poster} alt="" />
                </div>
                <div className="description" >
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Director:</strong> {movie.genre}</p>
                    <p><strong>Starring:</strong> {movie.stars.map(star=>star)}</p>
                    <p><strong>{movie.pageViews} | Voted By {movie.voting} </strong></p>
                </div>
            </div>)
        }): <p>No movies</p>
     }
    render() {
        

        return (
            <div className="home-container">
                <Link to="/company" className="company"> Company Information</Link>
            
               {this.showMovies()}


            </div>
        )
    }
}