import { expect } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';
import Vue from 'vue';

import { Actions, Store } from './helpers/reflux-helpers'

describe(__filename, function () {

  it('ListenerMixin should work', function (done) {

    document.body.innerHTML = '';
    Actions.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.ListenerMixin
      ],

      compiled(){
        this.listenTo(Store, this._onStoreUpdate)
      },

      data: {
        count: Store.count
      },

      methods: {
        _onStoreUpdate(count){
          this.count = count;
        }
      }

    });

    Actions.increase(5);

    setTimeout(()=> {

      expect(vm.count).be.eql(5);
      expect(document.body.innerHTML).be.eql('<span>5</span>');

      vm.$destroy();

      done();

    }, 200);

  });

});