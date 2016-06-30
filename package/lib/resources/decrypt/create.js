var AWS = require('aws-sdk');
var handler = require('lambda-formation').resource.create;
var util = require('lambda-formation').util;

var create = function (err, event, context) {
  if (err) {
    return util.done(err);
  }

  var region = event.Region || process.env.AWS_DEFAULT_REGION;

  var params = event.ResourceProperties;
  var kms = new AWS.KMS({region: region});

  kms.encrypt(params, function(err, data) {
    if (err) return util.done(err,event,context);

    var returnObj = {
      KeyId: data.KeyId,
      CiphertextBlob: CiphertextBlob.toString('base64')
    };
    util.done(null, event, context, returnObj, "ENCRYPTED");
  });

};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, create]);
};

