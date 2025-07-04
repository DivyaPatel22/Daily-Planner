// Theme Persistence
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark") {
  body.classList.add("dark");
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
});

// Date + Quote (for dashboard)
const dateEl = document.getElementById("date");
const quoteEl = document.getElementById("quote");
if (dateEl) dateEl.textContent = new Date().toDateString();
if (quoteEl) {
  const quotes = [
    "Push yourself, because no one else will.",
    "Dream bigger. Do bigger.",
    "Don't stop when you're tired. Stop when you're done.",
    "Success doesn’t come to you. You go to it.",
  ];
  quoteEl.textContent = quotes[new Date().getDate() % quotes.length];
}

// Task Logic (on tasks.html)
const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-task");
const list = document.getElementById("task-list");
const select = document.getElementById("priority-select");

if (addBtn) {
  addBtn.addEventListener("click", () => {
    const taskText = input.value.trim();
    const priority = select.value;
    if (!taskText) return;

    const li = document.createElement("li");
    li.textContent = taskText;
    li.classList.add(priority);

    li.addEventListener("click", () => {
      li.classList.toggle("done");
      updateProgress();
    });

    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = "❌";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
      updateProgress();
    });

    li.appendChild(removeBtn);
    list.appendChild(li);
    input.value = "";
    updateProgress();
  });
}

function updateProgress() {
  const all = document.querySelectorAll("#task-list li");
  const done = document.querySelectorAll("#task-list li.done");
  const percent = all.length ? Math.round((done.length / all.length) * 100) : 0;
  const percentDisplay = document.getElementById("completion-percent");
  const bar = document.getElementById("progress-fill");
  if (percentDisplay) percentDisplay.textContent = `${percent}%`;
  if (bar) bar.style.width = `${percent}%`;
}

// Calendar logic
const calendarGrid = document.getElementById("calendar-grid");
if (calendarGrid) {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement("div");
    cell.textContent = i;
    if (i === today.getDate()) {
      cell.classList.add("today");
    }
    calendarGrid.appendChild(cell);
  }
}