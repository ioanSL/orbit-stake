const SimpleStorage = artifacts.require("./Orbit.sol");

contract("Orbit", accounts => {
  it("...should store the value 89.", async () => {
    const orbitInstance = await Orbit.deployed();

    // Set value of 89
    await orbitInstance.set(89, { from: accounts[0] });

    // Get stored value
    const storedData = await orbitInstance.get.call();

    assert.equal(storedData, 89, "The value 89 was not stored.");
  });
});
