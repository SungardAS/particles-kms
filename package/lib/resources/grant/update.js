var handler = require('lambda-formation').resource.update;
var util = require('lambda-formation').util;

var update = function (err, event, context) {
  if (err) {
    return util.done(err);
  }

  var region = event.Region || process.env.AWS_DEFAULT_REGION;

  var params = event.ResourceProperties;
  var kms = new AWS.KMS({region: region});

  kms.retireGrant({
    GrantId: event.PhysicalResourceId,
    KeyId: event.OldResourceProperties.KeyId
  }, function(err, data) {
    if (err) return util.done(err,event,context);

    kms.createGrant(params, function(err, data) {
      if (err) return util.done(err,event,context);

      util.done(null, event, context, data, data.GrantId);
    });
  });
};

/* Do not change this function */
module.exports.handler = function (event, context) {
  handler.apply(this, [event, context, update]);
};
