import ListenerMethods from 'reflux-core/lib/ListenerMethods';
import ListenerMixin from './ListenerMixin'
import * as _ from'reflux-core/lib/utils'

export default function (listenable, key) {

  return {

    data(){
      if (!_.isFunction(listenable.getInitialState)) {
        return {};
      } else if (key === undefined) {
        return listenable.getInitialState();
      } else {
        return _.object([key], [listenable.getInitialState()]);
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

    compiled() {

      const cb = (key === undefined ? this.setState : (value)=> {
        this[key] = value;
      });

      this.listenTo(listenable, cb);
    },

    destroyed: ListenerMixin.destroyed

  };
};