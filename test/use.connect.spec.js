import { expect } from 'chai';
import sinon from 'sinon';
import Reflux from '../src';
import Vue from 'vue';

import { Actions, Store } from './helpers/reflux-helpers'
import { Actions as Actions2, Store as Store2 } from './helpers/reflux-helpers2'

describe(__filename, function () {

  it('connect should work', function (done) {

    document.body.innerHTML = '';
    Actions.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.connect(Store, 'count')
      ]

    });

    Actions.increase(7);

    setTimeout(()=> {

      expect(vm.count).be.eql(7);
      expect(document.body.innerHTML).be.eql('<span>7</span>');

      vm.$destroy();

      done();

    }, 200);

  });

  it('connect should work, without setting key', function (done) {

    document.body.innerHTML = '';
    Actions2.reset();

    const vm = new Vue({

      el: 'body',
      replace: false,
      template: '<span>{{ count }}</span>',

      mixins: [
        Reflux.connect(Store2)
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