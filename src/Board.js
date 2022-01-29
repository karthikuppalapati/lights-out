import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: Array.from({length: this.props.nrows}, () => { return (
        Array.from({length:this.props.ncols}, () => {
          let rand = Math.floor(Math.random()*2) + 1
          return (rand === 1 ? true : false)
        })
      )
        
      }),
      hasWon: false
    }
  }

  flipCellsAround = (x, y) => {
    let {ncols, nrows} = this.props;
    let board = this.state.board;

    let hasWon = true

    this.flipCell(x,y)
    this.flipCell(x-1,y)
    this.flipCell(x+1,y)
    this.flipCell(x,y-1)
    this.flipCell(x,y+1)
    this.setState({board});

    for(let i=0;i<nrows;i++){
      for(let j=0;j<ncols;j++){
        if(board[i][j] == true){
          hasWon = false
        }
      }
    }

    if(hasWon) {
      this.setState({hasWon})
    }

  }

  flipCell = (x, y) => {
    let board = this.state.board
    let {ncols, nrows} = this.props;

    if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
      board[x][y] = !board[x][y];
    }

    this.setState({
      board
    })
  }


  render() {

    if(this.state.hasWon){
      return (
        <div className="Board-title">
          <div className="neon-orange">You</div>
          <div className="neon-blue">Win</div>
        </div>
      )
    }
    
    let board = (
      <table className="Board">
        { this.state.board.map((ar,i) => {
          return (
            
            <tr>
              {
                ar.map((bool,j) => {
                  return (<Cell key={`${i}-${j}`} isLit={bool} flipCellsAroundMe={this.flipCellsAround} x={i} y={j} /> )
                  
                })
              }
            </tr>
          )
        })
        }
      </table>
     
    )
    
    return (
      <div >
        <div className="Board-title">
          <div className="neon-orange">Lights</div>
          <div className="neon-blue">Out</div>
        </div>
        {this.state.hasWon ? 'You Win' : board}
      </div>
    )
  }
}


export default Board;
