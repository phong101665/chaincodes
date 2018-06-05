"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_chaincode_utils_1 = require("@theledger/fabric-chaincode-utils");
const Yup = require("yup");
class MyChaincode extends fabric_chaincode_utils_1.Chaincode {
    queryCar(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedArgs = yield fabric_chaincode_utils_1.Helpers.checkArgs(args[0], Yup.object()
                .shape({
                key: Yup.string().required(),
            }));
            const car = stubHelper.getStateAsObject(verifiedArgs.key); //get the car from chaincode state
            if (!car) {
                throw new fabric_chaincode_utils_1.ChaincodeError('Car does not exist');
            }
            return car;
        });
    }
    initLedger(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let cars = [{
                    make: 'Toyota',
                    model: 'Prius',
                    color: 'blue',
                    owner: 'Tomoko'
                }, {
                    make: 'Ford',
                    model: 'Mustang',
                    color: 'red',
                    owner: 'Brad'
                }, {
                    make: 'Hyundai',
                    model: 'Tucson',
                    color: 'green',
                    owner: 'Jin Soo'
                }, {
                    make: 'Volkswagen',
                    model: 'Passat',
                    color: 'yellow',
                    owner: 'Max'
                }, {
                    make: 'Tesla',
                    model: 'S',
                    color: 'black',
                    owner: 'Adriana'
                }, {
                    make: 'Peugeot',
                    model: '205',
                    color: 'purple',
                    owner: 'Michel'
                }, {
                    make: 'Chery',
                    model: 'S22L',
                    color: 'white',
                    owner: 'Aarav'
                }, {
                    make: 'Fiat',
                    model: 'Punto',
                    color: 'violet',
                    owner: 'Pari'
                }, {
                    make: 'Tata',
                    model: 'Nano',
                    color: 'indigo',
                    owner: 'Valeria'
                }, {
                    make: 'Holden',
                    model: 'Barina',
                    color: 'violet',
                    owner: 'Shotaro'
                }];
            for (let i = 0; i < cars.length; i++) {
                const car = cars[i];
                car.docType = 'car';
                yield stubHelper.putState('CAR' + i, car);
                this.logger.info('Added <--> ', car);
            }
        });
    }
    createCar(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedArgs = yield fabric_chaincode_utils_1.Helpers.checkArgs(args[0], Yup.object()
                .shape({
                key: Yup.string().required(),
                make: Yup.string().required(),
                model: Yup.string().required(),
                color: Yup.string().required(),
                owner: Yup.string().required(),
            }));
            let car = {
                docType: 'car',
                make: verifiedArgs.make,
                model: verifiedArgs.model,
                color: verifiedArgs.color,
                owner: verifiedArgs.owner
            };
            yield stubHelper.putState(verifiedArgs.key, car);
        });
    }
    queryAllCars(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const startKey = 'CAR0';
            const endKey = 'CAR999';
            return yield stubHelper.getStateByRangeAsList(startKey, endKey);
        });
    }
    richQueryAllCars(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stubHelper.getQueryResultAsList({
                selector: {
                    docType: 'car'
                }
            });
        });
    }
    getCarHistory(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield stubHelper.getHistoryForKeyAsList('CAR0');
        });
    }
    changeCarOwner(stubHelper, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifiedArgs = yield fabric_chaincode_utils_1.Helpers.checkArgs(args[0], Yup.object()
                .shape({
                key: Yup.string().required(),
                owner: Yup.string().required(),
            }));
            let car = yield stubHelper.getStateAsObject(verifiedArgs.key);
            car.owner = verifiedArgs.owner;
            yield stubHelper.putState(verifiedArgs.key, car);
        });
    }
}
exports.MyChaincode = MyChaincode;
//# sourceMappingURL=MyChaincode.js.map