const images = [
  "https://i.pinimg.com/736x/bc/b1/a8/bcb1a8cff9d47044bf5b8d1b1138b871.jpg",
  "https://i.pinimg.com/736x/6e/27/d5/6e27d5dd81c9ab49cfd38ba99907a21c.jpg",
  "https://i.pinimg.com/736x/f3/f3/c6/f3f3c69f13ed551ecb808505c22d02d9.jpg",
  "https://i.pinimg.com/736x/cf/65/b3/cf65b3936ffc7e7afa03d52d20c2e4e1.jpg",
  "https://i.pinimg.com/736x/bb/67/61/bb6761412c554909ecbcda2dbd4e26d7.jpg",
  "https://i.pinimg.com/736x/89/d4/be/89d4befeb85d2c6fbb55d26b87090620.jpg",
  "https://i.pinimg.com/736x/77/18/1f/77181fbe9f2a2ec03aeeeec76fdfbb0f.jpg",
  "https://i.pinimg.com/736x/b2/d9/e7/b2d9e74cfd6f82e3f7f8e0d5b81d456b.jpg",
  "https://i.pinimg.com/736x/3d/cc/2a/3dcc2ac999be0bdcc7aeb7c538af25c4.jpg",
];

export const generateRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * images.length);

  return images[randomIndex];
};
