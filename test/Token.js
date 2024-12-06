const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// describe("Token contract", function () {

//     async function deployTokenFixture() {
//         const [owner, w1, w2] = await ethers.getSigners()

//         const hardhatToken = await ethers.deployContract("Floppy")

//         return {hardhatToken, owner, w1, w2}
//     }

//   it("Deployment should assign the total supply of tokens to the owner", async function () {
    
//     const {hardhatToken, owner} = await loadFixture(deployTokenFixture)

//     const ownerBalance = await hardhatToken.balanceOf(owner.address);
//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });


//   it("Should transfer tokens between accounts", async function () {
//     // // Lấy địa chỉ ví của người deploy contract và 2 địa chỉ test
//     // const [owner, w1, w2] =  await ethers.getSigners();


//     // // Triển khai contract
//     // const etherContract = await ethers.deployContract("Floppy")

//     const {hardhatToken: etherContract, owner, w1, w2} = await loadFixture(deployTokenFixture)

//     // Chuyển tiền giữa owner và ví 1
//     await etherContract.transfer(w1.address, 50)

//     // Xác minh tiền của ví
//     expect(await etherContract.balanceOf(w1.address)).to.equal(50)

//     // Chuyển tiền ví 1 và ví 2
//     await etherContract.connect(w1).transfer(w2.address, 50)

//     // Xác minh tiền ví 2 sau khi chuyển
//     expect(await etherContract.balanceOf(w2.address)).to.equal(50)


//   })
// });


describe("Token contract", function(){

    // Taọ fixture
    async function deployTokenFixture() {
          const [owner, addr1, addr2] = await ethers.getSigners()
          
          const hardhatToken = await ethers.deployContract("Floppy")

        //   await hardhatToken.waitForDeployment

          return {hardhatToken, owner, addr1, addr2}
    }

    describe("Deployment", function(){
       
        it("Should set the right owner", async function(){

            const {hardhatToken, owner} = await loadFixture(deployTokenFixture)

            expect(await hardhatToken.owner()).to.equal(owner.address)

        })



        it("Should assign total supply token to owner ", async function(){

            const {hardhatToken, owner} = await loadFixture(deployTokenFixture)

            expect(await hardhatToken.totalSupply()).to.equal(await hardhatToken.balanceOf(owner.address))
        })

    })


    describe("Transactions", function(){
        it("Should transfer token between accounts", async function(){
            const {hardhatToken, owner, addr1, addr2} = await loadFixture(deployTokenFixture)

            // Chuyển owner sang addr1 50
            expect(await hardhatToken.transfer(addr1.address, 50)).to.changeTokenBalances(hardhatToken, [owner, addr1], [-50, 50])

            // Chuyển addr1 sang addr2 50
            expect(await hardhatToken.connect(addr1).transfer(addr2.address, 50)).to.changeTokenBalances(hardhatToken, [addr1, addr2], [-50, 50])

        })

        
    it("Should emit Transfer events", async function () {
        const { hardhatToken, owner, addr1, addr2 } = await loadFixture(
          deployTokenFixture
        );
  
        // Transfer 50 tokens from owner to addr1
        await expect(hardhatToken.transfer(addr1.address, 50))
          .to.emit(hardhatToken, "Transfer")
          .withArgs(owner.address, addr1.address, 50);
  
        // Transfer 50 tokens from addr1 to addr2
        // We use .connect(signer) to send a transaction from another account
        await expect(hardhatToken.connect(addr1).transfer(addr2.address, 50))
          .to.emit(hardhatToken, "Transfer")
          .withArgs(addr1.address, addr2.address, 50);
      });

    it("Should fail if sender doesn't have enough token ", async function(){
        const {hardhatToken, owner, addr1, addr2}  = await loadFixture(deployTokenFixture)

        const initialOwnerBalance =await hardhatToken.balanceOf(owner.address)

        await expect(  hardhatToken.connect(addr1).transfer(owner.address, 50)).to.revertedWith("ERC20: transfer amount exceeds balance")

         expect(await hardhatToken.balanceOf(owner.address)).to.equal(
            initialOwnerBalance
          );

    })
  
    })

})