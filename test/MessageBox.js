const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MessageBox", function () {

  let messageBox, deployer, anotherAccount = null;

  beforeEach(async function () {
    const MessageBox = await ethers.getContractFactory("MessageBox");
    [deployer, anotherAccount] = await ethers.getSigners();
    messageBox = await MessageBox.deploy("Hello, World!. This is a simple message box.");
    await messageBox.deployed();
  });

  it("Should store the initial message once deployed", async function () {
    expect(await messageBox.messageCounter()).to.equal(1);

    const message = await messageBox.getMessage(0);
    expect(message).to.have.property('content', "Hello, World!. This is a simple message box.");
    expect(message).to.have.property('author', deployer.address);
    expect(message).to.have.property('timestamp').and.to.not.be.null;
  });


  it("Should store the new message when added", async function () {
    expect(await messageBox.messageCounter()).to.equal(1);

    const addMessageTx = await messageBox.connect(anotherAccount).addMessage("Second Message.");
    await addMessageTx.wait();

    expect(await messageBox.messageCounter()).to.equal(2);
    const message = await messageBox.getMessage(1);
    expect(message).to.have.property('content', "Second Message.");
    expect(message).to.have.property('author', anotherAccount.address);
    expect(message).to.have.property('timestamp').and.to.not.be.null;
  });

  it("Should be able to get all the messages", async function () {
    expect(await messageBox.messageCounter()).to.equal(1);

    await messageBox.addMessage("Second Message.");
    await messageBox.connect(anotherAccount).addMessage("Third Message.");

    expect(await messageBox.messageCounter()).to.equal(3);

    const messages = await messageBox.getAllMessages();

    expect(messages).to.have.a.lengthOf(3);
    expect(messages[0]).to.have.property('content', "Hello, World!. This is a simple message box.");
    expect(messages[0]).to.have.property('author', deployer.address);
    expect(messages[0]).to.have.property('timestamp').and.to.not.be.null;

    expect(messages[1]).to.have.property('content', "Second Message.");
    expect(messages[1]).to.have.property('author', deployer.address);
    expect(messages[1]).to.have.property('timestamp').and.to.not.be.null;

    expect(messages[2]).to.have.property('content', "Third Message.");
    expect(messages[2]).to.have.property('author', anotherAccount.address);
    expect(messages[2]).to.have.property('timestamp').and.to.not.be.null;
  });
});
