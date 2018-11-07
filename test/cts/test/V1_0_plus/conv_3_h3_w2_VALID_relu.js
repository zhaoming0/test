describe('CTS', function() {
  const assert = chai.assert;
  const nn = navigator.ml.getNeuralNetworkContext();

  it('check result for Conv 3 h3 w2 valid relu example-1', async function() {
    let model = await nn.createModel(options);
    let operandIndex = 0;

    let op2_value = [-0.869931, 0.644628, -0.918393, 0.153672, 0.868562, -0.358177, -0.134931, -0.247565, 0.22174, -0.259157, -0.284296, -0.538065, 0.765559, 0.41986, -0.556241, 0.658494, 0.214355, -0.850169, -0.252893, -0.478935, 0.530526, -0.0700663, -0.988729, -0.303061, 0.150845, 0.829915, 0.476349, 0.406537, -0.355343, 0.757145, -0.356362, 0.800482, -0.713861, 0.210483, -0.634303, 0.718236, -0.752038, 0.457547, -0.550769, -0.551178, 0.446766, -0.227462, 0.216348, -0.852806, -0.351486, 0.55906, -0.668493, -0.303493, -0.363763, -0.162837, 0.0701012, 0.756097, -0.142269, 0.329724, -0.656317, -0.998086, -0.652949, -0.40316, -0.893682, 0.432744, 0.612362, -0.869588, -0.71327, -0.398092, -0.0423559, 0.436576, -0.925272, 0.176549, 0.822904, 0.096833, -0.296802, -0.427195, 0.031654, -0.254479, 0.244905, 0.0948254, 0.643769, -0.90391, 0.352665, -0.901179, 0.266159, -0.968068, -0.615401, -0.388975, 0.939052, -0.116289, 0.107523, -0.0582711, 0.435172, 0.334675, 0.459711, 0.717436, 0.496627, -0.680175, -0.415066, 0.339848, 0.506004, -0.337808, -0.107218, -0.172496, 0.870638, 0.931872, -0.953884, 0.903042, 0.760078, 0.209727, -0.285384, -0.45514, 0.113194, 0.0756611, 0.0924435, -0.472863, 0.960609, -0.160385, -0.839445, 0.457097, 0.163348, 0.344867, -0.131619, 0.688715, -0.540827, 0.571259, -0.95587, 0.506164, -0.155839, 0.0789621, 0.756772, -0.662069, 0.242908, 0.460821, 0.177872, -0.289839, -0.640603, 0.702598, -0.506406, -0.568262, -0.0713716, 0.413792, 0.159673, -0.305208, 0.133816, -0.160254, 0.787323, -0.753244, 0.600721, 0.263186, -0.162387, 0.477962, -0.702951, -0.731036, -0.939481, -0.524519, 0.934072, -0.511637, -0.503499, 0.106236, -0.323684, 0.534444, -0.843745, 0.364171, 0.0370358, -0.168801, -0.404559, -0.814178, 0.91745, -0.334276, 0.66925, -0.801201, 0.156511, -0.427949, 0.379153, 0.818597, -0.649902, 0.427087, -0.586015, -0.559789, -0.833923, 0.0892409, -0.621251, 0.213826, 0.465509, 0.4704, 0.380261, 0.413067, 0.180822, 0.172866, 0.59614, 0.825575, 0.662916, -0.704381, -0.297631, 0.697778];
    let op3_expect = [0, 0, 1.211350917816162, 0, 1.7203236818313599, 0, 0, 1.236940860748291, 0.0019998699426651, 0.35952228307724, 1.6008461713790894, 0.4340077340602875, 0, 2.3729209899902344, 0, 0.08478426933288574, 0, 0, 0.149246484041214, 0.9203515648841858, 0, 0.48479676246643066, 0, 0, 0, 0.103178471326828, 0, 1.1774152517318726, 2.589362144470215, 0, 0, 0, 1.1743165254592896, 0.5121424198150635, 0.771379828453064, 0.3998796045780182, 0, 0.2908637523651123, 0.9556341171264648, 1.1632754802703857, 1.8076820373535156, 0, 1.2248047590255737, 0.2371273934841156, 0, 0, 0.49794262647628784, 0, 1.5931415557861328, 0, 0.11142027378082275, 1.1371936798095703, 1.6853669881820679, 0, 1.1860785484313965, 0, 1.3413567543029785, 0.5482984185218811, 0, 2.6458539962768555, 0, 0.12823820114135742, 1.2609186172485352, 0, 0, 2.2582778930664062, 0, 0.005895234644412994, 0, 0, 0.3961202800273895, 1.3704023361206055, 3.9935522079467773, 0.4342212378978729, 0.2744647264480591, 0, 0, 0.5391290187835693, 0, 0.8349528312683105, 0.844179630279541, 0, 0, 0.9333363175392151, 0, 0, 0, 0, 0, 0, 0, 1.7870270013809204, 0, 1.4856477975845337, 0, 1.01003098487854, 0, 0, 1.9096932411193848, 0, 0.6972557306289673, 0, 1.8163447380065918, 0.7178011536598206, 0.8624786138534546, 0, 0, 0, 0.2478451132774353, 2.677565574645996, 0, 0, 0.25444814562797546, 0.4152834415435791, 0, 0.5079120993614197, 0.9799261093139648, 0, 0, 0, 0, 0, 0.5949735641479492, 0.08450579643249512, 2.4849629402160645, 0.3850197494029999];

    let type0 = {type: nn.INT32};
    let type2 = {type: nn.TENSOR_FLOAT32, dimensions: [1, 6, 7, 3]};
    let type2_length = product(type2.dimensions);
    let type1 = {type: nn.TENSOR_FLOAT32, dimensions: [1, 8, 8, 3]};
    let type1_length = product(type1.dimensions);
    let type3 = {type: nn.TENSOR_FLOAT32, dimensions: [3, 3, 2, 3]};
    let type3_length = product(type3.dimensions);
    let type4 = {type: nn.TENSOR_FLOAT32, dimensions: [3]};
    let type4_length = product(type4.dimensions);

    let b4 = operandIndex++;
    model.addOperand(type0);
    let b5 = operandIndex++;
    model.addOperand(type0);
    let b6 = operandIndex++;
    model.addOperand(type0);
    let b7 = operandIndex++;
    model.addOperand(type0);
    let op2 = operandIndex++;
    model.addOperand(type1);
    let op3 = operandIndex++;
    model.addOperand(type2);
    let op0 = operandIndex++;
    model.addOperand(type3);
    let op1 = operandIndex++;
    model.addOperand(type4);

    model.setOperandValue(b4, new Int32Array([2]));
    model.setOperandValue(b5, new Int32Array([1]));
    model.setOperandValue(b6, new Int32Array([1]));
    model.setOperandValue(b7, new Int32Array([1]));
    model.setOperandValue(op0, new Float32Array([-0.966213, -0.579455, -0.684259, 0.738216, 0.184325, 0.0973683, -0.176863, -0.23936, -0.000233404, 0.055546, -0.232658, -0.316404, -0.012904, 0.320705, -0.326657, -0.919674, 0.868081, -0.824608, -0.467474, 0.0278809, 0.563238, 0.386045, -0.270568, -0.941308, -0.779227, -0.261492, -0.774804, -0.79665, 0.22473, -0.414312, 0.685897, -0.327792, 0.77395, -0.714578, -0.972365, 0.0696099, -0.82203, -0.79946, 0.37289, -0.917775, 0.82236, -0.144706, -0.167188, 0.268062, 0.702641, -0.412223, 0.755759, 0.721547, -0.43637, -0.274905, -0.269165, 0.16102, 0.819857, -0.312008]));
    model.setOperandValue(op1, new Float32Array([0, 0, 0]));
    model.addOperation(nn.CONV_2D, [op2, op0, op1, b4, b5, b6, b7], [op3]);

    model.identifyInputsAndOutputs([op2], [op3]);
    await model.finish();

    let compilation = await model.createCompilation();
    compilation.setPreference(prefer);
    await compilation.finish();

    let execution = await compilation.createExecution();

    let op2_input = new Float32Array(op2_value);
    execution.setInput(0, op2_input);

    let op3_output = new Float32Array(type2_length);
    execution.setOutput(0, op3_output);

    await execution.startCompute();

    for (let i = 0; i < type2_length; ++i) {
      assert.isTrue(almostEqualCTS(op3_output[i], op3_expect[i]));
    }
  });

  it('check result for Conv 3 h3 w2 valid relu example-2', async function() {
    let model = await nn.createModel(options);
    let operandIndex = 0;

    let op2_value = [-0.295335, -0.00387601, -0.552251, 0.166084, -0.28482, -0.152143, -0.719885, -0.869386, -0.745598, 0.823947, 0.473183, -0.331337, 0.187631, 0.0426571, -0.826897, -0.755085, -0.472453, -0.0233656, 0.0483436, 0.933418, -0.961974, 0.0125783, 0.219742, 0.342604, -0.15166, 0.0934905, 0.783221, 0.129664, 0.838844, -0.271388, 0.924519, 0.342843, 0.274418, 0.350817, 0.841638, -0.543993, -0.00283395, -0.128467, -0.682943, -0.319117, 0.84634, 0.283003, 0.32865, 0.0293755, -0.0335696, 0.591266, -0.0743476, -0.741271, 0.462056, -0.583625, -0.590183, 0.6234, 0.535269, -0.670818, -0.955642, -0.770173, 0.479986, 0.664377, 0.399445, -0.968874, -0.276263, -0.901951, 0.544104, -0.958981, 0.482658, -0.807284, 0.305369, -0.947818, 0.827498, -0.382887, -0.805741, -0.796678, -0.299804, -0.229828, 0.818783, -0.103055, -0.45568, -0.227827, 0.543743, -0.96073, 0.946747, -0.857182, -0.96426, -0.292411, -0.715614, 0.765278, -0.475043, -0.590142, -0.238507, 0.673002, -0.473357, -0.319626, 0.936014, 0.486607, 0.580844, 0.425352, -0.800994, 0.290763, -0.494953, -0.441162, 0.718677, -0.828427, 0.96965, 7.53637e-05, -0.699973, -0.526886, -0.352682, 0.799466, 0.332789, 0.723389, 0.407659, -0.934084, -0.284705, 0.961484, -0.700395, -0.985808, -0.595342, -0.691721, 0.49448, -0.0842649, 0.0390966, 0.298938, -0.128094, -0.97158, 0.86393, 0.270606, -0.468986, -0.256605, 0.47215, -0.273117, -0.590343, -0.826529, -0.725381, -0.194821, -0.259661, -0.0949207, -0.180302, 0.0446834, -0.222133, -0.40393, 0.295772, -0.92949, 0.580079, -0.169856, 0.330311, 0.0173551, -0.635823, 0.475942, 0.907175, 0.242777, -0.512208, 0.362463, 0.0496289, 0.65171, 0.990057, 0.690733, -0.469013, -0.101311, -0.68372, -0.157841, -0.677711, -0.708224, -0.659437, -0.407607, 0.677033, 0.89032, 0.228307, -0.749514, 0.772958, 0.054701, 0.551705, 0.917052, -0.895022, -0.702397, 0.484142, 0.108648, 0.833347, 0.478872, -0.984112, 0.387176, -0.73299, 0.7526, 0.443312, -0.0987856, 0.125415, 0.10876, -0.498108, 0.43209, 0.344609, 0.928941, -0.130732, -0.0569167];
    let op3_expect = [1.0670944452285767, 0, 1.5269372463226318, 0, 0.8027355074882507, 0, 2.266101360321045, 0, 2.1550564765930176, 0, 1.1522449254989624, 0, 0.9434586763381958, 0.8852099180221558, 0.9879440069198608, 0, 0, 1.7106999158859253, 0.10474669933319092, 0.8283235430717468, 0, 0, 1.7488926649093628, 0, 0, 0.6130228042602539, 0, 0, 3.638164520263672, 0, 0.7742787599563599, 0, 0, 1.0375304222106934, 0, 0.8918159008026123, 0, 1.8385940790176392, 0, 0, 0.21880649030208588, 0, 3.047340154647827, 0, 1.1088112592697144, 0, 0, 0, 1.6490882635116577, 2.335726737976074, 0.3114399313926697, 0, 0.32574737071990967, 0, 0, 2.8507285118103027, 1.9469213485717773, 1.1297738552093506, 1.1351032257080078, 0, 0.1187642440199852, 0, 2.8729991912841797, 1.3804916143417358, 2.3834192752838135, 0.8823201656341553, 1.0379514694213867, 0, 0, 0, 1.0930250883102417, 0.4617673456668854, 1.848496437072754, 0, 4.288714408874512, 0, 0, 1.5986868143081665, 0.08118566870689392, 0.9120546579360962, 0.45217660069465637, 2.0181241035461426, 2.6290717124938965, 1.5030415058135986, 0.6098240613937378, 0, 3.356354236602783, 2.023864269256592, 1.4687039852142334, 0, 0, 0, 0, 1.852769374847412, 2.928166389465332, 0, 0, 0, 0, 0, 2.0575931072235107, 1.065101146697998, 0.8847578167915344, 0, 3.8131909370422363, 0, 0.1145193800330162, 0.5435560345649719, 0, 0, 1.157010555267334, 0, 2.5764546394348145, 0.5312090516090393, 0.9498996734619141, 0, 1.5146098136901855, 1.5888819694519043, 0.895930826663971, 0, 0.5452516674995422, 0.7469027638435364, 0.012994423508644104, 0, 0, 1.7778881788253784];

    let type0 = {type: nn.INT32};
    let type2 = {type: nn.TENSOR_FLOAT32, dimensions: [1, 6, 7, 3]};
    let type2_length = product(type2.dimensions);
    let type1 = {type: nn.TENSOR_FLOAT32, dimensions: [1, 8, 8, 3]};
    let type1_length = product(type1.dimensions);
    let type3 = {type: nn.TENSOR_FLOAT32, dimensions: [3, 3, 2, 3]};
    let type3_length = product(type3.dimensions);
    let type4 = {type: nn.TENSOR_FLOAT32, dimensions: [3]};
    let type4_length = product(type4.dimensions);

    let b4 = operandIndex++;
    model.addOperand(type0);
    let b5 = operandIndex++;
    model.addOperand(type0);
    let b6 = operandIndex++;
    model.addOperand(type0);
    let b7 = operandIndex++;
    model.addOperand(type0);
    let op2 = operandIndex++;
    model.addOperand(type1);
    let op3 = operandIndex++;
    model.addOperand(type2);
    let op0 = operandIndex++;
    model.addOperand(type3);
    let op1 = operandIndex++;
    model.addOperand(type4);

    model.setOperandValue(b4, new Int32Array([2]));
    model.setOperandValue(b5, new Int32Array([1]));
    model.setOperandValue(b6, new Int32Array([1]));
    model.setOperandValue(b7, new Int32Array([1]));
    model.setOperandValue(op0, new Float32Array([-0.966213, -0.579455, -0.684259, 0.738216, 0.184325, 0.0973683, -0.176863, -0.23936, -0.000233404, 0.055546, -0.232658, -0.316404, -0.012904, 0.320705, -0.326657, -0.919674, 0.868081, -0.824608, -0.467474, 0.0278809, 0.563238, 0.386045, -0.270568, -0.941308, -0.779227, -0.261492, -0.774804, -0.79665, 0.22473, -0.414312, 0.685897, -0.327792, 0.77395, -0.714578, -0.972365, 0.0696099, -0.82203, -0.79946, 0.37289, -0.917775, 0.82236, -0.144706, -0.167188, 0.268062, 0.702641, -0.412223, 0.755759, 0.721547, -0.43637, -0.274905, -0.269165, 0.16102, 0.819857, -0.312008]));
    model.setOperandValue(op1, new Float32Array([0, 0, 0]));
    model.addOperation(nn.CONV_2D, [op2, op0, op1, b4, b5, b6, b7], [op3]);

    model.identifyInputsAndOutputs([op2], [op3]);
    await model.finish();

    let compilation = await model.createCompilation();
    compilation.setPreference(prefer);
    await compilation.finish();

    let execution = await compilation.createExecution();

    let op2_input = new Float32Array(op2_value);
    execution.setInput(0, op2_input);

    let op3_output = new Float32Array(type2_length);
    execution.setOutput(0, op3_output);

    await execution.startCompute();

    for (let i = 0; i < type2_length; ++i) {
      assert.isTrue(almostEqualCTS(op3_output[i], op3_expect[i]));
    }
  });
});
