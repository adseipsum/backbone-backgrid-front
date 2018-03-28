/*jshint esversion: 6 */

App.Models.Blog = Backbone.Model.extend({

    lockBlog: function(locked){

        $.post({
            async: false,
            method: 'GET',
            url: App.baseUrl + '/frontapi/blog/lock',
            data: {
                'blogId' : this.get('id'),
                'locked':  locked
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer ".concat(App.token));
            },
            success: function(response){

            }
        });
    }
});
