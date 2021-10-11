#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup() {
    ofSetLogLevel(OF_LOG_VERBOSE);
    ofSetWindowTitle("anamnesis");
    ofBackground(ofColor::black);
    ofSetWindowShape(1200, 720);
    ofSetFrameRate(24);

    img.load("minuzo.jpg");
    img.resize(img.getWidth(), img.getHeight());
    shader.load("shader");
    glitch.load("blockss");
    // blockss.load("blockss");

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
    if (change) {

        glitch.begin();
        glitch.setUniform1f("u_time", ofGetElapsedTimef());
        glitch.setUniform2f("u_resolution", img.getWidth(), img.getHeight());
        glitch.setUniformTexture("u_tex0", fbo.getTexture(), 1);
        fbo.draw(0, 0);
        glitch.end();


    }
    else {

        shader.begin();
        shader.setUniform1f("u_time", ofGetElapsedTimef());
        shader.setUniform2f("u_resolution", img.getWidth(), img.getHeight());
        shader.setUniformTexture("u_tex0", fbo.getTexture(), 1);
        fbo.draw(0, 0);
        shader.end();

    }

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
void ofApp::windowResized(int w, int h) {
    fbo.allocate(w, h);
}
