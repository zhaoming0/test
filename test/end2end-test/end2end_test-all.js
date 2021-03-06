describe('End2End Test/ONNX Models', function() {
  const assert = chai.assert;
  const modelNameArr = ['squeezenet1.1', 'mobilenetv2-1.0', 'resnet50v1', 'resnet50v2', 'inception_v2'];

  for (index in modelNameArr) {
    let modelName = modelNameArr[index];
    for (let j=0; j<3; j++) {
      it(`check result for ${modelName} onnx model/${j+1}`, async function() {
        let inputData = await loadTensor(`./end2end-test/resources/${modelName}/test_data_set_${j}/input_0.pb`);
        let expectData = await loadTensor(`./end2end-test/resources/${modelName}/test_data_set_${j}/output_0.pb`);
        let outputData = new Float32Array(expectData.length);
        let modelFile = `./end2end-test/resources/${modelName}/${modelName}.onnx`;
        let rawModel = await loadOnnxModel(modelFile);
        let kwargs = {
          rawModel: rawModel,
          backend: options.backend,
          prefer: options.prefer,
          softmax: false,
        };
        let model = new OnnxModelImporter(kwargs);
        await model.createCompiledModel();
        await model.compute(inputData, outputData);
        for (let i = 0; i < expectData.length; ++i) {
          assert.isTrue(almostEqualCTS(outputData[i], expectData[i]));
        }
      }).timeout(120000);
    }
  }
});
