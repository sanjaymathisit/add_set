import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Table from './table'
export default class CSVReader4 extends Component {
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
    for (i = 4; i < data.length; i++) {
      if(data[i].data[0]!==""){
      if (data[i].data[2]==="") {
        cards.push([count,data[i].data[1],data[i].data[3]]);
        count=count+1;
      }
      else{
        cards.push([count,data[i].data[1],data[i].data[3]]);
        count=count+1;
        cards.push([count,data[i].data[1],data[i].data[3],data[i].data[4]]);
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
    parallel_sets.push([parallel_count,data[i].data[0]]);
    parallel_count=parallel_count+1;
  }
  else{
    parallel_sets.push([parallel_count,data[i].data[0],data[i].data[1]]);
    parallel_count=parallel_count+1;
  }
}
else{
  break;
}
}
for(i=i+2;i<data.length;i++){
  parallel_variation.push([parallel_variation_count,data[i].data[0]]);
  parallel_variation_count=parallel_variation_count+1;
}
console.log(cards)
console.log(parallel_sets)
console.log(parallel_variation)
}

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleOnRemoveFile = (data) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  render() {
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
        <Table></Table>
      </>
    )
  }
}
