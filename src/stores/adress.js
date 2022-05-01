import { defineStore } from 'pinia'

export const useAdressStore = defineStore({
  id: 'adress',
  state: () => ({
    list: [
    ],
    adressDetail: [
    ],
    loading: false,
  }),
  getters: {
    sortedAdresses: (state) => {
      return state.list.sort(function(first, second){
        if (first > second){
          return -1;
        }else if (first < second){
          return 1;
        }else{
          return 0;
        }
      })
    },
  },
  actions: {
    async fetchAdresssList(prefecture) {
      console.log(prefecture)
      this.loading = true
      const res = await fetch(`https://geolonia.github.io/japanese-addresses/api/ja.json`)
      const list = await res.json()
      this.loading = false
      console.log(list)
      this.list = list[prefecture]
      this.adressDetail = []
    },
    async fetchAdresssDetail(prefecture, town) {
      console.log(prefecture)
      console.log(town)
      this.loading = true
      const res = await fetch(`https://geolonia.github.io/japanese-addresses/api/ja/${encodeURIComponent(prefecture)}/${encodeURIComponent(town)}.json`)
      const list = await res.json()
      this.loading = false
      console.log(list)
      this.adressDetail = list
    },
  }
})
