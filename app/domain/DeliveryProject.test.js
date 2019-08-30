
jest.mock('./FileStorage', () => ({
    storeFile: jest.fn()
}));


describe('Delivery project', () => {
     let token = "1123";
    it('returns the correct data', () => {
        jest.mock('./Repository', () => ({
            tokenExist: (token, callback) => { callback(null, true) },
            findStandentAndProjectNameByToken: (token, callback) => { callback(null, { studantName: "Leo", className: "t04", projectName: "Token" }) },
            markTokenAsDelivered: jest.fn(),
        }));

        let DeliveryProject = require('./DeliveryProject');

        DeliveryProject.deliveryProject(token, null, function (row) {
            expect(row).toStrictEqual({ tokenExist: true, studantName: "Leo", projectName: "Token" });
        });
    });
    it('call the mark token as delivered', () => {
        let Repository = require('./Repository');
        expect(Repository.markTokenAsDelivered).toBeCalledWith(token);
    });

    it('return false when not foud token', () => {
        jest.resetModules()
        jest.mock('./Repository', () => ({
            tokenExist: (token, callback) => { callback(null, false) }
        }));
        
        let DeliveryProject = require('./DeliveryProject');

        DeliveryProject.deliveryProject(token, token, function (row) {
            expect(row).toStrictEqual({ tokenExist: false });
        });
    });
});
