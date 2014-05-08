// create backbone model
var Person = Backbone.Model.extend();

var person = new Person({
    name: 'Dan'
});

// create backbone view
var PageView = Backbone.View.extend({
    template: Handlebars.compile($('#person-template').html()),
    
    render: function() {
        this.$el.html(this.template(this.model.attributes));
        
        return this;
    }
});
 
// create an instance of the PageView
var pageView = new PageView({
    el: '#container',
    model: person
});

// render the view
pageView.render();