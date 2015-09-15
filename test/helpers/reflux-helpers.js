import { createAction, createStore } from '../../src';


export const Actions = {
  reset: createAction(),
  increase: createAction()
};

export const Store = createStore({

  init(){
    this.count = 0;
    this.listenTo(Actions.reset, this._onReset);
    this.listenTo(Actions.increase, this._onIncrease);
  },

  getInitialState(){
    return this.count;
  },

  _onReset(){
    this.count = 0;
    this.trigger(this.count)
  },


  _onIncrease(count){
    this.count = count;
    this.trigger(this.count)
  }

});