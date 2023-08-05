export function generateAttributtesCartItem(attributes) {
  const customSize = attributes?.customSize
    ? `${attributes.customSize.title};`
    : null;
  const calculatorSizes =
    !attributes?.customSize && attributes.width && attributes.height
      ? `${attributes.width} x ${attributes.height} ${attributes?.unit};`
      : null;

  return `${attributes?.productOption.title}; ${customSize ? customSize : ""} ${
    calculatorSizes ? calculatorSizes : ""
  }`;
}
