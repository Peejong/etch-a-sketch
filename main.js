const triggerAnimations = () => {
  const intro_section = document.querySelector(".main-introduction");
  const workspace_section = document.querySelector(".main-workspace");
  const TIMEOUT_DURATION = 3000;

  const triggerFadeOutIntroduction = () => {
    setTimeout(() => intro_section.classList.add("hidden"), TIMEOUT_DURATION);
  };

  const triggerFadeInWorkspace = () => {
    intro_section.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "opacity") return;
      workspace_section.classList.remove("hidden");
    });
  };

  triggerFadeOutIntroduction();
  triggerFadeInWorkspace();
};

triggerAnimations();
