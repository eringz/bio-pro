import app from './src/app.js';
// import * as tf from '@tensorflow/tfjs-node';

// console.log("Backend in use:", tf.getBackend());
// console.log("TensorFlow version:", tf.version.tf);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})