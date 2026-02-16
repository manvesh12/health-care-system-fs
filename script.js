document.addEventListener("DOMContentLoaded", () => {
  const locationFilter = document.getElementById("locationFilter");
  const typeFilter = document.getElementById("typeFilter");
  const searchInput = document.getElementById("searchInput");
  const jobsContainer = document.getElementById("jobsContainer");

  // Collect job cards into an array
  const jobCards = Array.from(jobsContainer.querySelectorAll(".job-card"));

  // Main filter function
  function applyFilters() {
    const locVal = locationFilter.value.toLowerCase();
    const typeVal = typeFilter.value.toLowerCase();
    const searchVal = searchInput.value.toLowerCase();

    jobCards.forEach(card => {
      const title = card.querySelector(".job-title").textContent.toLowerCase();
      const company = card.querySelector(".job-company").textContent.toLowerCase();
      const jobLoc = card.querySelector(".job-location").textContent.toLowerCase();
      const jobType = card.querySelector(".job-type").textContent.toLowerCase();

      const matchesLocation = locVal === "all" || jobLoc.includes(locVal);
      const matchesType = typeVal === "all" || jobType.includes(typeVal);
      const matchesSearch = title.includes(searchVal) || company.includes(searchVal);

      if (matchesLocation && matchesType && matchesSearch) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Event listeners
  locationFilter.addEventListener("change", applyFilters);
  typeFilter.addEventListener("change", applyFilters);
  searchInput.addEventListener("input", applyFilters);
});
