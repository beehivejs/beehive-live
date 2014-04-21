(function() {

  function BeeHiveLive() {}

  BeeHiveLive.extend = function(target) {

    function on(event_id, callback) {
      this.__events = this.__events || {};

      var current_callbacks = this.__events[event_id];
      if (current_callbacks) {
        current_callbacks.push(callback);
      }
      else {
        this.__events[event_id] = [callback];
      }
    }

    function __trigger(event_id) {
      this.__events = this.__events || {};

      var callbacks = this.__events[event_id];
      for (var i in callbacks) {
        var callback = callbacks[i];
        callback.apply(this);
      }
    }

    target.prototype.on = on;
    target.prototype.__trigger = __trigger;
  }


  /* Export to CommonJS if applicable */
  if (typeof module == 'object' && typeof module.exports == 'object') {
    module.exports = BeeHiveLive;
  }

  /* Ensure window.BeeHive is defined and then set the BeeHive.Live object */
  else
  {
    window.BeeHive = window.BeeHive || {};
    BeeHive.Live = BeeHiveLive;
  }
})();
