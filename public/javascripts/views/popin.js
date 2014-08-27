module.exports = Backbone.View.extend({
    el: $('#popin'),

    template: require('./popin.jade'),

    render: function () {
        var template = _.template(require('./popin.jade'));
        this.$el.html(tempate);
    }
});