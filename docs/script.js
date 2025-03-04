// Combo Box
document.querySelectorAll('.combo-box').forEach(combobox => {
    const input = combobox.querySelector('input');
    const listbox = combobox.querySelector('ul');
    const options = Array.from(listbox.querySelectorAll('li'));
    let currentIndex = findIndex();
    let lastHovered = null;

    function findIndex() {
        return options.findIndex(option => option.getAttribute('aria-selected') === "true");
    }

    function scroll(block) {
        const index = currentIndex === -1 ? 0 : currentIndex;
        options[index].scrollIntoView({ block, behavior: "instant"});
    }

    function updateSelected(value = null) {
        if (value !== null) input.value = value;
        options.forEach(option => {
            option.setAttribute('aria-selected', option.textContent.trim() === input.value.trim() ? 'true' : 'false');
        });
        currentIndex = findIndex();
        if (currentIndex !== -1) scroll('nearest');
    }
    
    function removeHovered() {
        lastHovered?.classList.remove('last-hovered');
        lastHovered = null;
    }

    function keyNavigate() {
        combobox.classList.add('key-nav');
        if (lastHovered) currentIndex = options.indexOf(lastHovered);
        removeHovered();
    }

    function toggleDropdown() {
        const isOpen = input.getAttribute('aria-expanded') === "true";
        input.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        input.focus();
        !isOpen ? (currentIndex = findIndex(), scroll('nearest')) : removeHovered();
    }

    function navigationHandler(event) {
        if (event.altKey && (event.key === "ArrowDown" || event.key === "ArrowUp") && input.hasAttribute('aria-haspopup')) {
            event.preventDefault();
            toggleDropdown();
        } else if ((event.key === "ArrowDown" && currentIndex < options.length - 1) || (event.key === "ArrowUp" && currentIndex > 0)) {
            event.preventDefault();
            keyNavigate();
            currentIndex += event.key === "ArrowDown" ? 1 : -1;
            updateSelected(options[currentIndex].textContent);
        } else if (event.key === "Enter" && input.hasAttribute('aria-haspopup') && input.getAttribute('aria-expanded') === "true") {
            event.preventDefault();
            updateSelected(lastHovered ? lastHovered.textContent : null);
            toggleDropdown();
        }
    }

    listbox.addEventListener('click', (event) => {
        if (event.target.tagName === "LI") {
            updateSelected(event.target.textContent);
            if (input.hasAttribute('aria-haspopup')) toggleDropdown();
        }
    });

    listbox.addEventListener('mousedown', (event) => {
        event.preventDefault();
        input.focus();
    });

    listbox.addEventListener('mousemove', () => combobox.classList.remove('key-nav'));

    if (input.hasAttribute('aria-haspopup')) {
        const button = combobox.querySelector('button');

        listbox.addEventListener('mouseover', (event) => {
            if (!combobox.classList.contains('key-nav') && event.target.tagName === "LI") {
                removeHovered();
                lastHovered = event.target;
                lastHovered.classList.add('last-hovered');
            }
        });

        button.addEventListener('click', () => toggleDropdown());
        input.addEventListener('blur', () => {
            if (input.getAttribute('aria-expanded') === "true") {
                setTimeout(() => {
                    if (document.activeElement !== input && document.activeElement !== button) toggleDropdown();
                }, 0);
            }
        });
    }

    input.addEventListener('input', () => updateSelected(input.value));
    input.addEventListener('keydown', navigationHandler);
});