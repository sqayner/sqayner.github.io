// Aktif section'ı navbar'da vurgulama
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");
function onScroll() {
     let scrollPos = window.scrollY + 120; // navbar yüksekliği kadar offset
     let currentId = "";
     sections.forEach((section) => {
          if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
               currentId = section.getAttribute("id");
          }
     });
     navLinks.forEach((link) => {
          if (link.getAttribute("href") === "#" + currentId) {
               link.classList.add("font-bold");
               link.style.color = "#3e6ff4";
          } else {
               link.classList.remove("font-bold");
               link.style.color = "";
          }
     });
}
window.addEventListener("scroll", onScroll);
window.addEventListener("DOMContentLoaded", onScroll);

// Mobil menü açma/kapama
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll(".nav-link") : [];
let mobileMenuOpen = false;
function toggleMobileMenu() {
     mobileMenuOpen = !mobileMenuOpen;
     if (mobileMenuOpen) {
          mobileMenu.classList.remove("hidden");
     } else {
          mobileMenu.classList.add("hidden");
     }
}
if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMobileMenu);
mobileMenuLinks.forEach((link) =>
     link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          mobileMenuOpen = false;
     })
);

// Fetch and display GitHub projects
async function loadProjects() {
     const projectsList = document.getElementById("projects-list");
     const loading = document.getElementById("projects-loading");
     try {
          const res = await fetch("https://api.github.com/users/sqayner/repos?sort=updated");
          if (!res.ok) throw new Error("GitHub API error");
          const repos = await res.json();
          loading.remove();
          if (!repos.length) {
               projectsList.innerHTML = '<div class="text-center text-gray-500 py-8">No public projects found.</div>';
               return;
          }
          repos.forEach((repo) => {
               // Skip forked repos
               if (repo.fork) return;
               const card = document.createElement("div");
               card.className = "bg-white rounded-xl shadow p-6 hover:scale-105 transition flex flex-col gap-2";
               card.innerHTML = `
                              <h3 class="text-xl font-semibold mb-1">${repo.name}</h3>
                              <p class="mb-2">${repo.description ? repo.description : "No description provided."}</p>
                              <a href="${repo.html_url}" target="_blank" rel="noopener" class="font-medium hover:underline" style="color:#3e6ff4">Projeye Git</a>
                         `;
               projectsList.appendChild(card);
          });
          // Remove loading if all repos were forks
          if (!projectsList.querySelector("div.bg-white")) {
               projectsList.innerHTML = '<div class="text-center text-gray-500 py-8">No public projects found.</div>';
          }
     } catch (e) {
          loading.innerText = "Failed to load projects.";
     }
}
window.addEventListener("DOMContentLoaded", loadProjects);
