const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("Token contract", function () {

    async function deployTokenFixture() {
        const [owner, w1, w2] = await ethers.getSigners()

        const hardhatToken = await ethers.deployContract("Floppy")

        return {hardhatToken, owner, w1, w2}
    }

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    
    const {hardhatToken, owner} = await loadFixture(deployTokenFixture)

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });


  it("Should transfer tokens between accounts", async function () {
    // // Lấy địa chỉ ví của người deploy contract và 2 địa chỉ test
    // const [owner, w1, w2] =  await ethers.getSigners();


    // // Triển khai contract
    // const etherContract = await ethers.deployContract("Floppy")

    const {hardhatToken: etherContract, owner, w1, w2} = await loadFixture(deployTokenFixture)

    // Chuyển tiền giữa owner và ví 1
    await etherContract.transfer(w1.address, 50)

    // Xác minh tiền của ví
    expect(await etherContract.balanceOf(w1.address)).to.equal(50)

    // Chuyển tiền ví 1 và ví 2
    await etherContract.connect(w1).transfer(w2.address, 50)

    // Xác minh tiền ví 2 sau khi chuyển
    expect(await etherContract.balanceOf(w2.address)).to.equal(50)


  })
});