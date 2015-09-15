import ListenerMethods from 'reflux-core/lib/ListenerMethods'

export default function (listenable, callback, initial) {
  return {
    compiled: function () {
      for (var m in ListenerMethods) {
        if (this[m] !== ListenerMethods[m]) {
          if (this[m]) {
            throw `Can't have other property '${m}' when using Reflux.listenTo!`;
          }
          this[m] = ListenerMethods[m];
        }
      }
      this.listenTo(listenable, callback, initial);
    },
    destroyed: ListenerMethods.stopListeningToAll
  };
};