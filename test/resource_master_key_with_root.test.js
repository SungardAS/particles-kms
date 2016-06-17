var assert = require("assert");
var CondensationTests = require("condensation-particle-tests");

var cTests = new CondensationTests();

describe("resources", function() {
  describe("master_key_with_root", function() {
    it("creates the resource with keyPolicy", function() {
      cTests.testParticle(
        "resource",
        "master_key_with_root",
        require("./fixtures/resource_master_key_with_root_output_1"),
        {logicalId: "MasterKey", hArgs: {}}
      );
    });
  });
});
