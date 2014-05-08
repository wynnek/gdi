// create backbone model
var Person = Backbone.Model.extend();

// create backbone collection
var People = Backbone.Collection.extend({
    model: Person
});

// create an instance of the People collection
var people = new People();

// add models to the People collection
people.add([
  {name: 'Dan'},
  {name: 'Ella'},
  {name: 'Ava'}
]);

// create backbone view
var PageView = Backbone.View.extend({
    tagName: 'ul',
    
    render: function() {
        for (var i = 0; i < this.collection.models.length; i++) {
            var template = Handlebars.compile($('#people-template').html());
            
            this.$el.append(template(this.collection.models[i].attributes));
        }
        
        return this;
    }
});

// create an instance of the PageView
var pageView = new PageView({
    collection: people
});

// render the view
$('#container').html(pageView.render().el);