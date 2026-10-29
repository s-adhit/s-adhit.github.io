/** Keep Stack's existing menu animation and add accessible menu state. */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-menu') as HTMLButtonElement | null;
    const menu = document.getElementById('main-menu');

    if (!toggle || !menu) return;

    const syncMenuState = () => {
        const isOpen = document.body.classList.contains('show-menu');
        toggle.setAttribute('aria-expanded', String(isOpen));
    };

    toggle.addEventListener('click', () => {
        // Stack's click listener runs first and changes the body class.
        queueMicrotask(syncMenuState);
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || !document.body.classList.contains('show-menu')) return;

        toggle.click();
        toggle.focus();
    });

    window.addEventListener('resize', syncMenuState);
    syncMenuState();
});
