
    function clickButton() {
      document.getElementById("mobile-menu").classList.toggle("hidden");
    }

    async function findsomething() {
      const dish = document.getElementById("dish").value;
      await fetchMeals(dish);
    }

    async function findsomething1() {
      const dish = document.getElementById("dish1").value;
      await fetchMeals(dish);
    }

    async function fetchMeals(dish) {
      const loader = document.getElementById("loader");
      const allres = document.getElementById("allres");

      loader.classList.remove("hidden");
      allres.innerHTML = "";

      try {
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
        const data = res.data.meals;

        if (!data) {
          allres.innerHTML = `<p class="text-red-600 font-semibold">No meals found for "${dish}".</p>`;
        } else {
          let output = "";
          data.forEach(e => {
            output += `
  <div class="rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-white overflow-hidden">
    <img src="${e.strMealThumb}" alt="${e.strMeal}" class="w-full h-44 object-cover">
    <div class="p-4 space-y-1">
      <h3 class="text-md font-semibold text-gray-800 truncate">
        🍽️ <strong>Name:</strong> ${e.strMeal}
      </h3>
      <p class="text-sm text-gray-600">
        📁 <strong>Category:</strong> ${e.strCategory}
      </p>
      <p class="text-sm text-gray-600">
        🌍 <strong>Area:</strong> ${e.strArea}
      </p>
     <div class="pt-2 ">
     <a href="singleProduct.html?id=${e.idMeal}"
   class="inline-block w-full bg-black hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg text-center transition-all duration-300">
   Read More <i class="bi bi-arrow-right ml-1"></i>
</a>
    </div>
    </div>
  </div>`;
          });
          allres.innerHTML = output;
        }
      } catch (err) {
        allres.innerHTML = `<p class="text-red-600 font-semibold">Error fetching meals. Try again.</p>`;
        console.error(err);
      }

      loader.classList.add("hidden");
    }
