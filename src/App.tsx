import { OrbitControls, PerspectiveCamera} from '@react-three/drei';
import { Canvas,  Vector3 } from '@react-three/fiber';
import React, { useMemo, useState } from 'react';
import { data } from './data';
import "./App.css"

export interface Input {
  vectors: [number,number,number][];
}

export function parse(file: string): Input {
  const lines = file.split("\n");

  const cubes: [number,number,number][] = lines
    .map(line => line.split(",").map(n => parseInt(n)) as [number,number,number] )

  const xs = cubes.map(([x]) => x);
  const ys = cubes.map(([,y]) => y);
  const zs = cubes.map(([,,z]) => z);
  const minX = Math.min(...xs) - 1;
  const maxX = Math.max(...xs) + 1;
  const minY = Math.min(...ys) - 1;
  const maxY = Math.max(...ys) + 1;
  const minZ = Math.min(...zs) - 1;
  const maxZ = Math.max(...zs) + 1;
  
  const vectors = cubes.map(([x,y,z]) => [x - (maxX - minX)/2,y - (maxY - minY)/3,z - (maxZ - minZ)/2] as [number,number,number]);

  return { vectors };
}

// const input = parse(data);

function App() {
  const [data, setData] = useState('');
  const parsed = useMemo(() => parse(data), [data])

  return (
    <div className='App'>
      <details>
        <summary>[Expand/Collapse] Data</summary>
        <textarea rows={20} value={data} onChange={e => setData(e.target.value)}/>
      </details>
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[30, 15, -30]}
          fov={60}
          zoom={0.9} key={undefined} onPointerMissed={undefined} view={undefined} quaternion={undefined} attach={undefined} args={undefined} onUpdate={undefined} up={undefined} scale={undefined} rotation={undefined} matrix={undefined} layers={undefined} dispose={undefined} onClick={undefined} onContextMenu={undefined} onDoubleClick={undefined} onPointerUp={undefined} onPointerDown={undefined} onPointerOver={undefined} onPointerOut={undefined} onPointerEnter={undefined} onPointerLeave={undefined} onPointerMove={undefined} onPointerCancel={undefined} onWheel={undefined} visible={undefined} type={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} matrixWorldInverse={undefined} projectionMatrix={undefined} projectionMatrixInverse={undefined} isCamera={undefined} near={undefined} far={undefined} isPerspectiveCamera={undefined} aspect={undefined} focus={undefined} filmGauge={undefined} filmOffset={undefined} setFocalLength={undefined} getFocalLength={undefined} getEffectiveFOV={undefined} getFilmWidth={undefined} getFilmHeight={undefined} setViewOffset={undefined} clearViewOffset={undefined} updateProjectionMatrix={undefined} setLens={undefined}      />
        <OrbitControls  />
        <ambientLight intensity={0.5} />
        <spotLight position={[100,50,100]} angle={0.3} />
        {parsed.vectors.map(c => <Box pos={c} />)}
      </Canvas>
    </div>
  );
}

function Box({pos}:{pos: Vector3}) {
  return <mesh position={pos}>
    <boxBufferGeometry attach="geometry" />
    <meshLambertMaterial attach="material" color="firebrick" />
  </mesh>
}

export default App;
