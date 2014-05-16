if (Meteor.isClient) {

  //colArr is [hue][shade]
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

  Session.set('currentCol', '#FFFFFF');

  Template.main.rowCol = function(row, col, cl){

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

  Template.main.printColors = function(){
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

  Template.main.events({
    'click td.cell': function (event) {
      // template data, if any, is available in 'this'
      console.log(event);
      event.target.style.backgroundColor = Session.get('currentCol');
    },
    'click td.ccell': function (event) {
      // template data, if any, is available in 'this'
      Session.set('currentCol', event.target.style.backgroundColor);
      
      for(var x = 0; x < $('.selected').length; x++)
        $('.selected')[x].className = "ccell";

      event.target.className += " selected";
    }  
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
