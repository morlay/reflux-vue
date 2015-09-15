import ListenerMethods from 'reflux-core/lib/ListenerMethods';
import ListenerMixin from './ListenerMixin';
import * as _ from 'reflux-core/lib/utils';

export default function (listenable, key, filterFunc) {

  filterFunc = _.isFunction(key) ? key : filterFunc;

  return {

    data(){
      if (!_.isFunction(listenable.getInitialState)) {
        return {};
      } else if (_.isFunction(key)) {
        return filterFunc.call(this, listenable.getInitialState());
      } else {
        // Filter initial payload from store.
        var result = filterFunc.call(this, listenable.getInitialState());
        if (typeof(result) !== "undefined") {
          return _.object([key], [result]);
        } else {
          return {};
        }
      }
    },

    methods: _.extend({
      setState(nextState) {
        if (typeof nextState === 'object') {
          let stateKey;
          for (stateKey in nextState) {
            this[stateKey] = nextState[stateKey];
          }
        }
      }
    }, ListenerMethods),

    compiled: function () {

      const cb = (value)=> {
        if (_.isFunction(key)) {
          this.setState(filterFunc.call(this, value));
        } else {
          this[key] = filterFunc.call(this, value);
        }
      };

      this.listenTo(listenable, cb);
    },

    destroyed: ListenerMixin.destroyed
  };
};