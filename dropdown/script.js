document.querySelectorAll(".dropwdown-toggle").forEach(button => {
    button.addEventListener('click', () => {
        button.parentElement.classList.toggle('show');
    });
});