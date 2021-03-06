#pragma once

#include "ofMain.h"
#include "ofxAutoReloadedShader.h"

class ofApp : public ofBaseApp {

public:
	void setup();
	void update();
	void draw();
	void keyPressed(int key);
	void windowResized(int w, int h);
	ofxAutoReloadedShader shader, glitch, blockss;
	ofFbo fbo fbo2;
	ofImage img;
	vector<glm::vec3> y_noise;
	bool change;
};
