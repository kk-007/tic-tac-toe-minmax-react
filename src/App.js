import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Board from './components/Board';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));
function App() {
  let classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          TicTacToe
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {'Never Win'}
        </Typography>
        <div>
          <Board/>
          <Typography style={{color:"red",textAlign:"center"}} variant="h4" component="h2" >
            {'Your Turn'}
          </Typography>
        </div>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">Developed By kk007</Typography>
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>
        </Container>
      </footer>
    </div>
  );
}

export default App;
