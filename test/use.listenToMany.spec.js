import { expect } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';
import Vue from 'vue';

import { Actions, Store } from './helpers/reflux-helpers'

describe(__filename, function () {

  it('listenToMany should work', function (done) {

    document.body.innerHTML = '';
    Actions.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',


      mixins: [
        Reflux.listenToMany({
          'storeUpdate': Store
        })
      ],

      data: {
        count: Store.count
      },

      methods: {
        onStoreUpdate(count){
          this.count = count;
        }
      }

    });

    Actions.increase(10);

    setTimeout(()=> {

      expect(vm.count).be.eql(10);
      expect(document.body.innerHTML).be.eql('<span>10</span>');

      vm.$destroy();

      done();

    }, 200);

  });

});