import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Table from './table'
export default class CSVReader4 extends Component {
  constructor(props) {
    super(props);
    // create a reference to child table component here and attach the reference when calling child component
    this.tableElement = React.createRef();
    this.tableElement_parallel = React.createRef();
    this.tableElement_parallel_variation = React.createRef();

    this.state = {
      cards: [],
    };
  }
  handleOnDrop = (data) => {
    const Year=data[0].data[1];
    const Set=data[1].data[1];
    const Sport=data[2].data[1];
    var i;
    var count=1;
    var parallel_count=1;
    var parallel_variation_count=1;
    const cards=[];
    const parallel_sets=[];
    const parallel_variation=[];
    cards.push([{value:""},{value:"Player"},{value:"Team"}])
    for (i = 4; i < data.length; i++) {
      if(data[i].data[0]!==""){
      if (data[i].data[2]==="") {
        cards.push([{value:count},{value:data[i].data[1]},{value:data[i].data[3]}]);
        count=count+1;
      }
      else{
        cards.push([{value:count},{value:data[i].data[1]},{value:data[i].data[3]}]);
        count=count+1;
        cards.push([{value:count},{value:data[i].data[1]},{value:data[i].data[3]},{value:data[i].data[4]}]);
        count=count+1;
      }
    }
    else{
      break;
    }
  }
  parallel_sets.push([{value:""},{value:"Parallel Sets"}])
  for(i=i+2;i<data.length;i++){
    if(data[i].data[0]!==""){
      if(data[i].data[1]===""){
        parallel_sets.push([{value:parallel_count},{value:data[i].data[0]}]);
        parallel_count=parallel_count+1;
      }
      else{
        parallel_sets.push([{value:parallel_count},{value:data[i].data[0]},{value:data[i].data[1]}]);
        parallel_count=parallel_count+1;
      }
    }
    else{
      break;
    }
  }
  parallel_variation.push([{value:""},{value:"Parallel Variations"}])

  for(i=i+2;i<data.length;i++){
    parallel_variation.push([{value:parallel_variation_count},{value:data[i].data[0]}]);
    parallel_variation_count=parallel_variation_count+1;
  }
  console.log(cards)
  console.log(parallel_sets)
  console.log(parallel_variation)
    this.setState({ cards });

    // update child table component's state here once data has been parsed
    this.tableElement.current.setState({grid:cards});
    this.tableElement_parallel.current.setState({grid:parallel_sets});
    this.tableElement_parallel_variation.current.setState({grid:parallel_variation});

  }
  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }
  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    this.tableElement.current.setState({grid:[]});
    this.tableElement_parallel.current.setState({grid:[]});
    this.tableElement_parallel_variation.current.setState({grid:[]});

    console.log(data)
    console.log('---------------------------')
  }
  render(){
    return (
      <>
        <h5>Upload your files</h5>
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          noDrag
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Click to upload.</span>
        </CSVReader>
        <Table ref={this.tableElement}></Table>
        <Table ref={this.tableElement_parallel}></Table>
        <Table ref={this.tableElement_parallel_variation}></Table>

      </>
    )
  }
}
