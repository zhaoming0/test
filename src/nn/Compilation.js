import {PreferenceCode,ResultCode} from './Enums'
import Device from './wasm/Device'
import * as utils from './utils'
import Execution from './Execution'
import webgl2Model from './webgl2/Model'

export default class Compilation {
  /**
   * Create a Compilation to compile the given model.
   * 
   * @param {Model} model - The model to be compiled.
   */
  constructor(model) {
    this._model = model;
    this._finished = false;
    this._preference = PreferenceCode.fast_single_answer;
    this._device = new Device;
    this._preparedModel = null;
    this._useWebGL2 = model._useWebGL2;
  }


  /**
   * Create a executino from compilation.
   * 
   * @returns {Execution} - the execution object.
   */
  async createExecution() {
    if (!this._finished) {
      throw new Error('Compilation is not finished');
    }
    return new Execution(this);
  }

  /**
   * Sets the execution preference.
   * 
   * @param {number} preference - The execution preference, e.g. PreferenceCode.LOW_POWER.
   */
  setPreference(preference) {
    if (this._finished) {
      throw new Error('setPreference cant modify after compilation finished');
    }
    if (!utils.validateEnum(preference, PreferenceCode)) {
      throw new Error(`Invalid preference value ${preference}`);
    }
    this._preference = preference;
    return ResultCode.NO_ERROR;
  }

  /**
   * Indicate that we have finished modifying a compilation.
   */
  async finish() {
    if (this._useWebGL2) {
      this._preparedModel = new webgl2Model(this._model);
      await this._preparedModel.prepareModel();
    } else {
      this._preparedModel = await this._device.prepareModel(this._model);
    }
    this._finished = true;
    return ResultCode.NO_ERROR;
  }
}