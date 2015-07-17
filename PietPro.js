window.meteorSession = {};

//colArr is [hue][shade]
//rendered sideways
var colArr = [
  ['#FFC0C0', '#FF0000', '#C00000'],
  ['#FFFFC0', '#FFFF00', '#C0C000'],
  ['#C0FFC0', '#00FF00', '#00C000'],
  ['#C0FFFF', '#00FFFF', '#00C0C0'],
  ['#C0C0FF', '#0000FF', '#0000C0'],
  ['#FFC0FF', '#FF00FF', '#C000C0'],
];

var commandArr = [
  ['&nbsp;', 'push', 'pop'],
  ['add', 'subtract', 'multiply'],
  ['divide', 'mod', 'not'],
  ['greater', 'pointer', 'switch'],
  ['duplicate', 'roll', 'in(num)'],
  ['in(char)', 'out(num)', 'out(char)'],
];

window.meteorSession['currentCol'] = '#FFC0C0';
window.meteorSession['rows'] = 12;
window.meteorSession['cols'] = 4;

function arrFind(arr, target) {
  //returns [row, col]
  for(var x = 0; x < arr.length; x++)
    if(arr[x].indexOf(target) > -1)
      return [x, arr[x].indexOf(target)];
  return [-1, -1];
}

Template.main.rows = function() {
  return window.meteorSession['rows'];
}

Template.main.cols = function() {
  return window.meteorSession['cols'];
}

Template.main.rowCol = function(row, col, cl) {
  row = parseInt(row);
  col = parseInt(col);
  //just in case strings
  var ret = "<table class=" + cl + ">\n<tbody>\n";
  for(var r = 0; r < row; r++){
    ret+="<tr>\n";
    for(var c = 0; c < col; c++){
      ret+="<td class=" + cl + "></td>\n";
    }
    ret+="</tr>\n";
  }
  return ret + "</tbody>\n</table>";
}

Template.main.printColors = function() {
  var ret = "<table class='ccell'>\n<tbody>\n";
  for(var c = 0; c < colArr[0].length; c++){
    ret+="<tr>\n";
    for(var r = 0; r < colArr.length; r++){
      ret+="<td style='background-color:" + colArr[r][c] + ";' class='ccell'></td>\n";
    }
    ret+="</tr>\n";
  }
  return ret + "</tbody>\n</table>";
}

Template.main.printFunctions = function() {
  var ret = "<table class='fcell'>\n<tbody>\n";
  for(var c = 0; c < commandArr[0].length; c++){
    ret+="<tr>\n";
    for(var r = 0; r < commandArr.length; r++){
      ret+="<td class='fcell'>" + commandArr[r][c] + "</td>\n";
    }
    ret+="</tr>\n";
  }
  return ret + "</tbody>\n</table>";
}

Template.main.rendered = function() {
  $('.ccell')[1].className+=" selected";//makes first color thing selected
}

Template.main.events({
  'click td.cell': function(event) {
    // template data, if any, is available in 'this'
    console.log(event);
    event.target.style.backgroundColor = window.meteorSession['currentCol'];
  },
  'click td.ccell': function(event) {
    // template data, if any, is available in 'this'
    console.log('ABCD');
    console.log(event.target.style.backgroundColor)
    console.log(typeof event.target.style.backgroundColor)
    console.log(rgbToHex(event.target.style.backgroundColor));
    window.meteorSession['currentCol'] = rgbToHex(event.target.style.backgroundColor);

    for(var x = 0; x < $('.selected').length; x++)
      $('.selected')[x].className = "ccell";

    event.target.className += " selected";
  },
  'click td.fcell': function(event) {
    var coords = arrFind(commandArr, event.target.innerHTML);
    console.log("Func coords");
    console.log(coords);
    if(coords[0] == 0 && coords[1] == 0)//&nbsp;
      return;

    colCoords = arrFind(colArr, window.meteorSession['currentCol']);
    var r = (colCoords[0] + coords[0]) % colArr.length;
    var c = (colCoords[1] + coords[1]) % colArr[0].length;

    var newCol = colArr[r][c];
    console.log(r + ":" + c + ":" + newCol);
    console.log((r + colArr.length * c + 1));
    console.log('abcdefg123');
    // console.log(colCoords);
    // console.log(coords);
    // console.log('col & coords above');
    // console.log(newCol);
    window.meteorSession['currentCol'] = newCol;
    // console.log(newCol);
    setSelected(newCol, (r + colArr.length * c + 1));
  }
});

function setSelected(colCode, ind) {
  //includes +1
  for (var x = 0; x < $('.selected').length; x++)
    $('.selected')[x].className = "ccell";

  // var coords = arrFind(colArr, colCode);
  // console.log('coords')
  // console.log(coords);

  // var add = 1 + coords[1] column+ colArr[0].length * coords[0];
  // console.log(add);
  // console.log('abcdefg');

  // $('.ccell')[add].className+=" selected";
  $('.ccell')[ind].className += " selected";
}

function rgbToHex(c) {
  //c is, for instance, "rgb(192, 255, 255)"
  var arr = c.replace("rgb(","").replace(")","").split(", ");
  console.log(arr);
  for(var x = 0; x < arr.length; x++)
    arr[x] = parseInt(arr[x])
  return rgbFin(arr);
}

function componentToHex(c) {
  var hex = c.toString(16).toUpperCase();
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbFin(arr) {
  return "#" + componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
}
