const csv = require('./node_modules/fast-csv');
let baseLineData = new Map();
csv.fromPath('baseline/unitTestsBaseline.csv').on('data', function(data) {
  baseLineData.set(data[0] + '-' + data[1] + '-' + data[2] + '-' + data[9]
  );
}).on('end', function() {
  for (let key of baseLineData.keys()) {
    // console.log('keys:  ' + key)
    // console.log("-----------------------\n")
  }
  console.log(baseLineData.has('CTS-CTS/1-check result for Add example-Pass'))
});


let checkStatus = async function (backendModel, results) {
  for (let i=0; i< lists.length; i++) {
    if (lists[i] == backendModel) {
      csv.fromPath('baseline/unitTestsBaseline.csv').on('data', function(data) {
        baseLineData.set(data[0] + '-' + data[1] + '-' + data[2] + '-' + data[i]);
      }).on('end', function() {
        console.log(baseLineData.has('CTS-CTS/1-check result for Add example-Pass'));
        if (results['Pass'] == 'null') {
          if (baseLineData.has(results['Feature'], results['CaseId'], results['TestCase'], results['Fail'])) {
            console.log("this is line 24")
          } else if (baseLineData.has(results['Feature'], results['CaseId'], results['TestCase'], results['NA'])) {
            console.log("this is line 26")
          }
        } else {
          if (baseLineData.has(results['Feature'], results['CaseId'], results['TestCase'], results['Fail'])) {
            console.log("this is line 30")
          } else if (baseLineData.has(results['Feature'], results['CaseId'], results['TestCase'], results['Pass'])) {
            console.log("this is line 32")
          }
        }
      });
    }
  }

}
let lists = [
  'Feature',
  'Case Id',
  'Test Case',
  'Mac-WASM',
  'Mac-WebGL2',
  'Android-WASM',
  'Android-WebGL2',
  'Windows-WASM',
  'Windows-WebGL2',
  'Linux-WASM',
  'Linux-WebGL2'
]

