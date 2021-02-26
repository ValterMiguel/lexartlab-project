<template>
  <div id="site">
    <div class="container">
      <div class="site-header">
        <div class="site-web-category">
          <div class="web">
            <div class="dropdown">
              <button @click="OpenWeb()" class="dropbtn-web">
                Web<i class="arrow arrow-bottom"> </i>
              </button>
              <div
                v-if="isOpenweb"
                id="myDropdown"
                class="dropdown-content-web"
              >
                <a href="#home">Home</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          <div class="categories">
            <div class="dropdown">
              <button class="dropbtn-category" @click="OpenCategory()">
                Categorias <i class="arrow arrow-bottom"></i>
              </button>
              <div
                id="myDropdown"
                v-if="isOpenCategory"
                class="dropdown-content-category"
             
              >
               <div v-for="( category, index ) in categories" :key="index">
                <a href="#home" @click="selectCategory(category.id)"> {{category.name}}</a>
               </div>
              </div>
            </div>
          </div>
        </div>
        <div class="site-search">
          <input
          v-model="search"
            type="text"
            class="search-input"
            placeholder="Procurar..."
            name="search"
          />
          <button class="search-btn">Search</button>
        </div>
      </div>
      <!--Product-->
      <div class="product">
        <div class="product-item" v-for="(item, index) in items" :key="index">
          <div class="product-item-content">
            <div class="product-image">
              <img :src="item.thumbnail" alt="" />
            </div>
            <div class="product-text">
              <p class="product-title"><strong>{{ item.title }}</strong></p>
              <p class="product-price">$ {{ item.price }}</p>
            </div>
            <div class="product-button">
              
              <a class="product-btn" :href="item.permalink" >Ir a web</a>
            </div>
          </div>
        </div>
      </div>
      <!---->
    </div>
  </div>
</template>

<script>
import {HTTP} from './api-http'
export default {
  name: "App",
  data() {
    return {
      selectedCategoryId: '',
      search:'',
      isOpenweb: false,
      isOpenCategory: false,
      webType: [],
      categories: [],
      items: [],
    };
  },
  mounted () { 
    this.getCategories()
  },
  computed: { 
    selectedValue () {
      return this.selectedCategoryId;
    }
  },
  watch: {
    search (val) {
      this.getItems(val)
    }
  },
  methods: {
    OpenWeb() {
      this.isOpenweb = !this.isOpenweb;
    },
    OpenCategory() {
      this.isOpenCategory = !this.isOpenCategory;
    },
    selectCategory(id) {
      this.selectedCategoryId = id;
      this.getItems()
    },
    getCategories() {
      HTTP.get('/sites/MLB/categories')
        .then(response => {
          response.data;
          this.categories = response.data.filter(function(category) {
            if(category.id =='MLB1051' ||category.id =='MLB5726' || category.id =='MLB1000'){
              return true;
            }
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getItems(q='') {
      var query = '';
      query += this.selectedValue ? `category=${this.selectedValue}` : '';
      query += q ? `&q=${q}` : '';
      HTTP.get(`/sites/MLB/search?${query}`)
        .then(response => {
          this.items = response.data.results

          console.log(this.items)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>

<style>
</style>
