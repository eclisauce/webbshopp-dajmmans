class PopStateHandler {

  // Note: Only instantiate PopStateHandler once!

  constructor(app){

    this.app = app;
    // Add event handlers for a.pop-links once
    this.addEventHandler();
    // Call changePage on initial page load
    this.changePage();
    // Call changePage on pop events
    // (the user clicks the forward or backward button)
    // from an arrow function to keep "this"
    // inside changePage pointing to the PopStateHandler object
    window.addEventListener('popstate', () => this.changePage());

  }

  addEventHandler(){

    // make "that" the PopStateHandler object
    // (since this will be the a tag inside the click function)
    let that = this;

    $(document).on('click','a.pop',function(e){

      // Create a push state event
      let href = $(this).attr('href');
      history.pushState(null, null, href);

      // Call the changePage function
      that.changePage();

      // Stop the browser from starting a page reload
      e.preventDefault();

    });
  }

  changePage(){
    // React on page changed
    // (replace part of the DOM etc.)

    // Get the current url
    let url = location.pathname;

    // Change which menu link that is active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active');

    // A small "dictionary" of what method to call
    // on which url
    let urls = {
      '/': 'startpage',
      '/materiel': 'materiel',
      '/ingredienser': 'ingredienser',
      '/bocker': 'bocker',
      '/search': 'search',
      '/om_oss': 'about',
      '/kassa' : 'cart'
    };

    // Call the right method
    let methodName = urls[url];
    this[methodName]();

    // Set the right menu item active
    this.app.header.setActive(url);

  }

  //Methods for rendering in our templates in the SPA

  startpage(){
    this.empty();
    this.app.banner = new Banner();
    this.app.banner.render('.banner-row');


    this.app.startPage.render('main');
  }

  materiel(){
    this.empty();
    this.app.productcategory = new ProductCategory(this);
    this.app.productcategory.render('main', '3');
  }

  ingredienser(){
    this.empty();
    this.app.productcategory = new ProductCategory(this);
    this.app.productcategory.render('main', '3');
  }

  bocker(){
    this.empty();
    this.app.productcategory = new ProductCategory(this);
    this.app.productcategory.render('main', '3');

  }

  about(){
    this.empty();
  }

  search() {
    this.empty();
    this.search = new Search(Search.searchQuery);
  }

  cart(){
    this.empty();
    this.cart = new Cart();
    this.cart.render();
  }

  empty() {
    $('.banner-row').empty();
    $('main').empty();
  }

}
