let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
let editIndex = null;
let salarySortDesc = true;

const jobForm = document.getElementById("jobForm");
const jobGrid = document.getElementById("jobGrid");
const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");
const jobCount = document.getElementById("jobCount");
const formTitle = document.getElementById("formTitle");
const emptyState = document.getElementById("emptyState");
const cancelEdit = document.getElementById("cancelEdit");
const sortBtn = document.getElementById("sortBtn");
const totalJobs = document.getElementById("totalJobs");

function saveJobs() {
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

function renderJobs(data = jobs) {
  jobGrid.innerHTML = "";
  jobCount.innerText = "Total Jobs: " + data.length;
  totalJobs.innerText = data.length + " Jobs";

  if (data.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
  }

  data.forEach((job, index) => {
    jobGrid.innerHTML += `
      <div class="job-card">
        ${job.featured ? '<span class="badge">Featured</span>' : ''}
        <h3>${job.title}</h3>
        <p><strong>${job.company}</strong> • ${job.location}</p>
        <p>₹${job.salary} LPA • ${job.type}</p>
        <p>${job.experience} • ${job.category}</p>
        <button onclick="applyJob('${job.title}')">Apply</button>
        <button onclick="editJob(${index})">Edit</button>
        <button onclick="deleteJob(${index})">Delete</button>
      </div>
    `;
  });
}

jobForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const jobData = {
    title: title.value,
    company: company.value,
    location: location.value,
    salary: salary.value,
    type: type.value,
    experience: experience.value,
    category: category.value,
    featured: featured.checked
  };

  if (editIndex === null) {
    jobs.push(jobData);
  } else {
    jobs[editIndex] = jobData;
    editIndex = null;
    submitBtn.innerText = "Add Job";
    formTitle.innerText = "Post a New Job";
    cancelEdit.style.display = "none";
  }

  saveJobs();
  renderJobs();
  jobForm.reset();
});

function deleteJob(index) {
  if (confirm("Delete this job?")) {
    jobs.splice(index, 1);
    saveJobs();
    renderJobs();
  }
}

function editJob(index) {
  const job = jobs[index];

  title.value = job.title;
  company.value = job.company;
  location.value = job.location;
  salary.value = job.salary;
  type.value = job.type;
  experience.value = job.experience;
  category.value = job.category;
  featured.checked = job.featured;

  editIndex = index;
  submitBtn.innerText = "Update Job";
  formTitle.innerText = "Update Job";
  cancelEdit.style.display = "inline-block";
}

cancelEdit.addEventListener("click", function() {
  jobForm.reset();
  editIndex = null;
  submitBtn.innerText = "Add Job";
  formTitle.innerText = "Post a New Job";
  cancelEdit.style.display = "none";
});

function applyJob(title) {
  alert("Application submitted for: " + title);
}

searchInput.addEventListener("input", function() {
  const keyword = this.value.toLowerCase();

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(keyword) ||
    job.company.toLowerCase().includes(keyword)
  );

  renderJobs(filtered);
});

sortBtn.addEventListener("click", function() {
  salarySortDesc = !salarySortDesc;

  jobs.sort((a, b) =>
    salarySortDesc ? b.salary - a.salary : a.salary - b.salary
  );

  renderJobs();
});

renderJobs();
