const apiKey = "bba956687c8c4254827b19dc40f6ce0f";
const blogContainer = document.getElementById("blog-container");
const cardContainer = document.getElementById("card-container");
const searchField = document.getElementById("search-input");
const searchButton = document.querySelector(".search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query:", error);
    return [];
  }
}

function displayBlogs(articles) {
    blogContainer.incardContainer
    if (articles.length === 0) {
      cardContainer.style.display = "block"; 
      return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage || "fallback-image.jpg"; 
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    description.textContent =
      article.description || "No description available.";
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    const articles = await fetchNewsQuery(query);
    displayBlogs(articles);
  } else {
    blogContainer.innerHTML = "<p>Please enter a search term.</p>";
  }
});

(async () => {
  const articles = await fetchRandomNews();
  displayBlogs(articles);

})();
