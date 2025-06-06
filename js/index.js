
      function clickButton() {
        const mobileMenu = document.getElementById("mobile-menu");

        mobileMenu.classList.toggle("hidden");
      }

async function fetchAllMeals() {
  try {
    const res = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=c"
    );

    const data = res.data.meals;

    let output = "";

    data.forEach((meal) => {
      output += `
  <div class="w-84 sm:w-48 md:w-44 lg:w-44 xl:w-44 mx-auto rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white mt-5 overflow-hidden">
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-full h-40 object-cover rounded-t-2xl">
  
  <div class="p-3 space-y-1">
    <h3 class="text-md font-semibold text-gray-800 truncate">
      🍽️ <strong>Name:</strong> ${meal.strMeal}
    </h3>
    <p class="text-sm text-gray-600">
      📁 <strong>Category:</strong> ${meal.strCategory}
    </p>
    <p class="text-sm text-gray-600">
      🌍 <strong>Area:</strong> ${meal.strArea}
    </p>
    
    <div class="pt-2 ">
     <a href="singleProduct.html?id=${meal.idMeal}"
   class="inline-block w-full bg-black hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all duration-300">
   Read More <i class="bi bi-arrow-right ml-1"></i>
</a>
    </div>
  </div>
</div>

      `;
    });

    // Hide loader
    document.getElementById("loaderWrapper").style.display = "none";

    document.getElementById("result").innerHTML = output;
  } catch (error) {
    console.error("Error fetching meals:", error);
    document.getElementById("loaderWrapper").style.display = "none";
    document.getElementById("result").innerHTML =
      "<p>Something went wrong!</p>";
  }
}

      // Automatically fetch data when page loads
      window.onload = fetchAllMeals;
   