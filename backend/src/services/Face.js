import * as faceapi from "face-api.js";
import { Canvas, Image, ImageData, loadImage} from "canvas";
import path from "path";

// Patch for face-api
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const MODEL_URL = path.join(process.cwd(), "src/models/weights");

// Load once (not every request)
await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
]);

class FaceService {
    static async detectFace(base64Image) {
        const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        const img = await loadImage(buffer);
        const detections = await faceapi.detectAllFaces(img);

        if (!detections.length) {
            return { detected: false, confidence: 0 };
        }
        return { detected: true, confidence: detections[0].score }
    }
}

export default FaceService;