import { expect } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';
import Vue from 'vue';

import { Actions, Store } from './helpers/reflux-helpers'
import { Actions as Actions2, Store as Store2 } from './helpers/reflux-helpers2'

describe(__filename, function () {

  it('connectFilter should work', function (done) {

    document.body.innerHTML = '';
    Actions.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.connectFilter(Store, 'count', function (count) {
          return count > 10 ? 'max' : count;
        })
      ]

    });

    Actions.increase(11);

    setTimeout(()=> {

      expect(vm.count).be.eql('max');
      expect(document.body.innerHTML).be.eql('<span>max</span>');

      vm.$destroy();

      done();

    }, 200);

  });

  it('connectFilter should work, without setting key', function (done) {

    document.body.innerHTML = '';
    Actions2.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.connectFilter(Store2, function (state) {
          return {
            count: state.count > 10 ? 'max' : state.count
          };
        })
      ]

    });

    Actions2.increase(2);

    setTimeout(()=> {

      expect(vm.count).be.eql(2);
      expect(document.body.innerHTML).be.eql('<span>2</span>');

      vm.$destroy();

      done();

    }, 200);

  });

});