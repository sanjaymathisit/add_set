import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Table from './table'
import OverrideEverythingSheet from './Override.js'
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
    const card_columns=[{ label: 'ID', width: '20%'},{ label: 'Player Name', width: '20%' },
    { label: 'Team', width: '20%' },
    { label: 'Variation', width: '20%' }];
    const parallel_sets_columns=[{ label: 'parallel_set_ID', width: '30%' },
    { label: 'parallel set Name', width: '20%' },
    { label: 'Serial Number', width: '20%' },];
    const parallel_sets_variations_columns=[{ label: 'ID', width: '30%' },
    { label: 'parallel_variation', width: '20%' },];
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

  for(i=i+2;i<data.length;i++){
    parallel_variation.push([{value:parallel_variation_count},{value:data[i].data[0]}]);
    parallel_variation_count=parallel_variation_count+1;
  }

  console.log(cards)
  console.log(parallel_sets)
  console.log(parallel_variation)
  this.setState({ cards });
  var cards_selection = new Array(cards.length).fill(false);
  var parallel_sets_selection=new Array(parallel_sets.length).fill(false);
  var  parallel_sets_variations_selection=new Array(parallel_variation.length).fill(false);


      // update child table component's state here once data has been parsed
    this.tableElement.current.setState({grid:cards,columns:card_columns,selections:cards_selection});
    this.tableElement_parallel.current.setState({grid:parallel_sets,columns:parallel_sets_columns,selections:parallel_sets_selection});
    this.tableElement_parallel_variation.current.setState({grid:parallel_variation,columns:parallel_sets_variations_columns,selections:parallel_sets_variations_selection});

  }
  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }
  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    this.tableElement.current.setState({grid:[],columns:[],selections:[]});
    this.tableElement_parallel.current.setState({grid:[],columns:[],selections:[]});
    this.tableElement_parallel_variation.current.setState({grid:[],columns:[],selections:[]});

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
        <OverrideEverythingSheet ref={this.tableElement}></OverrideEverythingSheet>
        <OverrideEverythingSheet ref={this.tableElement_parallel}></OverrideEverythingSheet>
        <OverrideEverythingSheet ref={this.tableElement_parallel_variation}></OverrideEverythingSheet>

      </>
    )
  }
}
