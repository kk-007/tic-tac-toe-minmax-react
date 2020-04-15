import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Board from './components/Board';
import Button from '@material-ui/core/Button';

const ai = 'X';
const human = 'O';
const SCORE = {
	X: 1,
	O: -1,
	TIE: 0
};

const getIJ =  [{i:0,j:0},{i:0,j:1},{i:0,j:2},{i:1,j:0},{i:1,j:1},{i:1,j:2},{i:2,j:0},{i:2,j:1},{i:2,j:2}];
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      board:[['','',''],['','',''],['','','']],
      msg:"It's Your Turn",
      count:0,
      newGame:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.aiTurn = this.aiTurn.bind(this);
    this.handleWinner = this.handleWinner.bind(this);
    this.startNewGame=this.startNewGame.bind(this);
  }

  startNewGame(){
    this.setState({
      board:[['','',''],['','',''],['','','']],
      msg:"It's Your Turn",
      count:0,
      newGame:false
    });
  }
  handleWinner(){
    switch(this.checkWin(this.state.board)){
      case ai:
        this.setState({msg:"AI Win",newGame:true});
        break;
      case human:
        this.setState({msg:"You bit AI",newGame:true});
        break;
      case 'TIE':
        this.setState({msg:"Match Draw",newGame:true});
        break;
      default:
    }
  }
  handleClick(e){
    let {i,j} = getIJ[e];
    let board = this.state.board;
    board[i][j]= human;
    let count=this.state.count;
    this.setState({board:board,count:count+1},()=>{
      let cnt=this.state.count;
      this.handleWinner();
      if(cnt!==9) {
        this.aiTurn();
      }
    });
  }
  //ai part
  checkWin(board){
    let winner = null;
    let blank = 0;
  
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] !== '') {
        winner = board[i][0];
        break;
      } else if (board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] !== '') {
        winner = board[0][i];
        break;
      }
    }
    if (board[0][0] === board[1][1] && board[2][2] === board[1][1] && board[1][1] !== '') {
      winner = board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[2][0] !== '') {
      winner = board[2][0];
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') blank++;
      }
    }
    if (blank === 0 && winner === null) return 'TIE';
    else return winner;
  };
  
  minmax(board, isMaximizing){
    let result = this.checkWin(board);
    if (result != null) return SCORE[result];
    let bestScore = isMaximizing ? -Infinity : Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = isMaximizing ? ai : human;
          let score = this.minmax(board, !isMaximizing);
          board[i][j] = '';
          bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  };
  
  bestMove(board){
    let bestScore = -Infinity;
    let _i, _j;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === '') {
          board[i][j] = ai;
          let score = this.minmax(board, false);
          board[i][j] = '';
          bestScore = Math.max(score, bestScore);
          if (bestScore === score) {
            _i = i;
            _j = j;
          }
        }
      }
    }
    return { i: _i, j: _j };
  };
  //ai part over

  aiTurn(){
    let count = this.state.count;
    let {i,j} = this.bestMove(this.state.board)
    let board = this.state.board;
    board[i][j]= ai;
    this.setState({board:board,count:count+1},()=>{
      let cnt=this.state.count;
      this.handleWinner();
      if(cnt===9) {
        this.setState({msg:"Start New Game"});
      }
    });
  }


  render() {
    let style={
      btn:{
        textAlign:"center",
        margin:"5px auto"
      }
    }
    // this.aiTurn();
    return (
      <div >
        <CssBaseline />
        <Container component="main"  maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            TicTacToe
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {'Never will Win'}
          </Typography>
          {this.state.newGame?<Button style={style.btn} variant="contained" color="primary" onClick={this.startNewGame} >NewGame</Button>:''}
          <div>
            <Board
            board={this.state.board}
            handleClick = {this.handleClick}
            />
            <Typography style={{color:"red",textAlign:"center"}} variant="h4" component="h2" >
              {this.state.msg}
            </Typography>
          </div>
        </Container>
        <footer>
          <Container maxWidth="sm">
            <Typography variant="body1">Developed By kk007</Typography>
            <Typography variant="h5" component="h2" gutterBottom>
            <Link color="inherit" href="https://www.instagram.com/ig_kk007/">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            </Link>
            </Typography>
          </Container>
        </footer>
      </div>
    );
  }
}

export default App;
