// List Boxes & Combo Boxes
document.querySelectorAll('ul[role=listbox]').forEach(listbox => {
    const input = document.getElementById(listbox.id.replace('-listbox', '-input'));
    const expands = input?.hasAttribute('aria-haspopup');
    const multiselect = listbox.hasAttribute('aria-multiselectable');
    const options = Array.from(listbox.querySelectorAll('li[role="option"], li[role="group"] span'));
    let currentIndex = findIndex(), current = null;

    function findIndex() {
        let index = options.findIndex(option => option.getAttribute('aria-current') === "true");
        if (index === -1 && !multiselect) {
            index = options.findIndex(option => option.getAttribute('aria-selected') === "true");
        } return index;
    }

    function scroll() {
        const index = currentIndex === -1 ? 0 : currentIndex;
        options[index].scrollIntoView({ block: "nearest", behavior: "instant" });
    }

    function removeCurrent() {
        current?.setAttribute('aria-current', 'false'), current = null;
    }

    function updateCurrent(value = null) {
        if (input) { // Input-based listbox: update input value and aria-selected
            if (value !== null) input.value = value;
            options.forEach(option => option.setAttribute(
                'aria-selected', option.textContent.trim() === input.value.trim() ? 'true' : 'false'
            ));
        } else { // Non-input-based listbox: use current for aria-current
            current = options[currentIndex];
            !multiselect ? 
                options.forEach(option => option.setAttribute('aria-selected', option === current ? 'true' : 'false')) :
                (options.forEach(option => option.setAttribute('aria-current', 'false')), current.setAttribute('aria-current', 'true'));
        } (currentIndex = findIndex()) !== -1 && scroll();
    }

    function toggleDropdown() {
        const isOpen = input.getAttribute('aria-expanded') === "true";
        input.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
        input.focus();
        !isOpen ? (currentIndex = findIndex(), scroll()) : removeCurrent();
    }

    function toggleCheck() {
        const checkbox = current?.querySelector('input[type="checkbox"]');
        checkbox && (checkbox.checked = !checkbox.checked, current.setAttribute('aria-selected', checkbox.checked ? 'true' : 'false'));
    }

    function navigationHandler(event) {
        expands && (listbox.parentElement.classList.add('key-nav'), current && (currentIndex = options.indexOf(current), removeCurrent()));

        if (event.altKey && (event.key === "ArrowDown" || event.key === "ArrowUp") && expands) {
            event.preventDefault();
            toggleDropdown();
        } else if ((event.key === "ArrowDown" && currentIndex < options.length - 1) || (event.key === "ArrowUp" && currentIndex > 0)) {
            event.preventDefault();
            currentIndex += event.key === "ArrowDown" ? 1 : -1;
            updateCurrent(options[currentIndex].textContent);
        } else if (event.key === "Enter" && current?.role !== "group") {
            event.preventDefault();
            multiselect ? toggleCheck() : input && input.getAttribute('aria-expanded') === "true" &&
                (current = options[currentIndex], updateCurrent(current?.textContent), listbox.parentElement.classList.remove('key-nav'), toggleDropdown());
        } else if ((event.key === "Home" || event.key === "End") && !listbox.parentElement.classList.contains('combo-box')) {
            event.preventDefault();
            currentIndex = event.key === "Home" ? 0 : options.length - 1;
            updateCurrent(options[currentIndex].textContent);
        }
    }

    listbox.addEventListener('click', (event) => {
        if (!input) listbox.focus();

        let target = event.target.tagName === "INPUT" || event.target.tagName === "LABEL"
            ? event.target.closest('li[role="option"]') : event.target;

        if (target.tagName === "LI" && target.getAttribute('role') === "option" || target.tagName === "SPAN") {
            currentIndex = Array.from(options).indexOf(target);
            current = options[currentIndex];
            updateCurrent(current.textContent);
            expands ? toggleDropdown() : (multiselect && toggleCheck());
        }
    });

    if (!input) {
        listbox.addEventListener('keydown', navigationHandler);
        listbox.addEventListener('mousedown', removeCurrent);
        listbox.addEventListener('focus', () => currentIndex === -1 && (currentIndex = 0, updateCurrent()));
    } else {
        input.addEventListener('input', () => updateCurrent(input.value));
        input.addEventListener('keydown', navigationHandler);
        listbox.addEventListener('mousedown', (e) => (e.preventDefault(), input.focus()));

        if (expands) {
            const button = listbox.parentElement.querySelector('button');

            function mouseHandler(event) {
                if (event.target.tagName !== "LI") return;
                listbox.parentElement.classList.contains('key-nav')
                    ? listbox.parentElement.classList.remove('key-nav')
                    : removeCurrent();
                current = event.target;
                current.setAttribute('aria-current', 'true');
            }

            listbox.addEventListener('mousemove', mouseHandler);
            listbox.addEventListener('mouseover', mouseHandler);

            button.addEventListener('click', toggleDropdown);
            input.addEventListener('blur', () => {
                if (input.getAttribute('aria-expanded') === "true") {
                    setTimeout(() => {
                        if (![input, button].includes(document.activeElement)) toggleDropdown();
                    }, 0);
                }
            });
        }
    }
});