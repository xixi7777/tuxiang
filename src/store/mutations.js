import types from './mutationTypes'

export default {
    [types.SET_CURRENT_TAB](state, current) {
        state.currentTab = current
    }
}