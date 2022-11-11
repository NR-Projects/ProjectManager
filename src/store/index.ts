import { createStore } from 'vuex';
import { ModalStoreParams, Project } from '@/models';

export default createStore({
	state: {
		projectLoaded: Project.createEmptyObject(),
		modalStoreParams: {}
	},
	getters: {
		getprojectLoaded(state) {
			return state.projectLoaded;
		},
		getModalStoreParams(state) {
			return state.modalStoreParams;
		}
	},
	mutations: {
		SET_PROJECT_LOADED(state, newProject: Project) {
			state.projectLoaded = newProject;
		},
		SET_MODAL_STORE_PARAMS(state, newModalStoreParams: ModalStoreParams) {
			state.modalStoreParams = newModalStoreParams;
		}
	},
	actions: {
		setProjectLoaded({ commit }, newProject: Project) {
			commit('SET_PROJECT_LOADED', newProject);
		},
		setModalStoreParams({ commit }, newModalStoreParams: ModalStoreParams) {
			commit('SET_MODAL_STORE_PARAMS', newModalStoreParams);
		}
	},
	modules: {
	}
})
