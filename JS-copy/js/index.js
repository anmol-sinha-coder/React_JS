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
/* const fun_obj = {
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
 */

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

// ES5 Func without variable initialization
// Function Call can be made before or after declaration
function someFun() {
  console.log('Hello World');
}
someFun();

// ES5 Func with variable initialization
// Function Call can be only made after declaration

/* aFun();
const aFun = function someFun2() {
  console.log('Hello Kiit');
};
 */

// Arrow Function => Combination of Above commented code
const afun = () => console.log('Hello Kiit');
afun();

// Generator Function
/* 
function* generatorFunction() {
  // Line 1
  console.log('This will be executed first.');
  yield 'Hello, '; // Line 2
  console.log('I will be printed after the pause');
  yield 'World!';
}
const generatorObject = generatorFunction(); // Line 3
console.log(generatorObject.next().value); // Line 4
console.log(generatorObject.next().value); // Line 5
console.log(generatorObject.next().value); // Line 6
// This will be executed first.
// Hello,
// I will be printed
*/

// Spread Operator
const a = [1, 2, 3];
const b = [5, 6, 7];
const c = [...a, ...b];
console.log(c);

const ki = { name: 'debraj' };
const l = { sur: 'Sengupta', ...ki };
console.log(l);

// Split
const str = ' Debraj_Seng_upta';
console.log(str.split('_'));

// Destructuring
console.log('Dest ::', a[1]);

const { name } = l;
console.log('Dest :: ', name);

// Template Literials
console.log(`Literal:: ${name} ---- ${a[0]}`);

//  FOR

const arr = [1, 8, 3, 62, 0, 4, 234, 845, 234, 6454, 13413];

// For - Independent or discrete - break
for (let index = 0; index < arr.length; index++) {
  console.log(arr[index]);
}

// For Of
for (let ele in arr) {
  console.log(ele);
}

// ForEach - collections - Non break - no return
arr.forEach((element, index) => console.log(element));

// Map - Returns the manipulated Array
arr.map((element, index) => console.log(element));

const newArr = arr.map((element, index) => element + 1);
console.log(newArr);

// Sort
// console.log('Sort::', arr.sort());
// Returns Sorted Array - Without explicit comparison all integers are sorted as sting dictionary
function comp(x, y) {
  return x > y ? 1 : x === y ? 0 : -1;
}
// 1 x > y => y, x => Swap => small,high
// 0 x ===y => x, y; => no Swap => equal, equal
// -1 x < y => x ,y =>  Swap => small high
console.log('Sort::', arr.sort(comp));

// Searching
// Includes - Bool return Type
console.log(arr.includes(6454));

// Partial Checking
const age = [5, 12, 18, 25, 14, 2];

function ageChecker(x) {
  return x >= 18;
}

console.log(age.some(ageChecker));
console.log(age.every(ageChecker));

/* [5, 12, 18, 25, 14, 2] 
1 element at a time
ageChecker(ele) 
bool true every => true / false
bool kuch true some => true / false */

// Filter - Returns Array - Doesnt Change Actual Var
const arrObj = [
  { fname: 'debraj', lname: undefined },
  { fname: 'Subham', lname: 'Kumar' },
  { fname: 'debraj1', lname: undefined },
  { fname: 'Subham1', lname: 'Kumar' },
  { fname: 'debraj2', lname: 'Sengupta' },
  { fname: 'Subham2', lname: 'Kumar' },
];

//console.log(arrObj.filter((element,index)=> condition))
console.log(arrObj.filter((element, index) => element.lname !== undefined));

// Reduce

/* function sumFun(x, y) {
  return x + y;
} */
/* element        - index
--- instead ---
prev func result - current element */
console.log(age.reduce((sum, current) => sum + current, 15));

//Similar in func

/* function sumFun(x, y) {
  return x + y;
}

let sum = 15;
for (let index = 0; index < age.length; index++) {
  let current = age[index];
  sum = sumFun(sum, current);
}
console.log(sum); */
