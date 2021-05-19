const activateSceneAnimations = () => {
  const intro_section = document.querySelector(".main-introduction");
  const workspace_section = document.querySelector(".main-workspace");
  const TIMEOUT_DURATION = 3000;

  const activateFadeOutIntroduction = () => {
    setTimeout(() => intro_section.classList.add("hidden"), TIMEOUT_DURATION);
  };

  const activateFadeInWorkspace = () => {
    intro_section.addEventListener("transitionend", (e) => {
      if (e.propertyName !== "opacity") return;
      workspace_section.classList.remove("hidden");
    });
  };

  activateFadeOutIntroduction();
  activateFadeInWorkspace();
};

const executeEtchASketch = () => {
  const slider_input = document.querySelector(".input-grid");

  const makeDefaultSketchGrid = () => {
    const DEFAULT_VALUE = 16;
    makeGrid(DEFAULT_VALUE);
    activateColorTools();
  };

  const updateSketchGrid = () => {
    slider_input.addEventListener("mouseup", () => {
      const newValue = slider_input.value;
      removePreviousGridElements();
      makeGrid(newValue);
      activateColorTools();
    });
  };

  function makeGrid(value) {
    const sketchboard_div = document.querySelector(".sketch");
    const numberOfElements = value ** 2;
    const gridSize = `repeat(${value}, auto)`;

    const makeGridElements = () => {
      for (let i = 0; i < numberOfElements; i++) {
        const element_div = document.createElement("div");
        element_div.className = "grid-element";
        element_div.style.transition = "all 0.1s ease-out";
        sketchboard_div.append(element_div);
      }
    };

    const makeGridTemplate = () => {
      sketchboard_div.style.gridTemplateColumns = gridSize;
      sketchboard_div.style.gridTemplateRows = gridSize;
    };

    makeGridElements();
    makeGridTemplate();
  }

  function removePreviousGridElements() {
    const sketchboard_div = document.querySelector(".sketch");
    sketchboard_div.innerHTML = "";
  }

  function activateColorTools() {
    const elements = document.querySelectorAll(".grid-element");
    const DEFAULT_BGCOLOR = "#f1f7ed";

    const activatePickColor = () => {
      const colorPickerTool_button =
        document.querySelector(".tool-colorpicker");
      const colorSelected = colorPickerTool_button.value;
      return colorSelected;
    };

    const activateStrokeColor = () => {
      const strokeTool_button = document.querySelector(".tool-stroke");
      strokeTool_button.addEventListener("click", actionStroke);

      function actionStroke() {
        let isStroke = false;

        elements.forEach((element) => {
          element.addEventListener("mousedown", start);
          element.addEventListener("mousemove", action);
          element.addEventListener("mouseup", end);
          element.addEventListener("mousestop", end);
        });

        function start(event) {
          isStroke = true;
          event.preventDefault();
        }

        function action(event) {
          if (isStroke) this.style.backgroundColor = activatePickColor();
          event.preventDefault();
        }

        function end(event) {
          isStroke = false;
          event.preventDefault();
        }
      }
    };

    const activateEraseColor = () => {
      const eraserTool_button = document.querySelector(".tool-eraser");
      eraserTool_button.addEventListener("click", actionErase);

      function actionErase() {
        let isErase = false;

        elements.forEach((element) => {
          element.addEventListener("mousedown", start);
          element.addEventListener("mousemove", action);
          element.addEventListener("mouseup", end);
          element.addEventListener("mousestop", end);
        });

        function start(event) {
          isErase = true;
          event.preventDefault();
        }

        function action(event) {
          if (isErase) this.style.backgroundColor = DEFAULT_BGCOLOR;
          event.preventDefault();
        }

        function end(event) {
          isErase = false;
          event.preventDefault();
        }
      }
    };

    const activateRemoveColor = () => {
      const resetTool_button = document.querySelector(".tool-reset");
      resetTool_button.addEventListener("click", actionRemove);

      function actionRemove() {
        elements.forEach(
          (element) => (element.style.backgroundColor = DEFAULT_BGCOLOR)
        );
      }
    };

    activateStrokeColor();
    activateEraseColor();
    activateRemoveColor();
  }

  const activateOpenCloseAdjustGridSlider = () => {
    const adjustGridTool_button = document.querySelector(".tool-grid");
    const sliderContainer_div = document.querySelector(".slider-container");

    const activateOpenSlider = () => {
      adjustGridTool_button.addEventListener("click", () => {
        sliderContainer_div.classList.remove("hidden");
      });
    };

    const activateCloseSlider = () => {
      sliderContainer_div.addEventListener("mouseleave", () => {
        sliderContainer_div.classList.add("hidden");
      });
    };

    activateOpenSlider();
    activateCloseSlider();
  };

  const showSliderValue = () => {
    const value_p = document.querySelector(".range-number");
    const START_VALUE = 16;

    value_p.innerText = START_VALUE;

    slider_input.addEventListener("input", () => {
      const currentValue = slider_input.value;
      value_p.innerText = currentValue;
    });
  };

  makeDefaultSketchGrid();
  updateSketchGrid();
  activateOpenCloseAdjustGridSlider();
  showSliderValue();
};

activateSceneAnimations();
executeEtchASketch();
