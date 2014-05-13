// create backbone collection
var Locations = Backbone.Collection.extend({
    url: 'http://166.78.112.120:3000/locations'
});

// page view
var PageView = Backbone.View.extend({
    tagName: 'section',
    
    template: Handlebars.compile($('#page-template').html()),
    
    render: function() {
        this.$el.html(this.template());
        
        // add child view
        var locationsView = new LocationsView({
            collection: new Locations()
        });
        
        this.$el.append(locationsView.render().el);
        
        return this;
    }
});

// locations view
var LocationsView = Backbone.View.extend({
    tagName: 'ul',
    
    // constructor that adds a reset event to collection and then does a fetch
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        
        this.collection.fetch({reset: true}); // reset true unless you want to merge items into collection
    },
    
    render: function() {
        var models = this.collection.models;
        
        // render each location model using a template
        for (var i = 0; i < models.length; i++) {
            var template = Handlebars.compile($('#location-template').html());
            
            this.$el.append(template(models[i].attributes));
        }
        
        return this;
    }
});

// create an instance of the PageView
var pageView = new PageView();

// render the page view
$('#container').html(pageView.render().el);