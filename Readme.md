# Reflux Vue

A mixin helpers link the [Reflux](https://github.com/reflux/reflux-core) and the [Vue](https://github.com/yyx990803/vue)

[![Build Status](https://img.shields.io/travis/morlay/reflux-vue.svg?style=flat-square)](https://travis-ci.org/morlay/reflux-vue)
[![Coverage](https://img.shields.io/coveralls/morlay/reflux-vue.svg?style=flat-square)](https://coveralls.io/r/morlay/reflux-vue)


## Usages

most usages are same as [Reflux](https://github.com/reflux/refluxjs), only the mixins for Vue component have little differences.

``` js
import Reflux from 'reflux-vue'
```

### Convenience mixin for React

``` js
const vm = new Vue({

  mixins: [Reflux.ListenerMixin],
  
  compiled() {
    this.listenTo(TheStore, this.onStoreUpdate);
  },
    
  methods {
    onStoreUpdate(state){
      // update the data of TheStore to vm
      this.state = state;
    }
  }
});
```

### Using Reflux.listenTo

``` js
const vm = new Vue({
  mixins: [
    Reflux.listenTo(TheStore, 'onStoreUpdate')
  ],
  
  methods {
    onStoreUpdate(state){
      this.state = state;
      // or 
    }
  }
});
```

### Using Reflux.connect

For `connect` method, we prefer to set the `getInitialState` to initial the data structure which need to sync.

``` js
const TheStore = Reflux.createStore({
  getInitialState: function() {
    return { 
      state: 'open'
    }
  },
  
  onSomeActionCallback(){
    this.trigger({ 
      state: 'open' 
    })
  }
});

```


``` js
const vm = new Vue({
  mixins: [
    Reflux.connect(TheStore)
  ],
    
  methods:{
    getStateFromTheStore(){
      // this.state === 'open'
    }
  }
});
```


### Using Reflux.connectFilter


``` js
const vm = new Vue({
  mixins: [
    Reflux.connectFilter(TheStore, function(stateData) {
      return {
        state: stateData.state === 'open' ? 'open!!!' : ''
      }
    }))
  ],
    
  methods:{
    getStateFromTheStore(){
      // this.state === 'open!!!'
    }
  }
});
```