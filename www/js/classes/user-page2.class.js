class Userpage2 extends REST {
  constructor() {
  	super();
    this.getUser();
  }

  async getUser(){
    this.user = await User.find();
    this.render('main', 1)
  }

  // loopUserToValues(userObject){
  //   for (let value in userObject) {
  //     this[value] = userObject[value];
  //   }
  //   this.render('main', 1)
  //   this.revealPassword();
  // }

  revealPassword(){
    let that = this;
    $(document).on('click', '.btn-revealpassword', function(){
     if($('#password-area').text() == '******'){
      $('#password-area').empty();
      $('#password-area').text(that.password);
      $('.hide-show').text('Dölj');
      }
      else{
        $('#password-area').text('******');
        $('.hide-show').text('Visa');
      }
    })

  }

}
