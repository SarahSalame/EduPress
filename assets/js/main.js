/* ___________________________navbar________________________ */
const navBar = document.querySelector("nav");

window.onscroll = () => {
  if (window.scrollY > 0) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
};

const listBtn = document.querySelector(".list-btn");
const sideBar = document.querySelector("nav");
const sideBarContainer = document.createElement("div");
const body = document.querySelector("body");
const modeSwitch = document.querySelector(".mode-switch");
const modeSwitchIcon = document.querySelector(".mode-icon");

modeSwitchIcon.style.transition = "300ms";

body.setAttribute("data-theme", localStorage.getItem("mode") ?? "light");

if (localStorage.getItem("mode") == "dark") {
  modeSwitchIcon.className = "fa-solid fa-sun mode-icon";
} else {
  modeSwitchIcon.className = "fa-solid fa-moon mode-icon";
}

modeSwitch.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);

  localStorage.setItem("mode", newTheme);

  modeSwitchIcon.className =
    localStorage.getItem("mode") == "dark"
      ? "fa-solid fa-sun mode-icon"
      : "fa-solid fa-moon mode-icon";

  modeSwitchIcon.style.opacity = "0.8";

  setTimeout(() => {
    modeSwitchIcon.style.opacity = "1";
  }, 300);
});

sideBarContainer.classList.add("side-bar");
sideBar.appendChild(sideBarContainer);
sideBarContainer.innerHTML = `
  <div class='side-bar-header'>
    <img src='./assets/images/logo.svg' alt='logo'/>
  </div>
  <div class='side-bar-body'>
    <a class="nav-links" data-lang='home' href="index.html" >Home</a>
    <a class="nav-links" data-lang='courses' href="courses.html">Courses</a>
    <a class="nav-links" data-lang='blog' href="blog.html">Blog</a>
    <button class=nav-drop-down-btn>
      <div>
        <span data-lang='page'>
        Page
        </span>
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_76_21)">
            <path d="M11.7104 5.72656L8.65039 8.7799L5.59039 5.72656L4.65039 6.66656L8.65039 10.6666L12.6504 6.66656L11.7104 5.72656Z" fill="black"/>
          </g>
          <defs>
            <clipPath id="clip0_76_21">
              <rect width="16" height="16" fill="white" transform="translate(0.650391)"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    </button>
    <a class="nav-links" href="#" data-lang='premium_theme'>Premium Theme</a>
  </div>
  <div class='side-bar-footer'>
    <div>
      <label for="search">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.16667 3.33341C5.94501 3.33341 3.33334 5.94509 3.33334 9.16675C3.33334 12.3884 5.94501 15.0001 9.16667 15.0001C12.3883 15.0001 15 12.3884 15 9.16675C15 5.94509 12.3883 3.33341 9.16667 3.33341ZM1.66667 9.16675C1.66667 5.02461 5.02454 1.66675 9.16667 1.66675C13.3088 1.66675 16.6667 5.02461 16.6667 9.16675C16.6667 13.3089 13.3088 16.6667 9.16667 16.6667C5.02454 16.6667 1.66667 13.3089 1.66667 9.16675Z" fill="black"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2858 13.2858C13.6112 12.9604 14.1388 12.9604 14.4643 13.2858L18.0893 16.9108C18.4147 17.2363 18.4147 17.7639 18.0893 18.0893C17.7638 18.4148 17.2362 18.4148 16.9108 18.0893L13.2858 14.4643C12.9603 14.1389 12.9603 13.6113 13.2858 13.2858Z" fill="black"/>
        </svg>
      </label>
      <input autocomplete="off" placeholder="Search" type="text" name="search" id="search"/>
    </div>
    <a class='primary-btn' href="./login.html" data-lang='login'>Login</a>
  </div>
`;

const currentPage = window.location.pathname.split("/").pop();

const sideBarLinks = document.querySelectorAll(".nav-links");
sideBarLinks.forEach((btn) => {
  const link = btn.getAttribute("href");
  if (link === currentPage) {
    btn.classList.add("active");
  }
});

const navDropDown = document.querySelectorAll(".nav-drop-down-btn");

navDropDown.forEach((btn) => {
  const dropDownContainer = document.createElement("div");
  btn.appendChild(dropDownContainer);
  dropDownContainer.classList.add("drop-down");
  dropDownContainer.style.transform = "scale(0)";
  dropDownContainer.innerHTML = `
    <a href='./contact.html' data-lang='contact'>contact</a>
    <a href='./faq.html' data-lang='faq'>faq</a>
  `;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropDownContainer.style.transform === "scaleX(1)translateY(50px)";
    toggleDropDown(dropDownContainer, !isOpen);
  });
});

const toggleSidebar = (isOpen) => {
  sideBarContainer.style.transform = isOpen ? "translateX(0)" : "translateX(100%)";
};

const toggleDropDown = (container, open) => {
  container.style.transform = open ? "scaleX(1)translateY(50px)" : "scale(0)";
};

const handleBodyClick = (e) => {
  const isClickOutside = !sideBarContainer.contains(e.target) && e.target !== listBtn;
  if (isClickOutside) {
    toggleSidebar(false);
  }
};

listBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleSidebar(true);
});
body.addEventListener("click", handleBodyClick);

body.addEventListener("click", () => {
  navDropDown.forEach((btn) => {
    const dropDownContainer = btn.querySelector(".drop-down");
    toggleDropDown(dropDownContainer, false);
  });
});

window.onresize = () => {
  if (window.innerWidth > 1023) {
    toggleSidebar(false);
  }
};

/* ___________________________courses________________________ */

const courses = [
  { img: "./assets/images/course1.png", title: "Create an LMS Website with LearnPress", duration: "2Weeks", students: "156 Students", price: "$29.0", free: "Free" },
  { img: "./assets/images/course2.png", title: "Mastering Lightroom Essentials", duration: "1Week", students: "120 Students", price: "$25.0", free: "Free" },
  { img: "./assets/images/course3.png", title: "Photography Basics for Beginners", duration: "3Weeks", students: "210 Students", price: "$35.0", free: "Free" },
  { img: "./assets/images/course4.png", title: "Learn Portrait Photography", duration: "2Weeks", students: "180 Students", price: "$30.0", free: "Free" },
  { img: "./assets/images/course5.png", title: "Creative Photography Techniques", duration: "1.5Weeks", students: "160 Students", price: "$27.0", free: "Free" },
  { img: "./assets/images/course6.png", title: "Advanced Photography Projects", duration: "2.5Weeks", students: "175 Students", price: "$32.0", free: "Free" },
  { img: "./assets/images/course3.png", title: "Photography Basics Again", duration: "2Weeks", students: "200 Students", price: "$20.0", free: "Free" },
  { img: "./assets/images/course4.png", title: "Portrait Masterclass", duration: "2Weeks", students: "300 Students", price: "$40.0", free: "Free" },
  { img: "./assets/images/course1.png", title: "Full LMS Build", duration: "2Weeks", students: "222 Students", price: "$35.0", free: "Free" },
];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

let pages = [];
let coursePage = 0;

function paginateCourses(courses, perPage = 6) {
  const paginated = [];
  for (let i = 0; i < courses.length; i += perPage) {
    paginated.push(courses.slice(i, i + perPage));
  }
  return paginated;
}

function renderCoursesPage(index) {
  const container = document.getElementById("courses-cards");
  container.innerHTML = "";

  pages[index].forEach((course) => {
    container.innerHTML += `
      <div class="course">
        <span class="course-tag">Photography</span>
        <img src="${course.img}" alt="course-img" class="course-img" />
        <div class="course-details">
          <p>by <span>Determined-Poitras</span></p>
          <h3>${course.title}</h3>
          <div class="course-info">
            <div>
              <img src="./assets/images/icons/clock.svg" alt="" />
              <span>${course.duration}</span>
            </div>
            <div>
              <img src="./assets/images/icons/hat.svg" alt="" />
              <span>${course.students}</span>
            </div>
          </div>
          <div class="course-footer">
            <p>${course.price} <span>${course.free}</span></p>
            <a href="#">View more</a>
          </div>
        </div>
      </div>
    `;
  });
  coursePage = index;
  updatePaginationUI(index);
}

function renderPaginationControls() {
  const ul = document.querySelector(".pagination ul");
  ul.innerHTML = "";

  ul.innerHTML += `<li id="prev">&lt;</li>`;

  pages.forEach((_, i) => {
    ul.innerHTML += `<li><a href="#" data-index="${i}" class="${i === 0 ? 'active' : ''}">${i + 1}</a></li>`;
  });

  ul.innerHTML += `<li id="next">&gt;</li>`;

  document.querySelectorAll(".pagination a").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(e.target.dataset.index);
      renderCoursesPage(index);
    });
  });

  document.getElementById("prev").addEventListener("click", () => {
    if (coursePage > 0) {
      renderCoursesPage(--coursePage);
    }
  });

  document.getElementById("next").addEventListener("click", () => {
    if (coursePage < pages.length - 1) {
      renderCoursesPage(++coursePage);
    }
  });
}

function updatePaginationUI(activeIndex) {
  document.querySelectorAll(".pagination a").forEach((a, i) => {
    a.classList.toggle("active", i === activeIndex);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const shuffled = shuffleArray(courses);
  pages = paginateCourses(shuffled, 6);
  renderCoursesPage(0);
  renderPaginationControls();
});



document.addEventListener("DOMContentLoaded", () => {
  const shuffled = shuffleArray(courses);
  pages = paginateCourses(shuffled, 6);
  renderCoursesPage(0);
  renderPaginationControls();


  const searchInput = document.getElementById("searchInput");
  
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredCourses = courses.filter(course => {
      return (
        course.title.toLowerCase().includes(query) ||
        course.duration.toLowerCase().includes(query) ||
        course.students.toLowerCase().includes(query) ||
        course.price.toLowerCase().includes(query)
      );
    });
    pages = paginateCourses(filteredCourses, 6);
    renderCoursesPage(0); 
    renderPaginationControls();
  });
});
