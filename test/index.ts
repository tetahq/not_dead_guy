import { expect } from "chai";
import { ethers } from "hardhat";

describe("NotDeadGuy", function () {
  it("Token counter must be zero at initial state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.totalSupply()).to.equal(0);
  });
  
  it("Market should closed at initial state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isMarketOpened()).to.equal(false);
  });
  
  it("Owner should update market state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isMarketOpened()).to.equal(false);
    
    const setMarketStateTx = await notDeadGuy.changeMarketState(true);
    await setMarketStateTx.wait();
    expect(await notDeadGuy.isMarketOpened()).to.equal(true);
  });
  
  it("Presale should closed at initial state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isPreSaleOpened()).to.equal(false);
  });
  
  it("Owner should update pre sale state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isPreSaleOpened()).to.equal(false);
    
    const setPreSaleStateTx = await notDeadGuy.changePreSaleState(true);
    await setPreSaleStateTx.wait();
    expect(await notDeadGuy.isPreSaleOpened()).to.equal(true);
  });
  
  it("Public sale should closed at initial state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isPublicSaleOpened()).to.equal(false);
  });
  
  it("Owner should update public sale state", async function () {
    const NotDeadGuy = await ethers.getContractFactory("NotDeadGuy");
    const notDeadGuy = await NotDeadGuy.deploy();
    await notDeadGuy.deployed();
    
    expect(await notDeadGuy.isPublicSaleOpened()).to.equal(false);
    
    const setPublicSaleStateTx = await notDeadGuy.changePublicSaleState(true);
    await setPublicSaleStateTx.wait();
    expect(await notDeadGuy.isPublicSaleOpened()).to.equal(true);
  });
});
