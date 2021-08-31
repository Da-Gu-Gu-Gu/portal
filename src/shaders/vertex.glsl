uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;
attribute float aScale;


void main(){
    vec4 modalPosition=modelMatrix*vec4(position,1.0);
    modalPosition.y+=sin(uTime+modalPosition.x*100.0)*aScale*0.2;
    vec4 viewPosition=viewMatrix*modalPosition;
    vec4 projectPosition=projectionMatrix*viewPosition;
    gl_Position=projectPosition;

    gl_PointSize=uSize*uPixelRatio*aScale;
    gl_PointSize*=(1.0/-viewPosition.z);

}