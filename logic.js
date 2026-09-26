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

// ---------- Priority Style (Card + Modal দুই জায়গায় ব্যবহার হবে) ----------
const getPriorityStyle = (priority) => {
  if (priority == "high") return { bg: "bg-[#FEE2E2]", text: "text-[#EF4444]" };
  if (priority == "medium") return { bg: "bg-[#FEF3C7]", text: "text-[#D97706]" };
  if (priority == "low") return { bg: "bg-[#F3F4F6]", text: "text-[#6B7280]" };
  return { bg: "bg-gray-100", text: "text-gray-500" };
};

// ---------- Label Style (Card + Modal দুই জায়গায় ব্যবহার হবে) ----------
const getLabelStyle = (label) => {
  const name = label.toLowerCase();
  if (name === "bug") {
    return {
      class: "bg-[#FECACA] text-[10px] text-[#EF4444] p-1 rounded-full",
      icon: `<i class="fa-solid fa-bug"></i>`
    };
  }
  if (name === "help wanted") {
    return {
      class: "bg-[#FFF8DB] text-[10px] text-[#D97706] p-1 rounded-full",
      icon: `<i class="fa-regular fa-life-ring"></i>`
    };
  }
  if (name === "enhancement") {
    return {
      class: "bg-[#D1FAE5] text-[10px] text-[#059669] p-1 rounded-full",
      icon: `<i class="fa-solid fa-wand-magic-sparkles"></i>`
    };
  }
  return {
    class: "bg-gray-100 text-[10px] text-gray-600 p-1 rounded-full",
    icon: ""
  };
};

// ---------- Fetch ----------
const loadIssues = (url) => {
  toShowLoader();
  fetch(url)
    .then(res => res.json())
    .then(data => {
      allIssuesData = data.data;
      renderCards(allIssuesData);
      toHideLoader();
    })
    .catch(err => { console.log("Error", err); toHideLoader(); });
};

// ---------- Render Cards ----------
const renderCards = (issues) => {
  cardContainer.innerHTML = "";
  updateIssueCount(issues.length);

  issues.forEach((issue) => {
    const card = document.createElement('div');
    const borderColor = issue.status == "open" ? "border-green-500" : "border-purple-500";
    const statusimg = issue.status == "open"
      ? `<img class="w-3 h-3" src="assets/Open-Status.png" alt="">`
      : `<img class="w-3 h-3" src="assets/Closed- Status .png" alt="">`;
    const priorityStyle = getPriorityStyle(issue.priority);

    const labelsHTML = issue.labels.map((label) => {
      const style = getLabelStyle(label);
      return `<span class="${style.class}">${style.icon} ${label}</span>`;
    }).join("");

    card.className = `card bg-white shadow-sm p-4 border-t-4 ${borderColor} cursor-pointer`;
    card.innerHTML = `
      <div class="flex justify-between items-center">
        ${statusimg}
        <span class="${priorityStyle.bg} rounded-full p-2">
          <p class="text-[10px] ${priorityStyle.text}">${issue.priority}</p>
        </span>
      </div>
      <div class="mt-3">
        <h2 class="text-sm font-semibold">${issue.title}</h2>
        <p class="text-[12px] text-[#64748B]">${issue.description}</p>
      </div>
      <div class="flex gap-2 mt-3">${labelsHTML}</div>
      <div class="pt-3 border-t border-gray-200 -mx-4 mt-4"></div>
      <p class="text-[12px] text-[#64748B] px-4">#${issue.id} by ${issue.author}</p>
      <p class="mt-2 text-[12px] text-[#64748B] px-4">${issue.createdAt}</p>
    `;

    card.addEventListener('click', () => openModal(issue));
    cardContainer.appendChild(card);
  });
};

