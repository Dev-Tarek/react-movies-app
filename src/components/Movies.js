import React, { Component } from 'react';
import Table from './layouts/Table';
import Bar from './layouts/Bar';
import Grid from '@material-ui/core/Grid/Grid';
import {getMovies, deleteMovie, saveMovie} from './../services/fakeMovieService';
import AddForm from './AddForm';

const labels = ['Title', 'Genre', 'Stock', 'Rate', '', ''];

export default class extends Component{
    state = {
        movies: getMovies(),
        likedMovies: [],
    }

    deleteHandler(id){
        // Remove from likes if exists
        const index = this.state.likedMovies.indexOf(id);
        if(index > -1){
            const likedMovies = this.state.likedMovies;
            likedMovies.splice(index,1);
            this.setState({likedMovies: likedMovies});
        }
        // Delete the movie
        deleteMovie(id);
        const movies = getMovies();
        this.setState({
            movies: movies
        });
    }

    likeHandler(mov){
        const movie = mov;
        // console.log(movie);
        const index = this.state.likedMovies.indexOf(movie._id);
        if(index > -1){
            // movie.dailyRentalRate -= 0.5;
            const likedMovies = this.state.likedMovies;
            likedMovies.splice(index,1);
            this.setState({likedMovies: likedMovies});
        }
        else{
            // movie.dailyRentalRate += 0.5;
            const likedMovies = this.state.likedMovies;
            likedMovies.push(movie._id);
            this.setState({likedMovies: likedMovies});
        }
        // saveMovie(movie);
        // const movies = getMovies();
        // this.setState({
        //     movies: movies
        // });
    }

    formHandler(obj){
        const newMovie = {
            name: '',
            genre: '',
            genreId: '',
            numberInStock: '',
        };
        // for(movie in this.state.movies)
        //     if(movie.title === title){
        //         newMovie.id = movie.id;
        //         break;
        //     }
        newMovie.name = obj.name;
        newMovie.genre = obj.genre;
        newMovie.genreId = '5b21ca3eeb7f6fbccd471818';
        newMovie.numberInStock = obj.stock;
        newMovie.dailyRentalRate = Math.round(Math.random()*5);

        saveMovie(newMovie);
        const movies = getMovies();
        this.setState({
            movies: movies
        });
    }

    render() {
        return (
          <Grid container>
            <Grid item md={2} />
            <Grid item xs={12} sm={12} md={8}>
                <Bar color='default' title='Movies Platform' />
                <Table
                    labels={labels}
                    data={this.state.movies}
                    likedList={this.state.likedMovies}
                    delete={this.deleteHandler.bind(this)}
                    like={this.likeHandler.bind(this)}
                />
                <p style={{color: 'pink'}}>Showing {this.state.movies.length} movies in the database.</p>
                <AddForm handle={this.formHandler.bind(this)} />
            </Grid>
            <Grid item md={2} />
          </Grid>
        );
      }
}