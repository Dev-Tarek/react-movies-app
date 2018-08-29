import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Select from './Select';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import LikedIcon from '@material-ui/icons/Favorite';
import UpArrow from '@material-ui/icons/ArrowDropUp';
import DownArrow from '@material-ui/icons/ArrowDropDown';

const fontSizeHead = 18;
const fontSizeCell = 16;

export default class TableComponent extends React.Component{
    state = {
        style: {
            paper: {
                color: 'white',
                marginTop: '10px',
                overflowY: 'auto',
                overflowX: 'auto',
            },
            table:{
                overflowX: 'scroll',
            },
            tableHeadCell: {
                color: 'white',
                fontSize: fontSizeHead,
                cursor: 'pointer',
            },
            tableBodyCell:{
                color: 'black',
                fontSize: fontSizeCell,
                textAlign: 'left'
            },
            tableHead: {
                backgroundColor: 'maroon',
            },
        },
        data: this.props.data,
        page: 0,
        rowsPerPage: 5,
        sortIndex: 0,
        selectedGenre: null,
    }

    sorter(index){
        const data = this.state.data;
        let sortIndex = this.state.sortIndex;
        let reverse = false;

        if(sortIndex > 0 && index+1 === sortIndex){
            reverse = true;
            sortIndex *= -1;
        }
        else
            sortIndex = index + 1;

        switch(index + 1){
            case 1:
                reverse?
                    data.sort((a, b) => a.title < b.title):
                    data.sort((a, b) => a.title > b.title);
                break;
            case 2:
                reverse?
                    data.sort((a, b) => a.genre.name < b.genre.name):
                    data.sort((a, b) => a.genre.name > b.genre.name);
                break;
            case 3: 
                reverse?
                    data.sort((a, b) => a.numberInStock < b.numberInStock):
                    data.sort((a, b) => a.numberInStock > b.numberInStock);
                break;
            case 4: 
                reverse?
                    data.sort((a, b) => a.dailyRentalRate < b.dailyRentalRate):
                    data.sort((a, b) => a.dailyRentalRate > b.dailyRentalRate);
                break;
            default: break;
        }
        this.setState({
            data: data,
            sortIndex: sortIndex,
        });
    }

    handleGenreSelect(genre){
        if(genre === 'All')
            this.setState({selectedGenre: null});
        else
            this.setState({selectedGenre: genre});
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    
    render(){
        const {style, data, page, rowsPerPage, sortIndex} = this.state;

        const filteredData = data
        .filter(movie => this.state.selectedGenre? movie.genre.name === this.state.selectedGenre : movie)
        
        const tableData = filteredData
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(item => 
            <TableRow key={item._id}>
                <TableCell style={style.tableBodyCell} numeric component='th' scope='row'> {item.title || item.name} </TableCell>
                <TableCell style={style.tableBodyCell} numeric> {item.genre.name} </TableCell>
                <TableCell style={style.tableBodyCell} numeric> {item.numberInStock} </TableCell>
                <TableCell style={style.tableBodyCell} numeric> {item.dailyRentalRate} </TableCell>
                <TableCell style={style.tableBodyCell} numeric> 
                    <IconButton aria-label="Like" onClick={() => this.props.like(item)}>
                        {this.props.likedList.includes(item._id)? <LikedIcon color='secondary' /> : <LikeIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={style.tableBodyCell} numeric> 
                    <IconButton aria-label="Delete" onClick={() => this.props.delete(item._id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )
        return (
            <div>
            <Select
                button='Select Genre'
                name='Genre'
                items={this.props.genres}
                handle={this.handleGenreSelect.bind(this)}
            />
            <Paper style={style.paper}>
                <Table >
                    <TableHead style={style.tableHead}>
                        <TableRow>
                        {this.props.labels.map((label, index) => 
                            <TableCell
                                style={style.tableHeadCell}
                                key={index}
                                onClick={this.sorter.bind(this, index)}
                                padding='dense'
                            >
                                {label}
                                {index+1 === Math.abs(sortIndex) && index<4?
                                 sortIndex > 0? <DownArrow/>:<UpArrow/>
                                 :null
                                }
                            </TableCell>
                        )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{'aria-label': 'Previous Page',}}
                    nextIconButtonProps={{'aria-label': 'Next Page',}}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            </div>
        )
    }
}