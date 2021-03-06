/**
 iZ³ | Izzzio blockchain - https://izzz.io

 Copyright 2018 Izio Ltd (OOO "Изио")

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */


/**
 * Factory contract
 */
class factoryContract extends Contract {

    constructor() {
        super();
        this._perfomerList = new BlockchainMap('_perfomerList');
        this._customerList = new BlockchainMap('_customerList');
        this._activeContracts = new BlockchainMap('_activeContracts');
        this._completedContracts = new BlockchainMap('_completedContracts');
    }


    _createContractKey(perfomerId, customerId, contractId) {
        return perfomerId + '_' + customerId + '_' + contractId;
    }


    getActiveContract(perfomerId, customerId, contractId) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        assert.true(this._activeContracts[contractKey], "Contract with this parameters doesn't exist or already completed");

        return JSON.stringify(this._activeContracts[contractKey]);
    }


    getCompletedContract(perfomerId, customerId, contractId) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        assert.true(this._completedContracts[contractKey], "Contract with this parameters doesn't exist or isn't yet complete");

        return JSON.stringify(this._completedContracts[contractKey]);
    }


    _addPerfomer(perfomerId, perfomerInfo) {
        this._perfomerList[perfomerId] = {
            perfomerInfo: perfomerInfo,
        };
    }


    removePerfomer(perfomerId) {
        this._perfomerList[perfomerId] = undefined;
    }


    _addCustomer(customerId, customerInfo) {
        this._customerList[customerId] = {
            customerInfo: customerInfo,
        };
    }


    removeCustomer(customerId) {
        this._customerList[customerId] = undefined;
    }


    newContractWithNewCustomerAndPerformer(
        perfomerId,
        perfomerInfo,
        customerId,
        customerInfo,
        contractId,
        infoFromOrderCONSTANT,
        infoFromOrderEDIT,
        infoFromOfferCONCTANT,
        infoFromOfferEDIT
    ) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        if (this._activeContracts[contractKey] || this._completedContracts[contractKey]) {
            assert.true(false, "Contract with such parameters(perfomerId, customerId, contractId) is already exist");
        }

        this._addPerfomer(perfomerId, perfomerInfo);
        this._addCustomer(customerId, customerInfo);

        let newAgreement = agreementContract.create(
            this._perfomerList[perfomerId],
            this._customerList[customerId],
            infoFromOrderCONSTANT,
            infoFromOrderEDIT,
            infoFromOfferCONCTANT,
            infoFromOfferEDIT
        );
        this._activeContracts[contractKey] = newAgreement;

        return JSON.stringify(newAgreement);
    }


    newContractWithNewPerformer(
        perfomerId,
        perfomerInfo,
        customerId,
        contractId,
        infoFromOrderCONSTANT,
        infoFromOrderEDIT,
        infoFromOfferCONCTANT,
        infoFromOfferEDIT
    ) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        if (this._activeContracts[contractKey] || this._completedContracts[contractKey]) {
            assert.true(false, "Contract with such parameters(perfomerId, customerId, contractId) is already exist");
        }

        this._addPerfomer(perfomerId, perfomerInfo);

        let newAgreement = agreementContract.create(
            this._perfomerList[perfomerId],
            this._customerList[customerId],
            infoFromOrderCONSTANT,
            infoFromOrderEDIT,
            infoFromOfferCONCTANT,
            infoFromOfferEDIT
        );
        this._activeContracts[contractKey] = newAgreement;

        return JSON.stringify(newAgreement);
    }


    newContractWithNewCustomer(
        perfomerId,
        customerId,
        customerInfo,
        contractId,
        infoFromOrderCONSTANT,
        infoFromOrderEDIT,
        infoFromOfferCONCTANT,
        infoFromOfferEDIT
    ) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        if (this._activeContracts[contractKey] || this._completedContracts[contractKey]) {
            assert.true(false, "Contract with such parameters(perfomerId, customerId, contractId) is already exist");
        }

        this._addCustomer(customerId, customerInfo);

        let newAgreement = agreementContract.create(
            this._perfomerList[perfomerId],
            this._customerList[customerId],
            infoFromOrderCONSTANT,
            infoFromOrderEDIT,
            infoFromOfferCONCTANT,
            infoFromOfferEDIT
        );
        this._activeContracts[contractKey] = newAgreement;

        return JSON.stringify(newAgreement);
    }


    newContractOnly(
        perfomerId,
        customerId,
        contractId,
        infoFromOrderCONSTANT,
        infoFromOrderEDIT,
        infoFromOfferCONCTANT,
        infoFromOfferEDIT
    ) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        if (this._activeContracts[contractKey] || this._completedContracts[contractKey]) {
            assert.true(false, "Contract with such parameters(perfomerId, customerId, contractId) is already exist");
        }

        let newAgreement = agreementContract.create(
            this._perfomerList[perfomerId],
            this._customerList[customerId],
            infoFromOrderCONSTANT,
            infoFromOrderEDIT,
            infoFromOfferCONCTANT,
            infoFromOfferEDIT
        );
        this._activeContracts[contractKey] = newAgreement;

        return JSON.stringify(newAgreement);
    }


    changeInfoFromOrderEDIT(perfomerId, customerId, contractId, newInfoFromOrderEDIT) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        assert.true(this._activeContracts[contractKey], "Contract with this parameters(perfomerId, customerId, contractId) doesn't exist or already completed");
        assert.false(this._activeContracts[contractKey].contractParams.contractCompleted, "Contract already completed");

        let activeContract = this._activeContracts[contractKey];
        activeContract.contractParams.infoFromOrderEDIT = newInfoFromOrderEDIT;
        this._activeContracts[contractKey] = activeContract;

        return JSON.stringify(this._activeContracts[contractKey]);
    }


    changeInfoFromOfferEDIT(perfomerId, customerId, contractId, newInfoFromOfferEDIT) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        assert.true(this._activeContracts[contractKey], "Contract with this parameters(perfomerId, customerId, contractId) doesn't exist or already completed");
        assert.false(this._activeContracts[contractKey].contractParams.contractCompleted, "Contract already completed");

        let activeContract = this._activeContracts[contractKey];
        activeContract.contractParams.infoFromOfferEDIT = newInfoFromOfferEDIT;
        this._activeContracts[contractKey] = activeContract;

        return JSON.stringify(this._activeContracts[contractKey]);
    }


    completeTheContract(perfomerId, customerId, contractId) {
        let contractKey = this._createContractKey(perfomerId, customerId, contractId);
        assert.true(this._activeContracts[contractKey], "Contract with this parameters(perfomerId, customerId, contractId) doesn't exist or already completed");
        assert.false(this._activeContracts[contractKey].contractParams.contractCompleted, "Contract already completed");

        let activeContract = this._activeContracts[contractKey];
        activeContract.contractParams.contractCompleted = true;
        this._activeContracts[contractKey] = activeContract;

        this._completedContracts[contractKey] = this._activeContracts[contractKey];
        this._activeContracts[contractKey] = undefined;

        return JSON.stringify(this._completedContracts[contractKey]);
    }
}

let agreementContract = {
    contractParams: {
        contractCompleted: false,
        perfomerInfo: '',
        customerInfo: '',
        infoFromOrderCONSTANT: '',
        infoFromOrderEDIT: '',
        infoFromOfferCONCTANT: '',
        infoFromOfferEDIT: '',
    },

    create: function(perfomer, customer, orderCONST, orderEDIT, offerCONST, offerEDIT){
        this.contractParams.contractCompleted = false;
        if(perfomer && perfomer.perfomerInfo){
            this.contractParams.perfomerInfo = perfomer.perfomerInfo;
        }
        if(customer && customer.customerInfo){
            this.contractParams.customerInfo = customer.customerInfo;
        }
        this.contractParams.infoFromOrderCONSTANT = orderCONST;
        this.contractParams.infoFromOrderEDIT = orderEDIT;
        this.contractParams.infoFromOfferCONCTANT = offerCONST;
        this.contractParams.infoFromOfferEDIT = offerEDIT;

        return this;
    }
};

global.registerContract(factoryContract);