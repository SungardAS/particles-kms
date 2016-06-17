var assert = require("assert");
var CondensationTests = require("condensation-particle-tests");

var cTests = new CondensationTests();

describe("resources", function() {
  describe("master_key", function() {
    it("creates the resource with keyPolicy", function() {
      cTests.testParticle(
        "resource",
        "master_key",
        require("./fixtures/resource_master_key_output_1"),
        {logicalId: "MasterKey", hArgs: {
          keyPolicy: {
            Statement: [{
              Sid: "Admin",
              Effect: "Allow",
              Principal: {"AWS": "arn:aws:iam::00000000000:root"},
              Action: [
                "kms:*"
              ],
              Resource: "*"
            }]
          }
        }}
      );
    });
  });
});
