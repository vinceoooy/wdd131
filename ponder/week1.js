const PI = 3.14;
let radius = 3;
                 
const one = 1;
const two = '2';
console.log(PI);
console.log(radius);
console.log(one);
console.log(two);

let course = "CSE131"; //global scope
if (true) {
    let student = "Vince";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block
                    