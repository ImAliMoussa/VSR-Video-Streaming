import time
import cv2
import numpy as np
import onnxruntime

# TODO close session after resolving

scale = 4
ort_session = onnxruntime.InferenceSession("./super_resolution.onnx")


def convert_rgb_to_ycbcr(img, dim_order="hwc"):
    if dim_order == "hwc":
        y = (
            16.0
            + (64.738 * img[..., 0] + 129.057 * img[..., 1] + 25.064 * img[..., 2])
            / 256.0
        )
        cb = (
            128.0
            + (-37.945 * img[..., 0] - 74.494 * img[..., 1] + 112.439 * img[..., 2])
            / 256.0
        )
        cr = (
            128.0
            + (112.439 * img[..., 0] - 94.154 * img[..., 1] - 18.285 * img[..., 2])
            / 256.0
        )
    else:
        y = 16.0 + (64.738 * img[0] + 129.057 * img[1] + 25.064 * img[2]) / 256.0
        cb = 128.0 + (-37.945 * img[0] - 74.494 * img[1] + 112.439 * img[2]) / 256.0
        cr = 128.0 + (112.439 * img[0] - 94.154 * img[1] - 18.285 * img[2]) / 256.0
    return np.array([y, cb, cr]).transpose([1, 2, 0])


def convert_ycbcr_to_rgb(img, dim_order="hwc"):
    if dim_order == "hwc":
        r = 298.082 * img[..., 0] / 256.0 + 408.583 * img[..., 2] / 256.0 - 222.921
        g = (
            298.082 * img[..., 0] / 256.0
            - 100.291 * img[..., 1] / 256.0
            - 208.120 * img[..., 2] / 256.0
            + 135.576
        )
        b = 298.082 * img[..., 0] / 256.0 + 516.412 * img[..., 1] / 256.0 - 276.836
    else:
        r = 298.082 * img[0] / 256.0 + 408.583 * img[2] / 256.0 - 222.921
        g = (
            298.082 * img[0] / 256.0
            - 100.291 * img[1] / 256.0
            - 208.120 * img[2] / 256.0
            + 135.576
        )
        b = 298.082 * img[0] / 256.0 + 516.412 * img[1] / 256.0 - 276.836
    return np.array([r, g, b]).transpose([1, 2, 0])


def preprocess(img):
    img = np.array(img).astype(np.float32)
    ycbcr = convert_rgb_to_ycbcr(img)
    x = ycbcr[..., 0]
    x /= 255.0
    x = np.expand_dims(np.expand_dims(x, axis=0), axis=0)
    return x, ycbcr


def super_resolve(image):
    start_time = time.time()
    w, h, c = image.shape
    bicubic = cv2.resize(image, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
    lr, _ = preprocess(image)
    _, ycbcr = preprocess(bicubic)
    ort_inputs = {ort_session.get_inputs()[0].name: lr}
    ort_outs = ort_session.run(None, ort_inputs)

    preds = ort_outs[0].clip(0.0, 1.0)

    preds = (preds * 255.0).squeeze(0).squeeze(0)
    output = np.array([preds, ycbcr[..., 1], ycbcr[..., 2]]).transpose([1, 2, 0])
    output = np.clip(convert_ycbcr_to_rgb(output), 0.0, 255.0).astype(np.uint8)
    # output = cv2.resize(output, None, fx=0.5, fy=0.5)
    end_time = time.time()
    # print(end_time - start_time)
    return output


