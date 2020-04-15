import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

  const style={
      paper:{
          height:"110px",
          margin:"auto",
          textAlign:"center",
          background:"#555"
      }
  }
function Board(props) {
    // let Board = ['','','','','','','','',''];
    let board = [...props.board[0],...props.board[1],...props.board[2]].map((e,index)=>(
        <Grid item xs={4} sm={4} key={index}>
            <div onClick={()=>props.handleClick(index)} >
                    <Typography variant="h1" component="h1" onClick = {props.hadleClick}>
                    <Paper
                        style={style.paper}
                        children={e}
                        />
                    </Typography>
                    </div>
                </Grid>

    ));
    return (
        <div>
            <Grid container spacing={1}>
                {board}
            </Grid>
        </div>
    )
}
;
export default Board;
