import { maxNutsTransported } from '../../computeMaxNuts';

describe('maxNutsTransported', () => {
    test('should return 0 if fuel consumption per trip (F) is greater than or equal to capacity (C)', () => {
        expect(maxNutsTransported(10, 100, 5, 5)).toBe(0);
        expect(maxNutsTransported(10, 100, 6, 5)).toBe(0);
    });

    test('should return 0 if total fuel needed exceeds nuts available', () => {
        expect(maxNutsTransported(10, 50, 2, 5)).toBe(0);
    });

    test('should return 0 if no trips can be made due to fuel consumption', () => {
        expect(maxNutsTransported(10, 10, 2, 5)).toBe(0);
    });

    test('should return transported nuts correctly for edge cases', () => {
        expect(maxNutsTransported(1, 50, 1, 10)).toBe(41);
        expect(maxNutsTransported(2, 20, 2, 10)).toBe(8);
    });


    test('should calculate correct transported nuts for given valid inputs', () => {
        expect(maxNutsTransported(5, 100, 1, 10)).toBe(5);
        expect(maxNutsTransported(2, 200, 1, 20)).toBe(162);
    });


    test('should return 0 when there are no nuts to transport', () => {
        expect(maxNutsTransported(5, 0, 1, 10)).toBe(0);
    });

    test('should return correct transported nuts when fuel consumption is minimal', () => {
        expect(maxNutsTransported(1, 100, 1, 10)).toBe(81);
    });

    test('should handle the case where only one trip is possible', () => {
        expect(maxNutsTransported(2, 20, 1, 10)).toBeGreaterThan(0);
    });
});
