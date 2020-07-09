import _ from 'lodash';
import React from 'react';
import ReactDataSheet from 'react-datasheet';
export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [],
      title:"",

      // grid: [
      //   [{ value: 1 }, { value: 3 }],
      //   [{ value: 2 }, { value: 4 }],
      // ],
    };
    console.log("Constructor", this.state.grid)

  }
  // function to update state of Table component

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
