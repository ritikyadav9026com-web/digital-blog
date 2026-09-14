const body = document.body;

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("mainNav");

const searchInput = document.getElementById("searchInput");
const posts = [...document.querySelectorAll(".post")];
const emptyState = document.getElementById("emptyState");

const modal = document.getElementById("articleModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("articleModalContent");
const closeModal = document.getElementById("closeModal");


// ==============================
// DARK MODE
// ==============================

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  const isDark = body.classList.contains("dark");

  themeBtn.textContent = isDark ? "☀" : "☾";

  localStorage.setItem(
    "digitalBlogTheme",
    isDark ? "dark" : "light"
  );
});


// Load saved theme
if (localStorage.getItem("digitalBlogTheme") === "dark") {
  body.classList.add("dark");
  themeBtn.textContent = "☀";
}


// ==============================
// MOBILE MENU
// ==============================

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", open);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});


// ==============================
// SEARCH + CATEGORY FILTER
// ==============================

function filterPosts(category = "") {

  const query = searchInput.value
    .toLowerCase()
    .trim();

  let shown = 0;

  posts.forEach(post => {

    const title =
      post.dataset.title.toLowerCase();

    const text =
      post.textContent.toLowerCase();

    const postCategory =
      post.dataset.category;

    const categoryMatch =
      !category ||
      postCategory === category;

    const searchMatch =
      !query ||
      title.includes(query) ||
      text.includes(query);

    const visible =
      categoryMatch && searchMatch;

    post.style.display =
      visible ? "" : "none";

    if (visible) {
      shown++;
    }
  });

  emptyState.hidden = shown !== 0;
}


// Search while typing
searchInput.addEventListener("input", () => {
  filterPosts();
});


// ==============================
// TOPIC BUTTONS
// ==============================

document.querySelectorAll(".topic").forEach(topic => {

  topic.addEventListener("click", () => {

    document
      .querySelectorAll(".topic")
      .forEach(item => {
        item.classList.remove("selected");
      });

    topic.classList.add("selected");

    searchInput.value = "";

    filterPosts(
      topic.dataset.category
    );

    document
      .getElementById("articles")
      .scrollIntoView({
        behavior: "smooth"
      });

  });

});


// ==============================
// ARTICLE CONTENT
// ==============================

const articleContent = {

  "How to Earn Money Online in 2026":
  "How to earn money online in 2026 requires useful skills, patience and consistent effort. Beginners can start by learning skills such as content writing, graphic design, video editing, web development or digital marketing. After building a basic skill, you can look for freelance work, create useful content, build a blog or explore legitimate affiliate marketing opportunities. It is important to avoid websites or offers that promise quick and guaranteed income. Focus on learning valuable skills, helping people solve real problems and improving your work over time.",  


  "Best AI Tools for Students in 2026":
  "AI tools can be useful for students when they are used correctly. They can help with understanding difficult topics, generating study ideas, summarizing notes, improving writing and organizing daily study tasks. Students should compare important information with reliable sources instead of blindly trusting AI-generated answers. It is also important to use AI to support learning rather than submitting AI-generated work as your own. Choosing the right tool depends on the student's subject, learning goal and the type of help they need.",
  
  
  "A Simple Digital Productivity System":
  "A simple digital productivity system can help you organize your work, reduce distractions and make better use of your time. Start by listing the tasks you need to complete and identify the two or three most important ones. Use a notes app, calendar or task manager to keep your tasks organized. Try to work on one important task at a time instead of constantly switching between different activities. At the end of the day, review what you completed and prepare a short plan for the next day. A good productivity system should be simple enough to follow consistently.",


  "How to Build a Better Online Presence":
  "Building a better online presence starts with clearly communicating who you are, what you know and how you can help others. Choose one or two platforms that are suitable for your goals and create useful content regularly. Keep your profile clear and professional, use a simple description and make sure the information you share is accurate and helpful. You can share tutorials, practical tips, personal experiences and useful resources related to your area of interest. Avoid copying content from other websites. Over time, original and helpful content can help you build credibility, connect with an audience and create new opportunities.",

  
"How to Start Freelancing as a Beginner in 2026":
"Freelancing allows beginners to offer their skills to clients without working as a traditional full-time employee. To get started, first choose one skill you can learn and practice, such as content writing, graphic design, video editing, web development or digital marketing. Create a few original sample projects to show what you can do. Then look for suitable freelance opportunities and communicate clearly with potential clients about the work, deadline and payment. Beginners should avoid offers that ask for large upfront fees or promise guaranteed income. Start with realistic goals, improve your skills through practice and build a professional reputation by delivering useful work on time.",
 
"How to Create a Professional Resume Using Digital Tools":
  "A professional resume is a simple way to present your education, skills, experience and achievements to potential employers. Beginners can use digital tools to create a clean and easy-to-read resume without needing advanced design skills. Start with your name and contact information, followed by a short summary, education, relevant skills and any projects or experience. Use clear headings and avoid unnecessary graphics or information. Before sending your resume, check it carefully for spelling mistakes and make sure the information is accurate. A clear and honest resume can help employers quickly understand your skills and suitability for an opportunity.",
};

// ==============================
// OPEN ARTICLE
// ==============================

document.querySelectorAll(".read-more").forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const title =
      link.dataset.title;

    modalTitle.textContent = title;

    modalContent.textContent =
      articleContent[title] ||
      "This article is coming soon. Keep checking Digital Blog for more useful content.";

    modal.classList.add("show");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

  });

});


// ==============================
// CLOSE ARTICLE
// ==============================

function hideModal() {

  modal.classList.remove("show");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );
}


closeModal.addEventListener(
  "click",
  hideModal
);


// Close when clicking outside
modal.addEventListener("click", event => {

  if (event.target === modal) {
    hideModal();
  }

});


// Close with Escape key
document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    hideModal();
  }

});


// ==============================
// NEWSLETTER
// ==============================

document
  .getElementById("subscribeForm")
  .addEventListener("submit", event => {

    event.preventDefault();

    const email =
      document.getElementById("emailInput").value;

    const message =
      document.getElementById("formMessage");

    message.textContent =
      `Thanks! ${email} is on the list (demo).`;

    event.target.reset();

  });


// ==============================
// CURRENT YEAR
// ==============================

document.getElementById("year").textContent =
  new Date().getFullYear();