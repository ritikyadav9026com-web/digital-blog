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
    "Earning money online is possible, but it takes the right skills, patience and consistency. You can start by learning a digital skill such as writing, graphic design, video editing, web development or digital marketing. Once you have a useful skill, you can offer your services to clients through online platforms or directly through your network. Another option is creating useful content through a blog, YouTube channel, newsletter or social media page. There is no guaranteed method to make quick money online. Start small, keep learning and focus on creating real value.",


  "Best AI Tools for Students in 2026":
    "AI tools can help students study smarter, save time and understand difficult topics more easily. Useful AI tools can help with research, writing, brainstorming, summarizing, learning and productivity. Students should use AI as a learning assistant rather than a replacement for their own thinking. Always check important information and use AI responsibly.",


  "A Simple Digital Productivity System":
    "A good productivity system does not need to be complicated. Start by writing down the important tasks you need to complete. Choose the most important tasks for the day and work on them without unnecessary distractions. You can use a simple digital notes app or task manager to organize your work. Review your tasks at the end of each day and prepare for tomorrow. The goal is not to stay busy all day, but to consistently complete the work that matters.",


  "How to Build a Better Online Presence":
    "Building a strong online presence starts with clearly showing who you are and what you can offer. Choose a platform that matches your goals and create useful, consistent content. Keep your profile professional, use a clear description and share information that can help your audience. Over time, consistency and useful content can help you build trust and grow your online presence."
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