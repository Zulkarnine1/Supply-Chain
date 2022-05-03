const { expectEvent, BN } = require("@openzeppelin/test-helpers");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const truffleAssert = require("truffle-assertions");
const Web3 = require("web3");

const VaccineChain = artifacts.require("VaccineChain");

contract("VaccineChain", (accounts) => {
  before(async () => {
    this.owner = accounts[0];

    this.VACCINE_BRANDS = {
      Pfizer: "Pfizer-BioNTech",
      Moderna: "Moderna",
      Janssen: "Johnson & Johnson's Janssen",
      Sputnik: "Sputnik V",
    };

    this.ModeEnums = {
      ISSUER: { val: "ISSUER", pos: 0 },
      PROVER: { val: "PROVER", pos: 1 },
      VERIFIER: { val: "VERIFIER", pos: 2 },
    };

    this.StatusEnums = {
      manufactured: { val: "MANUFACTURED", pos: 0 },
      delivering1: { val: "DELIVERING_INTERNATIONAL", pos: 1 },
      stored: { val: "STORED", pos: 2 },
      delivering2: { val: "DELIVERING_LOCAL", pos: 3 },
      delivered: { val: "DELIVERED", pos: 4 },
    };

    this.defaultEntities = {
      manufacturerA: { id: accounts[1], mode: this.ModeEnums.PROVER.val },
      manufacturerB: { id: accounts[2], mode: this.ModeEnums.PROVER.val },
      inspector: { id: accounts[3], mode: this.ModeEnums.ISSUER.val },
      distributorGlobal: { id: accounts[4], mode: this.ModeEnums.VERIFIER.val },
      distributorLocal: { id: accounts[5], mode: this.ModeEnums.VERIFIER.val },
      immunizer: { id: accounts[6], mode: this.ModeEnums.ISSUER.val },
      traveller: { id: accounts[7], mode: this.ModeEnums.PROVER.val },
      borderAgent: { id: accounts[8], mode: this.ModeEnums.VERIFIER.val },
    };

    this.defaultVaccineBatches = {
      0: {
        brand: this.VACCINE_BRANDS.Pfizer,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
      1: {
        brand: this.VACCINE_BRANDS.Moderna,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
      2: {
        brand: this.VACCINE_BRANDS.Janssen,
        manufacturer: this.defaultEntities.manufacturerB.id,
      },
      3: {
        brand: this.VACCINE_BRANDS.Sputnik,
        manufacturer: this.defaultEntities.manufacturerB.id,
      },
      4: {
        brand: this.VACCINE_BRANDS.Pfizer,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
      5: {
        brand: this.VACCINE_BRANDS.Pfizer,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
      6: {
        brand: this.VACCINE_BRANDS.Moderna,
        manufacturer: this.defaultEntities.manufacturerB.id,
      },
      7: {
        brand: this.VACCINE_BRANDS.Moderna,
        manufacturer: this.defaultEntities.manufacturerB.id,
      },
      8: {
        brand: this.VACCINE_BRANDS.Janssen,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
      9: {
        brand: this.VACCINE_BRANDS.Sputnik,
        manufacturer: this.defaultEntities.manufacturerA.id,
      },
    };
    this.coldChainInstance = await VaccineChain.deployed();
    this.providerOrUrl = "http://localhost:8545";
  });

  it("should add entities successfully", async () => {
    // const balance = await VaccineChainInstance.;

    for (const entity of Object.values(this.defaultEntities)) {
      const result = await this.coldChainInstance.addEntity(entity.id, entity.mode, { from: this.owner });

      expectEvent(result.receipt, "AddEntity", {
        entityId: entity.id,
        entityMode: entity.mode,
      });

      const retrievedEntity = await this.coldChainInstance.entities.call(entity.id);
      assert.equal(entity.id, retrievedEntity.id, "mismatched ids");

      assert.equal(this.ModeEnums[entity.mode].pos, retrievedEntity.mode.toString(), "mismatched modes");
    }
  });

  it("should add vaccine batches successfully", async () => {
    // const balance = await VaccineChainInstance.;

    for (let i = 0; i < Object.keys(this.defaultVaccineBatches).length; i++) {
      const { brand, manufacturer } = this.defaultVaccineBatches[i];

      const result = await this.coldChainInstance.addVaccineBatch(brand, manufacturer, { from: this.owner });

      expectEvent(result.receipt, "AddVaccineBatch", {
        vaccineBatchId: String(i),
        manufacturer: manufacturer,
      });

      const retrievedVaccineBatch = await this.coldChainInstance.vaccineBatches.call(i);

      assert.equal(i, retrievedVaccineBatch.id, "mismatched ids");
      assert.equal(brand, retrievedVaccineBatch.brand, "mismatched brand");
      assert.equal(manufacturer, retrievedVaccineBatch.manufacturer, "mismatched manufacturer");
      assert.equal(undefined, retrievedVaccineBatch.certificateIds, "mismatched certificates");
    }
  });

  it("should sign a message and store as a certificate from the issuer to the prover", async () => {
    // const balance = await VaccineChainInstance.;
    const mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";
    const provider = new HDWalletProvider({ mnemonic, providerOrUrl: this.providerOrUrl });
    this.web3 = new Web3(provider);
    const { inspector, manufacturerA } = this.defaultEntities;
    const vaccineBatchId = 0;
    const message = `Inspector (${inspector.id}) has inspected and certified the vaccine batch #(${vaccineBatchId}) for manufacturer (${manufacturerA.id})`;
    const signature = await this.web3.eth.sign(this.web3.utils.keccak256(message), inspector.id);
    const result = await this.coldChainInstance.issueCertificate(
      inspector.id,
      manufacturerA.id,
      this.StatusEnums.manufactured.val,
      vaccineBatchId,
      signature,
      { from: this.owner }
    );
    expectEvent(result.receipt, "IssueCertificate", {
      issuer: inspector.id,
      prover: manufacturerA.id,
      certificateId: new BN(0),
    });

    const retrievedCertificate = await this.coldChainInstance.certificates.call(0);
    assert.equal(retrievedCertificate.id, 0, "mismatched ids");
    assert.equal(retrievedCertificate.issuer.id, inspector.id, "mismatched issuer");
    assert.equal(retrievedCertificate.prover.id, manufacturerA.id, "mismatched manufacturer");
    assert.equal(retrievedCertificate.signature, signature, "mismatched signature");
    assert.equal(retrievedCertificate.status, this.StatusEnums.manufactured.pos.toString(), "mismatched status");
  });

  it("should sign a verify a certificate sign matches the issuer.", async () => {
    const { inspector, manufacturerA } = this.defaultEntities;
    const vaccineBatchId = 0;
    const message = `Inspector (${inspector.id}) has inspected and certified the vaccine batch #(${vaccineBatchId}) for manufacturer (${manufacturerA.id})`;

    const certificate = await this.coldChainInstance.certificates.call(0);
    const signMatch = await this.coldChainInstance.isMatchingSignature(
      this.web3.utils.keccak256(message),
      certificate.id,
      inspector.id,
      { from: this.owner }
    );

    assert.equal(signMatch, true, "mismatched signs");
  });
});
