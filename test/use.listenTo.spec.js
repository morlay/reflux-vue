import { expect } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';
import Vue from 'vue';

import { Actions, Store } from './helpers/reflux-helpers'

describe(__filename, function () {

  it('listenTo should work', function (done) {

    document.body.innerHTML = '';
    Actions.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.listenTo(Store, '_onStoreUpdate')
      ],

      data: {
        count: Store.count
      },

      methods: {
        _onStoreUpdate(count){
          this.count = count;
        }
      }

    });

    Actions.increase(7);

    setTimeout(()=> {

      expect(vm.count).be.eql(7);
      expect(document.body.innerHTML).be.eql('<span>7</span>');

      vm.$destroy();

      done();

    }, 200);

  });

});