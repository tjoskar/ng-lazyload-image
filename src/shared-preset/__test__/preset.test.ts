import { sharedPreset } from '../preset';

describe('Setup', () => {
  it('Should set default image if defined', () => {
    // Arrange
    const element = {
      nodeName: {
        toLowerCase: () => 'img'
      },
      src: ''
    };
    const defaultImagePath = 'https://some-path/image.jpg';
    const useSrcset = false;
    const attribute = {
      element,
      defaultImagePath,
      useSrcset
    };

    // Act
    sharedPreset.setup(attribute as any);

    // Assert
    expect(element.src).toBe(defaultImagePath);
  });

  it('Should not set default image if not defined', () => {
    // Arrange
    const element = {
      nodeName: {
        toLowerCase: () => 'img'
      },
      src: ''
    };
    const defaultImagePath = undefined;
    const useSrcset = false;
    const attribute = {
      element,
      defaultImagePath,
      useSrcset
    };

    // Act
    sharedPreset.setup(attribute as any);

    // Assert
    expect(element.src).toBe('');
  });

  it('Should use srcset instead of src if useSrcset is true', () => {
    // Arrange
    const element = {
      nodeName: {
        toLowerCase: () => 'img'
      },
      src: '',
      srcset: ''
    };
    const defaultImagePath = 'https://some-path/image.jpg';
    const useSrcset = true;
    const attribute = {
      element,
      defaultImagePath,
      useSrcset
    };

    // Act
    sharedPreset.setup(attribute as any);

    // Assert
    expect(element.src).toBe('');
    expect(element.srcset).toBe(defaultImagePath);
  });

  it('Should set default image for img and all picture source elements', () => {
    // Arrange
    const imagePath1 = 'https://some-path/image1.jpg';
    const imagePath2 = 'https://some-path/image2.jpg';
    const imagePath3 = 'https://some-path/image3.jpg';
    const picture = document.createElement('picture');
    const source1 = document.createElement('source');
    const source2 = document.createElement('source');
    const img = document.createElement('img');
    source1.setAttribute('defaultImage', imagePath2);
    source2.setAttribute('defaultImage', imagePath3);
    picture.appendChild(source1);
    picture.appendChild(source2);
    picture.appendChild(img);

    const attribute = {
      element: img,
      defaultImagePath: imagePath1,
      useSrcset: false
    };

    // Act
    sharedPreset.setup(attribute as any);

    // Assert
    expect(img.src).toBe(imagePath1);
    expect(source1.srcset).toBe(imagePath2);
    expect(source2.srcset).toBe(imagePath3);
  });
});
