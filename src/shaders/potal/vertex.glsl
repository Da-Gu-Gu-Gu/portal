varying vec2 vUv;

void main(){
    vec4 modalPosition=modelMatrix*vec4(position,1.0);
    vec4 viewPosition=viewMatrix*modalPosition;
    vec4 projectionPosition=projectionMatrix*viewPosition;

    gl_Position=projectionPosition;


    vUv=uv;


}