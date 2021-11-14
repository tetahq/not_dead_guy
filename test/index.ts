import { expect } from "chai";
import { ethers } from "hardhat";

async function getContract() {
  const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
  const notDeadGuy = await NotDeadGuy.deploy();
  await notDeadGuy.deployed();
  
  return notDeadGuy;
}

describe("Not Dead Guy", function () {
  
  describe("Initial State", function() {
    it("Token counter must be zero at initial state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.totalSupply()).to.equal(0);
    });
  
    it("Market should opened at initial state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isMarketOpened()).to.equal(true);
    });
  
    it("Presale should closed at initial state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isPreSaleOpened()).to.equal(false);
    });
  
    it("Public sale should closed at initial state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isPublicSaleOpened()).to.equal(false);
    });
  });
  
  describe("Mutations", function () {
    it("Owner should update market state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isMarketOpened()).to.equal(true);
    
      const setMarketStateTx = await ndg.changeMarketState(false);
      await setMarketStateTx.wait();
    
      expect(await ndg.isMarketOpened()).to.equal(false);
    });
  
    it("Owner should update pre sale state", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isPreSaleOpened()).to.equal(false);
    
      const setPreSaleStateTx = await ndg.changePreSaleState(true);
      await setPreSaleStateTx.wait();
    
      expect(await ndg.isPreSaleOpened()).to.equal(true);
    });
  
    it("Owner should update public sale state when pre sale not active", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isPublicSaleOpened()).to.equal(false);
    
      const setPublicSaleStateTx = await ndg.changePublicSaleState(true);
      await setPublicSaleStateTx.wait();
      expect(await ndg.isPublicSaleOpened()).to.equal(true);
    });
  
    it("Owner shouldn't update public sale state to opened when pre sale is active", async function () {
      const ndg = await getContract();
  
      expect(await ndg.isPreSaleOpened()).to.equal(false);
      expect(await ndg.isPublicSaleOpened()).to.equal(false);
  
      const setPreSaleStateTx = await ndg.changePreSaleState(true);
      await setPreSaleStateTx.wait();
  
      expect(await ndg.isPreSaleOpened()).to.equal(true);
    
      try {
        const setPublicSaleStateTx = await ndg.changePublicSaleState(true);
        await setPublicSaleStateTx.wait();
      }
      catch {}
      finally {
        expect(await ndg.isPublicSaleOpened()).to.equal(false);
      }
    });
  
    it("Owner shouldn't update pre sale state to opened when public sale is active", async function () {
      const ndg = await getContract();
    
      expect(await ndg.isPreSaleOpened()).to.equal(false);
      expect(await ndg.isPublicSaleOpened()).to.equal(false);
    
      const setPublicSaleStateTx = await ndg.changePublicSaleState(true);
      await setPublicSaleStateTx.wait();
    
      expect(await ndg.isPublicSaleOpened()).to.equal(true);
      
      try {
        const setPreSaleStateTx = await ndg.changePreSaleState(true);
        await setPreSaleStateTx.wait();
      }
      catch {}
      finally {
        expect(await ndg.isPreSaleOpened()).to.equal(false);
      }
    });
  });
});
