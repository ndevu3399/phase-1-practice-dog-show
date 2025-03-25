document.addEventListener("DOMContentLoaded", () => {
    const dogTable = document.getElementById("dog-table-body");
    const dogForm = document.getElementById("dog-form");
    let editingDogId = null;
  
    // Fetch dogs and display them in the table
    function fetchDogs() {
      fetch("http://localhost:3000/dogs")
        .then(response => response.json())
        .then(dogs => {
          dogTable.innerHTML = "";
          dogs.forEach(dog => addDogToTable(dog));
        });
    }
  
    // Add a dog row to the table
    function addDogToTable(dog) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}" class="edit-btn">Edit</button></td>
      `;
      dogTable.appendChild(row);
  
      // Add event listener to Edit button
      row.querySelector(".edit-btn").addEventListener("click", () => {
        editingDogId = dog.id;
        document.getElementById("name").value = dog.name;
        document.getElementById("breed").value = dog.breed;
        document.getElementById("sex").value = dog.sex;
      });
    }
  
    // Handle form submission for updating a dog
    dogForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      if (!editingDogId) return;
  
      const updatedDog = {
        name: document.getElementById("name").value,
        breed: document.getElementById("breed").value,
        sex: document.getElementById("sex").value,
      };
  
      fetch(`http://localhost:3000/dogs/${editingDogId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDog),
      })
      .then(response => response.json())
      .then(() => {
        fetchDogs(); // Refresh the table
        dogForm.reset();
        editingDogId = null;
      });
    });
  
    // Initial fetch of dogs
    fetchDogs();
  });
  