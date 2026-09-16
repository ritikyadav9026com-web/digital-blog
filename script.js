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
"Making money online in 2026 is possible, but it usually requires useful skills, consistent effort and realistic expectations. Beginners should focus on learning a skill instead of looking for quick-money schemes.

One practical option is freelancing. Skills such as content writing, graphic design, video editing, web development and digital marketing can be learned through regular practice. After building some sample work, beginners can look for suitable freelance projects and gradually build experience.

Another option is creating useful online content. A person can start a blog, YouTube channel or other content platform around a topic they understand. Helpful tutorials, guides and educational content can gradually attract an audience.

Affiliate marketing is another method, where a person can recommend relevant products or services and potentially earn a commission when someone makes a qualifying purchase through their link. It is important to clearly explain recommendations and avoid misleading claims.

Beginners should be careful with websites or offers that promise guaranteed income, ask for large upfront payments or claim that money can be earned without any effort. Before using an online earning platform, check its terms, reputation and payment conditions.

The most sustainable approach is to build valuable skills, create useful work, learn from experience and improve consistently. Online income can take time, so patience and realistic goals are important."
  "Best AI Tools for Students in 2026":
"AI tools can be useful for students when they are used as learning assistants rather than replacements for studying. They can help students understand difficult concepts, organize notes, generate practice questions and improve the clarity of their writing.

One useful way to use AI is for explanations. If a student does not understand a topic, they can ask for a simple explanation and then use textbooks, class notes and reliable educational sources to verify the information.

AI can also help with study planning. Students can create a revision schedule, break a large topic into smaller sections and generate practice questions for self-testing. This can make study sessions more organized.

Writing assistance is another common use. AI tools can help identify grammar problems, suggest clearer wording or explain why a sentence may be difficult to understand. Students should still make sure that their final work represents their own understanding and follows their school's or institution's rules.

Students should also remember that AI-generated information can sometimes be incorrect or incomplete. Important facts should therefore be checked using reliable sources.

The best use of AI for education is to support curiosity, practice and understanding. Students who combine AI tools with their own reading, thinking and problem-solving can use technology more effectively while continuing to develop independent learning skills."

"A Simple Digital Productivity System":
"A simple digital productivity system can help you organize your daily work, reduce distractions and make better use of your available time. The goal is not to use many complicated apps, but to create a system that is simple enough to follow every day.

Start by writing down all the tasks you need to complete. Then identify the two or three tasks that are most important. Completing important tasks first can help you make steady progress instead of spending the whole day on small activities.

A calendar can be used for appointments, deadlines and fixed activities, while a notes or task-management app can be used for smaller tasks and ideas. Keeping information in one organized place can make it easier to remember what needs to be done.

Another useful habit is to avoid constantly switching between tasks. Try to focus on one important activity for a specific period and take short breaks when needed. Turning off unnecessary notifications can also reduce interruptions.

At the end of the day, spend a few minutes reviewing your progress. Mark completed tasks and move unfinished tasks to another suitable time. You can then prepare a short list for the following day.

A good productivity system should make your work easier, not create additional stress. Start with a simple routine, use only the tools you actually need and improve the system gradually based on your experience."

"How to Build a Better Online Presence":
"Building a better online presence starts with clearly communicating who you are, what you know and how you can help other people. Whether you are a student, freelancer, creator or beginner professional, your online presence should provide useful and accurate information.

Start by choosing one or two platforms that match your goals. Instead of trying to be active everywhere, focus on creating useful content consistently on the platforms where your intended audience is most likely to be present.

Your profile should clearly explain your interests, skills or area of work. Use a simple description and keep important information accurate. If you have a portfolio, website or useful projects, you can include relevant links where appropriate.

Content is an important part of an online presence. You can publish tutorials, practical tips, explanations, project updates and other original material related to your interests. Try to solve real problems instead of simply copying popular content from other websites.

Consistency is also important. You do not need to publish something every day. A realistic schedule that you can maintain is usually easier to follow than an aggressive schedule that quickly becomes difficult.

Finally, review your online profiles from time to time. Remove outdated information, correct mistakes and make sure the content you publish represents your current skills and interests.

A useful online presence takes time to build. Focus on providing genuine value, communicating clearly and improving your work through regular practice."

"How to Start Freelancing as a Beginner in 2026":
"Freelancing allows people to offer their skills to clients without working as traditional full-time employees. For beginners, the first step is to choose one skill and spend enough time learning and practicing it.

Some skills that can be useful for freelancing include content writing, graphic design, video editing, web development, virtual assistance and digital marketing. Beginners should avoid trying to learn too many skills at the same time. Focusing on one area can make it easier to build useful experience.

After learning the basics, create a few original sample projects. These samples can demonstrate your ability even when you do not have previous client experience. Keep the samples clear, well-organized and relevant to the type of work you want to offer.

The next step is to look for suitable freelance opportunities. Before accepting any project, understand what the client needs, the expected deadline, the payment terms and the work involved. Clear communication can prevent many misunderstandings.

Beginners should also be careful about suspicious offers. Avoid opportunities that require large upfront payments, request unnecessary sensitive information or promise guaranteed earnings for very little work.

At first, building a freelance career may take time. Focus on improving your skill, completing work responsibly and learning from feedback. Over time, good-quality work and professional communication can help you build experience and a stronger portfolio.

Freelancing is not a guaranteed way to make money quickly. It is better to treat it as a skill-based career path that requires learning, patience, communication and consistent effort."

"How to Create a Professional Resume Using Digital Tools":
"A professional resume is a simple document that presents your education, skills, projects, experience and achievements to potential employers. Digital tools make it easier for beginners to create a clean and readable resume without needing advanced design skills.

Start with your name and basic contact information. Depending on the opportunity, you can then include a short professional summary, education, relevant skills, projects, work experience and other achievements that are useful for the position.

When describing skills or experience, use clear and specific information. Instead of simply writing that you are good at a particular skill, mention a project or task where you actually used it. Students without formal work experience can include academic projects, personal projects, internships or relevant volunteer work.

Keep the design simple. Use clear headings, readable fonts and consistent spacing. Avoid unnecessary graphics, excessive colors or information that does not help the reader understand your qualifications.

Before sending your resume, check the document carefully for spelling, grammar and formatting mistakes. Make sure your contact details and other information are accurate. It can also be useful to create a PDF version so that the formatting remains consistent when the resume is opened on another device.

A resume should be adapted when appropriate for different opportunities. Highlight the skills and experience that are relevant to the particular role instead of sending exactly the same information everywhere.

Most importantly, keep the resume honest. Do not add qualifications, experience or skills that you do not actually have. A clear, accurate and well-organized resume can make it easier for an employer to understand your background and decide whether to learn more about you."
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
