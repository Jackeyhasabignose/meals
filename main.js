// 早午晚餐
const meal = document.querySelector("#meal");

// 勾選的類別
const brunch = document.querySelector("#brunch");
const rice = document.querySelector("#rice");
const noodle = document.querySelector("#noodle");
const buffet = document.querySelector("#buffet");
const others = document.querySelector("#others");

const checkList = [brunch, rice, noodle, buffet, others];

//Button
const rollBtn = document.querySelector("#roll");

//Spinner
const loadingDiv = document.getElementById('loading');

// 顯示結果
const order = document.querySelector("#order");

// SourceData
let SourceData = [];

// filterList
let mealList = [];



fetch('mealList.json')
  .then(response => response.json())
  .then(data => {
    SourceData = [...data];
  })
  .catch(error => {
    console.error(error); // 處理錯誤
});

//Check default
function checkDefault() {
  for(let i = 0 ; i < checkList.length ; i++) {
    if(checkList[i].checked) {
      return false;
    }
  }

  return true;
}


// Filter
function filter() {
  // Reset data
  mealList = JSON.parse(JSON.stringify(SourceData));

  // Chech Default
  if(checkDefault()) {
    return;
  }

  // filter category
  checkList.forEach(i => {
    if (i.checked) {
      mealList.forEach(m => {
        if(m.category.includes(i.value)) {
          m.filter = true;
        }
      })
    }
  })

  mealList = mealList.filter(i => i.filter);
}


// Meal Raondom
function ramdonMeal() {
  const random = Math.floor(Math.random() * mealList.length);
  if(mealList.length === 0) {
    //Render
    order.innerText = "今天不吃當減肥";
    return;
  }
  const orderMeal = mealList[random].name;
  console.log(orderMeal);

  //Render
  order.innerText = orderMeal;
}


// Spinner function
function showSpinner() {
  loadingDiv.style.visibility = 'visible';
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden';
}


// Event Litsener
// Roll
rollBtn.addEventListener("click", () => {

  showSpinner();

  setTimeout(() => {
    filter();
    ramdonMeal();
    hideSpinner();
  }, 500)
});
