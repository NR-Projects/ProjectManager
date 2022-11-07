import { createStore } from 'vuex';
import { Project } from '@/models';

export default createStore({
	state: {
		projectLoaded: Project.createEmptyObject()
	},
	getters: {
		getprojectLoaded(state) {
			return state.projectLoaded;
		}
	},
	mutations: {
		SET_PROJECT_LOADED(state, newProject: Project) {
			state.projectLoaded = newProject;
		}
	},
	actions: {
		setProjectLoaded({ commit }, newProject: Project) {
			commit('SET_PROJECT_LOADED', newProject);
		}
	},
	modules: {
	}
})
