
jest.mock('./FileStorage', () => ({
    storeFile: jest.fn()
}));
const mockStoreFile = require('./FileStorage');

describe('Delivery project', () => {
     let token = "1123";
     
    it('returns the correct data', () => {

        let DeliveryProject = require('./DeliveryProject');
    
        DeliveryProject.deliveryProject("Class-001", "Project-001", "My Delivery Name", null);

        expect(mockStoreFile.storeFile).toHaveBeenCalledWith("My Delivery Name", "Class-001", "Project-001", null);
    });
});
 