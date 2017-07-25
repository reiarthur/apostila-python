// output functions are configurable.  This one just appends some text
// to a pre element.
/* global Sk */
/* global CodeMirror */
/* global $ */

var codes = [];
var buttons = document.getElementsByTagName('button');
var myTextAreas = document.getElementsByClassName('code');

Sk.python3 = true;

for (var i = 0; i < myTextAreas.length; i++) {
    var myCodeMirror = CodeMirror.fromTextArea(myTextAreas[i], {lineNumbers: true, mode: 'python', theme: 'material'});
    codes.push(myCodeMirror);
}


// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()

function outf(text) { 
    var mypre = document.getElementById("output"); 
    mypre.innerHTML = mypre.innerHTML + text; 
} 
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runit(button) {

   var prog = codes[parseInt(button.textContent[0])-1].getValue();
   var mypre = document.getElementById("output"); 
   
   var def = $.Deferred();
   
   $('#autiputi').fadeIn('slow');
   
    $('#autiputi').click(def.resolve);
    setTimeout(def.resolve, 6000);
        
    def.done(function() {
        $('#autiputi').fadeOut("slow");
    });
    
   mypre.innerHTML = ''; 
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead}); 
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = 'mycanvas';
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(function(mod) {
       console.log('success');
   },
       function(err) {
       var error_text = document.createTextNode(err.toString());
            var spanHeader = document.createElement('span');
            spanHeader.style.color = "red";
            spanHeader.appendChild(error_text);
            var divHeader = document.getElementById('output');
            divHeader.appendChild(spanHeader);
   });
} 
