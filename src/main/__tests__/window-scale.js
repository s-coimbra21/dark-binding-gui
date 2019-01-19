import {
  SIZES,
  MIN_FACTOR,
  MAX_FACTOR,
  clampScaleFactor,
  getInitialWindowDimensions,
  getSize,
} from '../window-scale';

jest.mock('electron', function electronMock() {
  this.width = 1920;

  const screen = {
    getPrimaryDisplay: () => ({
      workAreaSize: {
        width: this.width,
      },
    }),
  };

  return {
    screen,
    setWidth: _width => {
      this.width = _width;
    },
  };
});

const testSizes = [{ width: 1920 }, { width: 800, height: 600 }].concat(SIZES);

describe('util: windowScale', () => {
  it(`clamps scale factors below ${MIN_FACTOR}`, () => {
    const below = clampScaleFactor(0.1);

    expect(below).toBe(MIN_FACTOR);
  });

  it(`clamps scale factors above ${MAX_FACTOR}`, () => {
    const above = clampScaleFactor(2);

    expect(above).toBe(MAX_FACTOR);
  });

  it(`doesn't clamp values between ${MIN_FACTOR} and ${MAX_FACTOR}`, () => {
    const within = clampScaleFactor(1);

    expect(within).toBeLessThanOrEqual(MAX_FACTOR);
    expect(within).toBeGreaterThanOrEqual(MIN_FACTOR);
  });

  testSizes.forEach(size => {
    it(`ensures the initial window size fits the screen's dimensions (screen width: ${
      size.width
    })`, () => {
      require('electron').setWidth(size.width); // eslint-disable-line global-require
      const result = getInitialWindowDimensions();
      expect(result.dimensions.width).toBeLessThanOrEqual(size.width);
      expect(result.scale).toBeLessThanOrEqual(MAX_FACTOR);
      expect(result.scale).toBeGreaterThanOrEqual(MIN_FACTOR);
    });
  });

  it('infers a window size based on a scale factor', () => {
    const dimensions1 = getSize(1);
    const dimensions125 = getSize(1.25);
    const dimensions08 = getSize(0.8);

    expect(dimensions08).toEqual({ width: 1024, height: 576 });
    expect(dimensions1).toEqual({ width: 1280, height: 720 });
    expect(dimensions125).toEqual({ width: 1600, height: 900 });
  });
});
