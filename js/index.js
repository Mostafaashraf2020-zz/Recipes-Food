// function getPizza() {
//   return new Promise(function (callback) {
//     var httpRequest = new XMLHttpRequest(); // new instance
//     httpRequest.open(
//       "GET",
//       `https://forkify-api.herokuapp.com/api/search?q=pizza`
//     );
//     httpRequest.send();
//     httpRequest.addEventListener("readystatechange", function () {
//       if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//         recipes = recipes = JSON.parse(httpRequest.response).recipes;
//         console.log("pizzzzzzza", recipes);
//         callback();
//       }
//     });
//   });
// }

//CAllBACK FUNCTION :D
// getPizza(function () {
//   getPasta(function () {
//     finish();
//   });
// });

//PROMISE
// getPizza().then(function () {
//   finish();
// });
// getPasta().then(function () {
//   getPizza().then(function () {
//     finish();
//   });
// });

// function getPasta() {
//   return new Promise(function (callback) {
//     var httpRequest = new XMLHttpRequest(); // new instance
//     httpRequest.open(
//       "GET",
//       `https://forkify-api.herokuapp.com/api/search?q=pizza`
//     );
//     httpRequest.send();
//     httpRequest.addEventListener("readystatechange", function () {
//       if (httpRequest.readyState == 4 && httpRequest.status == 200) {
//         recipes = recipes = JSON.parse(httpRequest.response).recipes;
//         console.log("pastaaaaaa", recipes);
//         callback();
//       }
//     });
//   });
// }

//BY ASYNC-AWAIT(FETCH-AWAIT)
// async function getPasta() {
//   //fetech: open-send - readyStateEvent - response -return promise
//   var response = await fetch(
//     `https://forkify-api.herokuapp.com/api/search?q=pasta`
//   );
//   var recipes = await response.json();
//   console.log("pasta", recipes.recipes);
// }

// async function getPizza() {
//   //fetech: open-send - readyStateEvent - response -return promise
//   var response = await fetch(
//     `https://forkify-api.herokuapp.com/api/search?q=pizza`
//   );
//   var recipes = await response.json();
//   console.log("pizzzzza", recipes.recipes);
// }

// function finish() {
//   console.log("finishhh");
// }

// (async function () {
//   await getPizza();
//   finish();
//   await getPasta();
// })();

let recipes = [];
getRecipes("pizza");

function getRecipes(meal) {
  // انا هنا بعمل نسخع من اوبجكت علشان اتكلم مع السيرفر
  //  بياخد حاجتين اول حاجه  الويب سايت هتصل بيه و كمان  و نوع الاتصال استقبال و ارسال
  //open ->> establish server only
  //بفتح اتصال فقط
  // http status -> 200 ok
  //http status ->500 interal server error
  //http status ->400 not found
  var httpRequest = new XMLHttpRequest(); // new instance
  httpRequest.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  httpRequest.send();
  console.log(httpRequest.response);

  // Readystate
  // httpRequest.readyState = 0  // connection not established
  // httpRequest.readyState = 1  // connection  established (open)
  // httpRequest.readyState = 2  // server ready by request
  // httpRequest.readyState = 4  // request finished and respone ready

  httpRequest.addEventListener("readystatechange", function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      // by deafult al data bteegy string azm a7wlha json by JSON.parse(response)
      console.log((recipes = JSON.parse(httpRequest.response).recipes));
      console.log();
      displayData();
    }
  });
}

function displayData() {
  var cols = "";
  for (let i = 0; i < recipes.length; i++) {
    cols += `<div class = "col-md-3">
    <div class="recipes">
    <img class="w-100 recipe-img"  src=${recipes[i].image_url}>
    <h6 class="my-2">${recipes[i].title.split(3)}</h6>
    <a target = _blank href = "${
      recipes[i].source_url
    }" class="btn btn-info pt-2">Source</a>
    <a onclick='getRecipeDetails(${
      recipes[i].recipe_id
    })' data-bs-toggle="modal" data-bs-target="#recipeData" target = _blank href = "${
      recipes[i].source_url
    }" class="btn btn-warning pt-2">Details</a>

    </div>
    </div>`;
  }
  $("#recipesData").html(cols);
  //DOM
  // document.getElementById("recipesData").innerHTML = cols;
}

//jQuery
$(".navbar .nav-link").click(function (e) {
  getRecipes(e.target.text);
});

// DOM
// let links = document.querySelectorAll(".navbar .nav-link");
// for (let i = 0; i < links.length; i++) {
//   links[i].addEventListener("click", function (e) {
//     getRecipes(e.target.text);
//   });
// }

async function getRecipeDetails(id) {
  let respone = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${id}`
  );
  var recipeData = await respone.json();
  var recipeData = recipeData.recipe;

  var recipe = `<img class="w-100 recipe-img"  src=${recipeData.image_url}></img>

  <h3>${recipeData.publisher}</h3>
    <h5>${recipeData.title}</h5>

  
`;

  document.getElementById("receipeInfo").innerHTML = recipe;
  // $("#receipeInfo").html(recipe);
}
