import { ModalStoreParams } from '@/models';
import { useStore } from 'vuex';

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

function openModal(modalStoreParams: ModalStoreParams) {
    useStore().dispatch("setProjectLoaded", modalStoreParams);
}

export { toggleModal, openModal };