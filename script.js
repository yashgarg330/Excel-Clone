$(document).ready(function () {
  //Logic for gives rows name
  for (let i = 1; i <= 100; i++) {
    let str = "";
    let n = i;
    while (n > 0) {
      let rem = n % 26;
      if (rem == 0) {
        str = "Z" + str;
        n = Math.floor(n / 26) - 1;
      } else {
        str = String.fromCharCode(rem - 1 + 65) + str;
        n = Math.floor(n / 26);
      }
    }
    //giving row and col a value using jquery
    let col = $(
      `<div class="col-name colID-${i}" id = "colCode-${str}">${str}</div>`
    );
    $(".col-box").append(col);
    let row = $(`<div class="row-name" id = "rowID-${i}">${i}</div>`);
    $(".row-box").append(row);
  }

  //Defining input cell
  for (let i = 1; i <= 100; i++) {
    let row = $(`<div class="cell-row"></div>`);
    for (let j = 1; j <= 100; j++) {
      let colCode = $(`.colID-${j}`).attr("id").split("-")[1];
      let col = $(
        `<div class="input-cell" contenteditable="false" id="row-${i}-col-${j}" data="code-${colCode}"></div>`
      );
      row.append(col);
    }
    $(".input-cell-box").append(row);
  }

  // Adding some sected de-selected properties in menu-bar-icons
  $(".align-icon").click(function () {
    $(".align-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style-icon").click(function () {
    $(this).toggleClass("selected");
  });

  $(".input-cell").click(function (e) {
    if (e.ctrlKey) {
      //then multiple select will be done
      let [rowId, colId] = getRowCol(this);
      if(rowId > 1){
        let topCellSelected = $(`#row-${rowId-1}-col-${colId}`).hasClass("selected");
        if(topCellSelected){
          $(this).addClass("top-cell-selected");
          $(`#row-${rowId-1}-col-${colId}`).addClass("bottom-cell-selected");
        }
      }
      if(rowId < 100){
        let bottomCellSelected = $(`#row-${rowId+1}-col-${colId}`).hasClass("selected");
        if(bottomCellSelected){
          $(this).addClass("bottom-cell-selected");
          $(`#row-${rowId+1}-col-${colId}`).addClass("top-cell-selected");
        }
      }
      if(colId < 100){  
        let rightCellSelected = $(`#row-${rowId}-col-${colId+1}`).hasClass("selected");
        if(rightCellSelected){
          $(this).addClass("right-cell-selected");
          $(`#row-${rowId}-col-${colId+1}`).addClass("left-cell-selected");
        }
      }
      if(colId > 1){
        let leftCellSelected = $(`#row-${rowId}-col-${colId-1}`).hasClass("selected");
        if(leftCellSelected){
          $(this).addClass("left-cell-selected");
          $(`#row-${rowId}-col-${colId-1}`).addClass("right-cell-selected");
        }
      }

      $(this).addClass("selected");
    }
    else {
      $(".input-cell.selected").removeClass("selected");
      $(this).addClass("selected");
    }
  });

  function getRowCol(ele) {
    let idArray = $(ele).attr("id").split("-");
    let rowId = parseInt(idArray[1]);
    let colId = parseint(idArray[3]);
    return [rowId, colId];
  }

  //by double click on cell make it contenteditable
  $(".input-cell").dblclick(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
    $(this).attr("contenteditable", "true");
    $(this).focus(); //focus karna imp hai so that we can write text simultaneously
  });
  
  $(".input-cell").blur(function(){
    $(".input-cell.selected").attr("contenteditable","false");
  })
  
  //Now i want to move the elements of row box with the input cell scroll and same with col-box elements
  $(".input-cell-box").scroll(function () {
    $(".col-box").scrollLeft(this.scrollLeft);
    $(".row-box").scrollTop(this.scrollTop);
  });

  //Giving functionaliies to bold italic and underline
  function updateCell(property,value) {
    $(".input-cell.selected").each(function (){
      $(this).css(property,value);
    });
  }

  $(".icon-bold").click(function () { 
    if($(this).hasClass("selected")){ //if allready selected then remove bold property
      updateCell("font-weight", "");
    }
    else{
      updateCell("font-weight", "bold");
    }
  })
  $(".icon-italic").click(function () { 
    if($(this).hasClass("selected")){ //if allready selected then remove italic property
      updateCell("font-style", "");
    }
    else{
      updateCell("font-style", "italic");
    }
  })
  $(".icon-underline").click(function () { 
    if($(this).hasClass("selected")){ //if allready selected then remove underline property
      updateCell("text-decoration", "");
    }
    else{
      updateCell("text-decoration", "underline");
    }
  })
});
