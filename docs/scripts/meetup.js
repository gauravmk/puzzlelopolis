document.addEventListener("DOMContentLoaded", () => {
    const passwordFields = document.getElementsByClassName("password-input")
    for (const field of passwordFields) {
        field.addEventListener("keydown", (evt) => {
            const code = evt.code;
            const key = evt.key;

            const currentIndex = parseInt(field.getAttribute("data-index"));
            if (evt.metaKey) {
                return;
            } else if (code.startsWith("Key")) {
                // Takeover
                evt.target.value = key.toUpperCase();
                evt.preventDefault();

                const nextField = document.querySelector(`[data-index="${currentIndex + 1}"]`)
                if (nextField) {
                    setTimeout(() => {
                        nextField.focus();
                    }, 0)
                }
                checkPassword();
            } else if (code === 'Backspace') {
                const nextField = document.querySelector(`[data-index="${currentIndex - 1}"]`)
                if (nextField) {
                    setTimeout(() => {
                        nextField.value=""
                        nextField.focus();
                    }, 0)
                }
            } else {
                evt.preventDefault()
            }
        })
    }

    function checkPassword() {
        const password = "RADIANCE";
        for (let i = 0; i < 8; i++) {
            const char = document.querySelector(`[data-index="${i}"]`).value
            if (char != password.at(i)) {
                console.log(`mismatched. Index ${i}: ${char} vs ${password.at(i)}`)
                return;
            }
        }

        document.querySelector(".unlock-text").classList.replace("hidden", "fade-in")
        setTimeout(() => {
            document.querySelector(".details").classList.replace("hidden", "fade-in")
        }, 400)
    }

    document.querySelector(`[data-index="0"]`).focus()
});