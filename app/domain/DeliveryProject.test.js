jest.mock('./Repository', () => ({
    saveDeliveryProject: jest.fn()
}));
const mockRepository = require('./Repository');

jest.mock('./FileStorage', () => ({
    storeFile: jest.fn()
}));
const mockStoreFile = require('./FileStorage');

describe('Delivery project', () => {
     let token = "1123";
     
    it('store file with right parameters', () => {

        let DeliveryProject = require('./DeliveryProject');
    
        DeliveryProject.deliveryProject("Class-001", "Project-001", "My Delivery Name", null);

        expect(mockStoreFile.storeFile).toHaveBeenCalledWith("my_delivery_name", "Class-001", "Project-001", null, expect.any(Function));
    });
    it('saves delivery project with right parameters', () => {

        let DeliveryProject = require('./DeliveryProject');
    
        DeliveryProject.deliveryProject("Class-001", "Project-001", "My Delivery Name", null);

        expect(mockRepository.saveDeliveryProject).toHaveBeenCalledWith("My Delivery Name", "my_delivery_name", "Project-001");
    });
});
 