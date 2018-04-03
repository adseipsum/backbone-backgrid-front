App.Modals.BlankModal = Backbone.Modal.extend({
    template: '#blank-modal-template',
    cancelEl: '.bbm-button',

    populate: function(data){
        this.$el.find('.modal-body').text(data);
    }
});
