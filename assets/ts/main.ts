/*! Site-level Stack entry point.  It preserves Stack interactions while the
 * theme preference is owned by custom.ts rather than Stack's two-state toggle. */
import menu from './menu';
import createElement from './createElement';
import { setupScrollspy } from './scrollspy';
import { setupSmoothAnchors } from './smoothAnchors';

let Stack = {
    init: () => {
        menu();

        const articleContent = document.querySelector('.article-content') as HTMLElement;
        if (articleContent) {
            setupSmoothAnchors();
            setupScrollspy();
        }

        const highlights = document.querySelectorAll('.article-content div.highlight');
        const copyText = 'Copy';
        const copiedText = 'Copied!';

        highlights.forEach(highlight => {
            const copyButton = document.createElement('button');
            copyButton.innerHTML = copyText;
            copyButton.classList.add('copyCodeButton');
            highlight.appendChild(copyButton);

            const codeBlock = highlight.querySelector('code[data-lang]');
            if (!codeBlock) return;

            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.textContent || '')
                    .then(() => {
                        copyButton.textContent = copiedText;
                        setTimeout(() => { copyButton.textContent = copyText; }, 1000);
                    })
                    .catch(err => {
                        alert(err);
                        console.log('Something went wrong', err);
                    });
            });
        });
    },
};

window.addEventListener('load', () => {
    setTimeout(() => Stack.init(), 0);
});

declare global {
    interface Window {
        createElement: any;
        Stack: any;
    }
}

window.Stack = Stack;
window.createElement = createElement;
