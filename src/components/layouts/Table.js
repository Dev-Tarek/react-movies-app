import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LikeIcon from '@material-ui/icons/FavoriteBorder';
import LikedIcon from '@material-ui/icons/Favorite';

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
                fontSize: 20,
            },
            tableBodyCell:{
                color: 'black',
                fontSize: 16,
                textAlign: 'left'
            },
            tableHead: {
                backgroundColor: 'maroon',
            },
        },
    }

    render(){ 
        const cellStyle = this.state.style.tableBodyCell;
        
        const tableData = this.props.data.map( (item, index) => 
            <TableRow key={item._id}>
                <TableCell style={cellStyle} numeric component='th' scope='row'> {item.title || item.name} </TableCell>
                <TableCell style={cellStyle} numeric> {item.genre.name} </TableCell>
                <TableCell style={cellStyle} numeric> {item.numberInStock} </TableCell>
                <TableCell style={cellStyle} numeric> {item.dailyRentalRate} </TableCell>
                <TableCell style={cellStyle} numeric> 
                    <IconButton aria-label="Like" onClick={() => this.props.like(item)}>
                        {this.props.likedList.includes(item._id)? <LikedIcon color='secondary' /> : <LikeIcon />}
                    </IconButton>
                </TableCell>
                <TableCell style={cellStyle} numeric> 
                    <IconButton aria-label="Delete" onClick={() => this.props.delete(item._id)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        )

        return (
        <Paper style={this.state.style.paper}>
            <Table >
                <TableHead style={this.state.style.tableHead}>
                <TableRow>
                    {this.props.labels.map(label => 
                        <TableCell style={this.state.style.tableHeadCell} key={label}>{label}</TableCell>
                    )}
                </TableRow>

                </TableHead>
                <TableBody>
                    {tableData}
                </TableBody>
            </Table>
        </Paper>
        )
    }
}



    /* render table items dynamically 
        {Object.keys(item).slice(2,6).map(cell => 
            <TableCell numeric style={item.clicked ? this.state.style.selectedCell : null}>
                {item[cell]}
            </TableCell>    
        )}
    */