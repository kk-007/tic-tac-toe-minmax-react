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

function Board() {
    let Board = ['','','','','','','','',''];
    let board = Board.map((e,index)=>(
        <Grid item xs={4} sm={4} key={index}>
                    <Typography variant="h1" component="h1">
                    <Paper
                        style={style.paper}
                        children={e}
                        />
                    </Typography>
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
