document.addEventListener("DOMContentLoaded", () => {
    const passwordFields = document.getElementsByClassName("password-input")
    for (const field of passwordFields) {
        const currentIndex = parseInt(field.getAttribute("data-index"));
        field.addEventListener("input", (evt) => {
            const value = evt.target.value;
            if (value.length == 0) {
                return;
            }

            evt.target.value = value[0].toUpperCase();
            evt.preventDefault();

            const nextField = document.querySelector(`[data-index="${currentIndex + 1}"]`)
            if (nextField) {
                setTimeout(() => {
                    nextField.focus();
                }, 0)
            }
            checkPassword();
        })
        field.addEventListener("beforeinput", throttle((evt) => {
            if (evt.inputType !== 'deleteContentBackward') {
                return;
            }
            const value = evt.target.value;

            if (currentIndex === 7 && value.length > 0) {
                return;
            }

            const nextField = document.querySelector(`[data-index="${currentIndex - 1}"]`)
            if (nextField) {
                setTimeout(() => {
                    nextField.value=""
                    nextField.focus();
                }, 0)
            }
        }, 50));
    }

    function checkPassword() {
        const password = "RADIANCE";
        for (let i = 0; i < 8; i++) {
            const char = document.querySelector(`[data-index="${i}"]`).value
            if (char != password.at(i)) {
                return;
            }
        }

        gtag('event', 'unlock_meetup', {});

        document.querySelector(".unlock-text").classList.add("unhide")
        setTimeout(() => {
            document.querySelector(".details").classList.add("unhide")
        }, 400)
    }

    document.querySelector(`[data-index="0"]`).focus()
});

function throttle(func, delay) {
  let isThrottled = false;

  return function (...args) {
    if (!isThrottled) {
      // Execute the main function immediately
      func.apply(this, args); 
      isThrottled = true;

      // Block execution until the delay has passed
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}