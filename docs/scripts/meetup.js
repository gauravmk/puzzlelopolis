document.addEventListener("DOMContentLoaded", () => {
    const passwordFields = document.getElementsByClassName("password-input")
    for (const field of passwordFields) {
        const currentIndex = parseInt(field.getAttribute("data-index"));
        field.addEventListener("input", (evt) => {
            const value = evt.target.value;

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
        field.addEventListener("beforeinput", (evt) => {
            if (evt.inputType !== 'deleteContentBackward') {
                return;
            }

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
        })
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
