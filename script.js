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
`Making money online in 2026 is possible, but it usually requires useful skills, consistent effort and realistic expectations.

Beginners should focus on learning a skill instead of looking for quick-money schemes. Skills such as content writing, graphic design, video editing, web development and digital marketing can provide different online opportunities.

One practical option is freelancing. After building some sample work, beginners can look for suitable freelance projects and gradually build experience.

Another option is creating useful online content. A person can start a blog, YouTube channel or another content platform around a topic they understand. Helpful tutorials, guides and educational content can gradually attract an audience.

Affiliate marketing is another method where a person can recommend relevant products or services and potentially earn a commission when someone makes a qualifying purchase through their link.

Beginners should be careful with websites or offers that promise guaranteed income, ask for large upfront payments or claim that money can be earned without any effort.

The most sustainable approach is to build valuable skills, create useful work, learn from experience and improve consistently. Online income can take time, so patience and realistic goals are important.`,

  "Best AI Tools for Students in 2026":
`AI tools can be useful for students when they are used as learning assistants rather than replacements for studying.

They can help students understand difficult concepts, organize notes, generate practice questions and improve the clarity of their writing.

One useful way to use AI is for explanations. If a student does not understand a topic, they can ask for a simple explanation and then use textbooks, class notes and reliable educational sources to verify the information.

AI can also help with study planning. Students can create a revision schedule, break a large topic into smaller sections and generate practice questions for self-testing.

Writing assistance is another common use. AI tools can help identify grammar problems and suggest clearer wording.

Students should remember that AI-generated information can sometimes be incorrect or incomplete. Important facts should therefore be checked using reliable sources.

The best use of AI for education is to support curiosity, practice and understanding.`,

  "A Simple Digital Productivity System":
`A simple digital productivity system can help you organize your daily work, reduce distractions and make better use of your available time.

The goal is not to use many complicated apps, but to create a system that is simple enough to follow every day.

Start by writing down all the tasks you need to complete. Then identify the two or three tasks that are most important.

A calendar can be used for appointments, deadlines and fixed activities, while a notes or task-management app can be used for smaller tasks and ideas.

Another useful habit is to avoid constantly switching between tasks. Try to focus on one important activity for a specific period and take short breaks when needed.

Turning off unnecessary notifications can also reduce interruptions.

At the end of the day, review your progress and prepare a short list for the following day.

A good productivity system should make your work easier, not create additional stress.`,

  "How to Build a Better Online Presence":
`Building a better online presence starts with clearly communicating who you are, what you know and how you can help other people.

Whether you are a student, freelancer, creator or beginner professional, your online presence should provide useful and accurate information.

Start by choosing one or two platforms that match your goals. Focus on creating useful content consistently instead of trying to be active everywhere.

Your profile should clearly explain your interests, skills or area of work. Use a simple description and keep important information accurate.

You can publish tutorials, practical tips, explanations, project updates and other original material related to your interests.

Try to solve real problems instead of simply copying popular content from other websites.

Consistency is also important. You do not need to publish something every day. A realistic schedule that you can maintain is usually easier to follow.

A useful online presence takes time to build. Focus on providing genuine value, communicating clearly and improving your work through regular practice.`,

  "How to Start Freelancing as a Beginner in 2026":
`Freelancing allows people to offer their skills to clients without working as traditional full-time employees.

For beginners, the first step is to choose one skill and spend enough time learning and practicing it.

Some useful freelancing skills include content writing, graphic design, video editing, web development, virtual assistance and digital marketing.

After learning the basics, create a few original sample projects. These samples can demonstrate your ability even when you do not have previous client experience.

Before accepting a project, understand what the client needs, the deadline, payment terms and the work involved.

Beginners should be careful about suspicious offers. Avoid opportunities that require large upfront payments or promise guaranteed earnings for very little work.

Building a freelance career may take time. Focus on improving your skill, completing work responsibly and learning from feedback.

Freelancing is not a guaranteed way to make money quickly. It is a skill-based career path that requires learning, patience, communication and consistent effort.`,

  "How to Create a Professional Resume Using Digital Tools":
`A professional resume is a simple document that presents your education, skills, projects, experience and achievements to potential employers.

Digital tools make it easier for beginners to create a clean and readable resume without needing advanced design skills.

Start with your name and basic contact information. Then include a short professional summary, education, relevant skills, projects, work experience and other useful achievements.

When describing skills or experience, use clear and specific information. Students without formal work experience can include academic projects, personal projects, internships or relevant volunteer work.

Keep the design simple. Use clear headings, readable fonts and consistent spacing. Avoid unnecessary graphics or information.

Before sending your resume, check it carefully for spelling, grammar and formatting mistakes. Make sure your contact details and other information are accurate.

It can also be useful to create a PDF version so that the formatting remains consistent on different devices.

Most importantly, keep the resume honest. Do not add qualifications, experience or skills that you do not actually have.

A clear, accurate and well-organized resume can make it easier for an employer to understand your background.`

};

// ==============================
// OPEN ARTICLE
// ==============================

document.querySelectorAll(".read-more").forEach(link => {

  link.addEventListener("click", event => {

    event.preventDefault();

    const title =
  link.dataset.title;

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
