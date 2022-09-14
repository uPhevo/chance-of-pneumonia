function getBestPrediction(predictions) {
    let first = predictions[0].prob;
    let second = predictions[1].prob;

    if (first > second) return predictions[0];
    return predictions[1];
  }

  async function run() {
    const model = await tf.automl.loadImageClassification('assets/model.json');
    const image = document.getElementById('imageContainer');
    const predictions = await model.classify(image);
    // Show the resulting object on the page.
    const bestPrediction = getBestPrediction(predictions);
    const predResult = `${bestPrediction.label.toLowerCase()} с ${bestPrediction.prob.toFixed(2) * 100}% вероятностью`

    const pre = document.getElementById('predictionResult');
    pre.textContent = predResult;
    pre.className = bestPrediction.label === "NORMAL" ? 
                    "btn btn-lg btn-success" : 
                    "btn btn-lg btn-danger"
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#imageContainer')
          .attr('src', e.target.result);
        run();
      };

      reader.readAsDataURL(input.files[0]);
    }
  }