# import required libraries
from vidgear.gears import CamGear,VideoGear
from vidgear.gears import StreamGear
import cv2
import time
from importlib import import_module
import os
from flask import Flask, render_template, Response
from threading import Thread
import time
import numpy as np
from new_arch import RRN
import torch


class RRN_SR(object):
    def __init__(self,H,W, src=0):
        n_c = 128
        n_b = 10
        scale = 4
        self.rrn = RRN(4, n_c, n_b)  # initial filter generate network
        self.rrn = torch.nn.DataParallel(self.rrn)
        self.rrn.load_state_dict(torch.load("X4_10L_64_epoch_50.pth"))
        self.rrn.eval()
        self.prediction = torch.zeros((1, scale * scale * 3, H, W)).cuda()
        self.h = torch.zeros((1, n_c, H, W)).cuda()
        self.init = True

    def sr_rrn(self, image, image_prev):
        start = time.time()
        image = torch.Tensor(image / 255.).unsqueeze(0).cuda()
        image_prev = torch.Tensor(image_prev / 255.).unsqueeze(0).cuda()
        in_vid = torch.cat((image, image_prev), dim=0).permute(3, 0, 1, 2).unsqueeze(0)
        #print(in_vid.shape, self.h.shape, self.prediction.shape)
        with torch.no_grad():
            self.h, self.prediction = self.rrn(in_vid, self.h, self.prediction, self.init)
        self.init = False
        out = self.prediction.squeeze(0).permute(1, 2, 0).cpu().numpy()
        out= (np.clip(out,a_min=0,a_max=1) * 255).astype(np.uint8)
        return out
