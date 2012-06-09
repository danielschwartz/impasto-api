window.addEvent('domready', function(){
    var loginPage = $('login');

    if(loginPage){
        var authForm = loginPage.getElement('form');

        authForm.addEvent('submit', function(e){
            e.stop();
            var data = authForm.toQueryString().parseQueryString(),
                req = new Request.JSON({
                    url: '/auth/login',
                    data: data,
                    onSuccess: function(json){
                        if(json.success){
                            window.location = '/admin/pieces';
                        } else {
                            window.location.reload();
                        }
                    }
                }).post();
        })
    }
});