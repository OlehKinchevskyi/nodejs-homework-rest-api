const subscription = require('../helper/subscription');
const { HttpCode, UserSubscription } = require('../helper/constants');
const { User } = require('../model/__mocks__/data');

describe('Unit test: helper/subscription', () => {
    const req = { user: User }
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn((response) => response),
    }
    const next = jest.fn()

    test('run function with starter subscription', () => {
        subscription(UserSubscription.STARTER)(req, res, next)
        expect(next).toHaveBeenCalled()
     });
    test('run function with pro subscription', () => {
        const result = subscription(UserSubscription.PRO)(req, res, next)
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.FORBIDDEN)
        expect(result.message).toEqual('Access is denied')
    });
    test('run function with business subscription', () => {
        const result = subscription(UserSubscription.BUSINESS)(req, res, next)
        expect(result.status).toEqual('error')
        expect(result.code).toEqual(HttpCode.FORBIDDEN)
        expect(result.message).toEqual('Access is denied')
    });
});