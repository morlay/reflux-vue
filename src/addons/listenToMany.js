import ListenerMethods from 'reflux-core/lib/ListenerMethods'

export default function (listenables) {
  return {
    compiled: function () {
      for (var m in ListenerMethods) {
        if (this[m] !== ListenerMethods[m]) {
          if (this[m]) {
            throw `Can't have other property '${m}' when using Reflux.listenToMany!`;
          }
          this[m] = ListenerMethods[m];
        }
      }
      this.listenToMany(listenables);
    },
    destroyed: ListenerMethods.stopListeningToAll
  };
};