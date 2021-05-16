const triggerSceneAnimations = () => {
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

const triggerOpenCloseAdjustGridSlider = () => {
  const adjustGrid_button = document.querySelector(".button");
  const sliderContainer_div = document.querySelector(".slider-container");

  const triggerOpenSlider = () => {
    adjustGrid_button.addEventListener("click", () => {
      sliderContainer_div.classList.remove("hidden");
    });
  };

  const triggerCloseSlider = () => {
    sliderContainer_div.addEventListener("mouseleave", () => {
      sliderContainer_div.classList.add("hidden");
    });
  };

  triggerOpenSlider();
  triggerCloseSlider();
};

triggerSceneAnimations();
triggerOpenCloseAdjustGridSlider();
