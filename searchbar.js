function showDropdown() {
    document.getElementById("dropdownMenu").classList.remove("hidden");
  }
  
  document.addEventListener("click", function(event) {
    let dropdown = document.getElementById("dropdownMenu");
    let input = document.getElementById("searchInput");
  
    if (!dropdown.contains(event.target) && event.target !== input) {
      dropdown.classList.add("hidden");
    }
  });
  
  function filterDropdown() {
    let input = document.getElementById("searchInput").value.toUpperCase();
    let items = document.getElementById("dropdownList").getElementsByTagName("li");
  
    for (let i = 0; i < items.length; i++) {
      let a = items[i].getElementsByTagName("a")[0];
      let txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(input) > -1) {
        items[i].style.display = "";
      } else {
        items[i].style.display = "none";
      }
    }
  }