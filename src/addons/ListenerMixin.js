import * as _ from 'reflux-core/lib/utils';
import ListenerMethods from 'reflux-core/lib/ListenerMethods';

export default {
  destroyed: ListenerMethods.stopListeningToAll,
  methods: ListenerMethods
};