//--------------------------
// Observable <-> SVG mappers
//--------------------------

function toWire(element) {
    return function(bool) {
        element.attr('stroke', bool ? '#259B24' : '#000000');
        element.attr('stroke-width', bool ? "3" : '2');
    }
}

function toWires(elements) {
    return function(bool) {
        elements.map(toWire).forEach(function(f) { f(bool); });
    }
}

function toBox(element) {
    return function(bool) {
        var wasOn = !bool;
        var search = wasOn ? /_On$/ : /_Off$/;
        var replace = wasOn ? '_Off' : '_On';
        var currentImg = element.attr('xlink:href')
        var newImg = currentImg.replace(search, replace);
        element.attr('xlink:href', newImg);
    }
}

function mkSwitch(element) {
    var obs = new Rx.Subject();
    obs.onNext(false);
    element.on('click', function() {
        var currentImg = element.attr('xlink:href')
        var wasOn = /_On$/.test(currentImg);
        obs.onNext(!wasOn);
    });
    return obs;
}

//--------------------------
// Helpers
//--------------------------
/* global Rx */

var combine = Rx.Observable.combineLatest;

function link(observable, subject, initial) {
  var last = initial || false;
  subject.onNext(last);
  observable.subscribe(function(val) {
    if (last != val) subject.onNext(last = val);
  })
}

function not(x) { return !x; }
function and(x, y) { return x && y; }
function or(x, y) { return x || y; }
function nand(x, y) { return not(and(x, y)); }


//--------------------------
// Circuit
//--------------------------

var sw1 = mkSwitch($("#S1"));
var sw2 = mkSwitch($("#S2"));

var not1 = sw1.map(not);

var nand11 = combine(sw1, sw2, nand);
var nand12 = combine(not1, sw2, nand); 

var nand21fb = new Rx.Subject();
var nand22fb = new Rx.Subject();

var nand21 = combine(nand11, nand22fb, nand);
var nand22 = combine(nand21fb, nand12, nand);

link(nand21, nand21fb);
link(nand22, nand22fb);

//--------------------------
// UI
//--------------------------

sw1.subscribe(toBox($("#S1")));
sw2.subscribe(toBox($("#S2")));

sw1.subscribe(toWires([
    $("#P_01 > path"),
    $("#P_02 > path"),
    $("#P_03 > line")
]))
sw2.subscribe(toWires([
    $("#P_05 > path"),
    $("#P_06 > path"),
    $("#P_15 > line")
]));

not1.subscribe(toWire($("#P_04 > path")));

nand11.subscribe(toWire($("#P_07 > path")));
nand12.subscribe(toWire($("#P_14 > path")));

nand21fb.subscribe(toWires([
    $("#P_08 > line"),
    $("#P_11 > path"),
    $("#P_09 > line"),
]))

nand22fb.subscribe(toWires([
    $("#P_12 > line"),
    $("#P_10 > path"),
    $("#P_13 > line"),
]))


nand21fb.subscribe(toBox($("#L_S1")));
nand22fb.subscribe(toBox($("#L_S2")));


