/*
Subscribes for updates to the set of transition editors that should be
made available.

Renders and activates that set whenever it changes.
*/
define(['libs/backbone', 'tantaman/web/Utils'],
function(Backbone, Utils) {
	return Backbone.View.extend({
		initialize: function() {
			this.model.on('change:transitionEditors',
							this.render,
							this);
			this._currentEditors = [];
		},

		remove: function() {
			this.dispose();
		},

		dispose: function() {
			Backbone.View.prototype.remove.call(this);
			this.model.dispose();
			Utils.dispose(this._currentEditors);
		},

		render: function() {
			this.$el.html('');
			Utils.dispose(this._currentEditors);
			// the css should be applied to position
			// them correctly regardless of their order in the doc?

			this._currentEditors = [];
			this.model.transitionEditors.forEach(function(editor) {
				this._currentEditors.push(editor);
				editor.render();
				this.$el.append(editor.$el);
			}, this);

			return this;
		},

		constructor: function Overview() {
			Backbone.View.prototype.constructor.apply(this, arguments);
		}
	});
});