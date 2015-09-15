import Reflux from 'reflux-core'

Reflux.connect = require('./addons/connect');
Reflux.connectFilter = require('./addons/connectFilter');
Reflux.ListenerMixin = require('./addons/ListenerMixin');
Reflux.listenTo = require('./addons/listenTo');
Reflux.listenToMany = require('./addons/listenToMany');

export default Reflux