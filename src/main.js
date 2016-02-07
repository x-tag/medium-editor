(function(){

  var splitSpaces = /\S+/g;
  var camelArgs = [/-([a-z])/g, function(match, letter){ return letter.toUpperCase() }];
  var defaultButtons = ['bold', 'italic', 'underline', 'anchor', 'h3', 'unorderedlist', 'orderedlist'];

  xtag.register('x-medium-editor', {
    lifecycle: {
      created: function() {
        this.setup();
      }
    },
    accessors: {
      spellcheck: {
        attribute: { boolean: true }
      },
      buttons: {
        attribute: {},
        set: function(val){
          this.xtag.buttons = val.trim().split(splitSpaces);
        }
      },
      options: {
        attribute: {},
        set: function(val){
          var options = this.xtag.options = {};
          val.replace(splitSpaces, function (match){
            options[match.replace.apply(match, camelArgs)] = true;
          });
        }
      }
    },
    methods: {
      setup: function(obj){
        this.xtag.editor = new MediumEditor(this, xtag.merge({
          spellcheck: this.spellcheck,
          toolbar:{
            buttons: this.xtag.buttons || defaultButtons
          }
        }, this.xtag.options || {}));
      }
    }
  });

})();
