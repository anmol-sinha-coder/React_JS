// Global
var k = 0;

//Function scope
function myfun() {
  document.getElementById('my_body').style.backgroundColor = 'red';
}

//Function scope
// Remember Function Name should be always camelcase
function myFun2() {
  // Local - Function scope
  if (true) {
    // Local Block Scope
    var x = 5;
    const y = 6;
    let z = 7;
  }
  console.log(' Debug:::', x, ':::', y, ':::', z);
}

var alpha = 56;
console.log(' THis Value :: ', this.alpha);
console.log(' Window Value :: ', window.alpha);

const some_obj = {
  company: 'Highradius',
  employee: 355,
  myFun: function someFunction() {
    console.log(' Inside Obj ::', this.company);
  },
};

some_obj.myFun();

// CALL and APPLY
const fun_obj = {
  myFun: function someFunction() {
    console.log(' Call Obj ::', this);
  },
};

const new_obj = {
  company: 'Highradius',
  employee: 355,
};
const new_obj2 = {
  company: 'Accenture',
  employee: 500,
};

// Prototype  //   Reference //
fun_obj.myFun.call(new_obj);

// CALL VS APPLY
const fun_obj = {
  myFun: function someFunction(x, y) {
    console.log(' Call Obj ::', this, ':::', x, ':::', y);
  },
  myFun2: function someFunction(x, y) {
    console.log(' Call Obj ::', this, ':::', x, ':::', y);
  },
};

const new_obj = {
  company: 'Highradius',
  employee: 355,
};
const new_obj2 = {
  company: 'Accenture',
  employee: 500,
};

// Prototype  //   Reference //
fun_obj.myFun.call(new_obj, 5, 6);
fun_obj.myFun2.apply(new_obj2, [5, 6]);
