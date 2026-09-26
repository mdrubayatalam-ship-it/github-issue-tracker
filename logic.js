// ---------- Issue Count ----------
const updateIssueCount = (count) => {
  document.getElementById('issue-numbers').textContent = `${count} Issues`;
};

// ---------- Tab Buttons ----------
const tabButton = document.querySelectorAll('.tab-btn');

// ---------- Setup ----------
const allUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
const loader = document.getElementById('loader');
const cardContainer = document.getElementById('cardContainer');
const modal = document.getElementById('issueModal');

let allIssuesData = [];

const toShowLoader = () => {
  loader.classList.remove('hidden');
  cardContainer.classList.add('hidden');
};

const toHideLoader = () => {
  loader.classList.add('hidden');
  cardContainer.classList.remove('hidden');
};


