import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      addresses: [],
    };
  },
  mutations: {
    addAddress(state, address) {
        console.log('Saving address', address)
        state.addresses.push(address);
    }
  },
  actions: {
    addAddress(context, address) {
      context.commit('addAddress', address);
    }
  },
  getters: {
    addresses(state) {
      return state.addresses;
    },
    address(state) {
      return (givenAddress) => {
        return state.addresses.find((address) => address === givenAddress);
      };
    },
  },
});

export default store;