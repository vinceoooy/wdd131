// Activity 1 - Map
const steps = ["one", "two", "three"];

function listTemplate(step) {
  return `<li>${step}</li>`;
}

const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml.join("");

// Activity 2 - Map
const grades = ["A", "B", "A"];

function convertGradeToPoints(grade) {
  if (grade === "A") return 4;
  else if (grade === "B") return 3;
  else return 0;
}

const gpaPoints = grades.map(convertGradeToPoints);
console.log("GPA Points:", gpaPoints);

// Activity 3 - Reduce
const gpa =
  gpaPoints.reduce((total, item) => total + item, 0) / gpaPoints.length;
console.log("Calculated GPA:", gpa);

// Activity 4 - Filter
const words = ["watermelon", "peach", "apple", "tomato", "grape"];
const shortWords = words.filter((word) => word.length < 6);
console.log("Short words:", shortWords);

// Activity 5 - indexOf
const myArray = [12, 34, 21, 54];
const luckyNumber = 21;
const luckyIndex = myArray.indexOf(luckyNumber);
console.log("Lucky number index:", luckyIndex);
