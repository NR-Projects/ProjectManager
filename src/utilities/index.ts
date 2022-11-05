function toggleModal(action: string, modal: HTMLElement) {
    switch(action) {
        case 'open':
            modal.classList.add('open-modal');
            modal.classList.remove('close-modal');
            break;
        case 'close':
            modal.classList.add('close-modal');
            modal.classList.remove('open-modal');
            break;
    }
}

export { toggleModal };