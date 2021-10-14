#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup() {
    ofSetLogLevel(OF_LOG_VERBOSE);
    ofSetWindowTitle("FractureD");
    ofBackground(ofColor::black);
    ofSetWindowShape(1200, 720);


    img.load("I-Break-Horses.jpg");
    img.resize(img.getWidth(), img.getHeight());
    shader.load("shader");
    glitch.load("blockss");


    ofFboSettings s;
    s.width = ofGetWidth();
    s.height = ofGetHeight();
    s.internalformat = GL_RGBA;
    fbo.allocate(s);
    change = false;

    ofFboSettings b;
    b.width = ofGetWidth();
    b.height = ofGetHeight();
    b.internalformat = GL_RGBA;
    b.useStencil = true;
    fbo2.allocate(b);

}

//--------------------------------------------------------------
void ofApp::update() {
    fbo.begin();
    ofClear(0);
    fbo.end();

    fbo2.begin();
    ofClear(0);
    fbo2.end();
}

//--------------------------------------------------------------
void ofApp::draw() {

    fbo.begin();
    img.draw(0, 0);
    fbo.end();

    glitch.begin();
    glitch.setUniform1f("u_time", ofGetElapsedTimef());
    glitch.setUniform2f("u_resolution", img.getWidth(), img.getHeight());
    glitch.setUniformTexture("u_tex0", fbo.getTexture(), 1);
    fbo2.begin();
    fbo.draw(0, 0);
    fbo2.end();
    glitch.end();



    fbo2.draw(0, 0);


}

//--------------------------------------------------------------
void ofApp::keyPressed(int key) {
    if (key == ' ') {
        change = !change;
    }
    if (key == 'f')
    {
        ofToggleFullscreen();
    }

}
//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo info) {
    if (info.files.size() > 0)
    {
        dragPt = info.position;
        images.assign(info.files.size(), ofImage());
        ofLog() << images.size();

    }

}
//--------------------------------------------------------------
void ofApp::windowResized(int w, int h) {
    fbo.allocate(w, h);
}
