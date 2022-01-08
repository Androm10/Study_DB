const walletService = require("../services/walletService");

test('get operation history', () => {

    walletService.getOperations(1).then(data => {
        expect(data).not.toBeNull();
    });

});

test('get wrong operation history', () => {
    
    walletService.getOperations(9995).catch( e => {
        expect(e.status).toBe(400);
    });

});

test('add and sub money to wallet', () => {

    walletService.addMoney(1,1).then( sum => {
        expect(walletService.outputMoney(1,1)).resolves.toBe(sum-1);
    });

});

