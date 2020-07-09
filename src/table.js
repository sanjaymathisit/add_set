import _ from 'lodash';
import React from 'react';
import ReactDataSheet from 'react-datasheet';
export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      // grid: [
      //   [{ value: 1 }, { value: 3 }],
      //   [{ value: 2 }, { value: 4 }],
      // ],
    };
    console.log("Constructor", this.state.grid)
  }
  // function to update state of Table component 
  updateValues = (cards) =>
  {
    // convert to required format
    var gridValues = [];
    for(var i=0;i<cards.length;i++)
    {
      var gridRow = [];
      for(var j=0;j<cards[i].length;j++)
      {
        gridRow.push({ value:cards[i][j] });
      }
      gridValues.push(gridRow);
    }
    // set state to the updated values
    this.setState({ grid: gridValues});
  }
  render() {
    return (
      <div>
        <ReactDataSheet
          data={this.state.grid}
          valueRenderer={cell => cell.value}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row]);
            changes.forEach(({ cell, row, col, value }) => {
              grid[row][col] = { ...grid[row][col], value };
            });
            this.setState({ grid });
          }}
        />
      </div>
    );
  }
}