$(document).ready(function () {
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

    let col = $(
      `<div class="col-name colID-${i}" id = "colCode-${str}">${str}</div>`
    );
    $(".col-box").append(col);
    let row = $(`<div class="row-name" id = "rowID-${i}">${i}</div>`);
    $(".row-box").append(row);
  }

  for (let i = 1; i <= 100; i++) {
    let row = $(`<div class="cell-row"></div>`);
    for (let j = 1; j <= 100; j++) {
      let colCode = $(`.colID-${j}`).attr("id").split("-")[1];
      let col = $(
        `<div class="input-cell" contenteditable="false" id="r${i}c${j}" data="code-${colCode}"></div>`
      );
      row.append(col);
    }
    $(".input-cell-box").append(row);
  }

  $(".align-icon").click(function () {
    $(".align-icon.selected").removeClass("selected");
    $(this).addClass("selected");
  });

  $(".style-icon").click(function () {
    $(this).toggleClass("selected");
  });

  $(".input-cell").click(function () {
    $(".input-cell.selected").removeClass("selected");
    $(this).addClass("selected");
  });
});
