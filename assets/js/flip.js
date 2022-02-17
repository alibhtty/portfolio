/* 
This week we're looking at the FLIP technique. It can take a while to click - but when it does - you'll be able to handle any complex UI animation with ease.

Here's a simple FLIP animation to start you off!

*/

// start by registering the plugin
gsap.registerPlugin(Flip);

// grab our element
const articles = document.querySelectorAll("article");
const buttons = document.querySelectorAll(".grids button");
const alphaButton = document.querySelector("#alpha-order");
const container = document.querySelector(".grids");

for (let article of [...articles]) {
  article.addEventListener("click", (e) => {
    e.preventDefault();
    if (article.classList.contains("details")) {
      return;
    }
    const state = Flip.getState(".grids article");

    const currentDetails = document.querySelector(".details");
    currentDetails && currentDetails.classList.remove("details");

    article.classList.add("details");
    // "FLIP" animate from that saved state.
    const tl = Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.05,
      absolute: true,
      toggleClass: "changing",
      onStart: () => {
        gsap.to(".details-view", {
          opacity: 0,
          y: "100%",
          duration: 0.5
        });
        gsap.to(".grids article", {
          "--max": 0,
          duration: 0.8
        });
        gsap.to(".grids article.details", {
          "--max": 1,
          duration: 1,
          delay: 0.2
        });
      }
    });

    tl.to(
      ".details .details-view",
      { opacity: 1, y: 0, duration: 0.75 },
      "-=.25"
    );
  });
}

for (let button of [...buttons]) {
  button.addEventListener("click", () => {
    const a = button.parentNode.parentNode.parentNode;
    const state = Flip.getState(".grids article, .descriptions .details-view");
    container.prepend(a);
    const tl = Flip.from(state, {
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.05,
      absolute: true
    });
  });
}

alphaButton.addEventListener("click", () => {
  const state = Flip.getState(".grids article, .descriptions .details-view");
  [...articles]
    .sort((r, l) => {
      const titleR = r.querySelector("h2");
      const titleL = l.querySelector("h2");
      if (titleR.textContent > titleL.textContent) return 1;
      if (titleL.textContent > titleR.textContent) return -1;
      return 0;
    })
    .forEach((article) => container.append(article));
  const tl = Flip.from(state, {
    duration: 1,
    ease: "power1.inOut",
    stagger: 0.05,
    absolute: true
  });
});

// Intro animation
window.addEventListener("load", () => {
  gsap.to(".galery", { autoAlpha: 1, duration: 0.4 });
  gsap.from(".grids article", {
    autoAlpha: 0,
    yPercent: 30,
    stagger: 0.04
  });
});
