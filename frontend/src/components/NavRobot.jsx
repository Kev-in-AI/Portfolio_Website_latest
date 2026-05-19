import { useEffect, useRef } from 'react'

const MODEL_PATH = '/assets/robot/source/robot.gltf'
const IDLE_CLIP_NAMES = ['iddle', 'idle', 'walking']
const NAV_REACTION_CLIP_NAMES = ['attackspin', 'walking']
const TARGET_REACTION_SECONDS = 1.65
const REACTION_SETTLE_MS = 260

const interactionSelector = [
  '#robot-nav-container',
  'button',
  'a[href]',
  '[role="button"]',
  '.nav-link',
  '.hero-read-more',
  '.project-link',
  '.project-selector-item',
  '.award-entry',
  '.featured-award-card',
  '.award-group-toggle',
  '.activity-card',
  '.skills-category-trigger',
  '.passport-stamp',
  '.contact-link-card',
  '.currency-btn'
].join(', ')

const NavRobot = ({
  className = '',
  listenForClicks = true,
  actionNames = NAV_REACTION_CLIP_NAMES,
  playOnLoad = false,
  loopActions = false,
  sequentialActions = true
}) => {
  const containerRef = useRef(null)

  useEffect(() => {
    let animationFrame = 0
    let renderer
    let scene
    let camera
    let mixer
    let model
    let idleAction
    let currentAction
    let loopOnce
    let reactionActions = []
    let finishTimer = 0
    let resizeObserver
    let disposed = false
    let isReacting = false
    let queuedReactionCount = 0
    let loopActionIndex = 0

    const clockState = { clock: null }

    const resizeRenderer = () => {
      if (!containerRef.current || !renderer || !camera) return

      const { clientWidth, clientHeight } = containerRef.current
      if (!clientWidth || !clientHeight) return

      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    const disposeModel = (root) => {
      root.traverse((object) => {
        if (object.geometry) object.geometry.dispose()

        if (object.material) {
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach((material) => {
            Object.values(material).forEach((value) => {
              if (value && typeof value.dispose === 'function') value.dispose()
            })
            material.dispose()
          })
        }
      })
    }

    const playIdle = () => {
      if (!idleAction || disposed) return

      idleAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .play()
    }

    const finishReaction = (finishedAction) => {
      if (disposed || finishedAction !== currentAction) return

      if (finishTimer) {
        window.clearTimeout(finishTimer)
        finishTimer = 0
      }

      finishedAction.stop()
      currentAction = null
      isReacting = false
      playIdle()

      if (loopActions) {
        window.setTimeout(() => playReaction(), REACTION_SETTLE_MS)
      } else if (queuedReactionCount > 0) {
        queuedReactionCount -= 1
        window.setTimeout(() => playReaction(), 140)
      }
    }

    const playReaction = () => {
      if (!mixer || disposed) return

      if (isReacting) {
        queuedReactionCount = Math.min(queuedReactionCount + 1, 2)
        return
      }

      if (!reactionActions.length) return

      isReacting = true
      const nextAction = sequentialActions
        ? reactionActions[loopActionIndex++ % reactionActions.length]
        : reactionActions[Math.floor(Math.random() * reactionActions.length)]

      if (finishTimer) window.clearTimeout(finishTimer)
      mixer.stopAllAction()
      currentAction = nextAction

      const playbackSpeed = Math.max(nextAction.getClip().duration / TARGET_REACTION_SECONDS, 0.25)

      nextAction
        .reset()
        .setLoop(loopOnce, 1)
        .setEffectiveTimeScale(playbackSpeed)
        .setEffectiveWeight(1)
        .play()
      nextAction.clampWhenFinished = true

      const handleFinished = (event) => {
        if (event.action !== nextAction) return

        mixer.removeEventListener('finished', handleFinished)
        window.setTimeout(() => finishReaction(nextAction), REACTION_SETTLE_MS)
      }

      mixer.addEventListener('finished', handleFinished)

      finishTimer = window.setTimeout(() => {
        mixer.removeEventListener('finished', handleFinished)
        finishReaction(nextAction)
      }, TARGET_REACTION_SECONDS * 1000 + REACTION_SETTLE_MS + 350)
    }

    const handleClick = (event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest(interactionSelector)) return

      playReaction()
    }

    const initRobot = async () => {
      const THREE = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')

      if (disposed || !containerRef.current) return

      loopOnce = THREE.LoopOnce

      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(listenForClicks ? 28 : 30, 1, 0.1, 100)
      camera.position.set(0, listenForClicks ? 0.22 : 0.3, listenForClicks ? 3.25 : 3.9)
      camera.lookAt(0, 0, 0)

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      containerRef.current.appendChild(renderer.domElement)

      const ambientLight = new THREE.AmbientLight(0xffffff, 2.8)
      const keyLight = new THREE.DirectionalLight(0xffffff, 4)
      const fillLight = new THREE.DirectionalLight(0xfff1dc, 1.8)
      const rimLight = new THREE.DirectionalLight(0x9fb7ff, 2.2)
      keyLight.position.set(2.5, 3, 4)
      fillLight.position.set(-2.5, 1, 3)
      rimLight.position.set(-2, 1.8, -2)
      scene.add(ambientLight, keyLight, fillLight, rimLight)

      clockState.clock = new THREE.Clock()

      const gltf = await new GLTFLoader().loadAsync(MODEL_PATH)
      if (disposed) {
        disposeModel(gltf.scene)
        return
      }

      model = gltf.scene
      const bounds = new THREE.Box3().setFromObject(model)
      const center = bounds.getCenter(new THREE.Vector3())
      const size = bounds.getSize(new THREE.Vector3())
      const maxDimension = Math.max(size.x, size.y, size.z) || 1
      const modelScale = (listenForClicks ? 3 : 2.75) / maxDimension

      model.scale.setScalar(modelScale)
      model.position.set(
        -center.x * modelScale,
        -center.y * modelScale - (listenForClicks ? 0.1 : 0.36),
        -center.z * modelScale
      )
      model.rotation.set(0, listenForClicks ? Math.PI - 0.25 : Math.PI - 0.08, 0)
      model.traverse((object) => {
        if (!object.material) return

        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => {
          material.needsUpdate = true
          if ('metalness' in material) material.metalness = Math.min(material.metalness, 0.45)
          if ('roughness' in material) material.roughness = Math.max(material.roughness, 0.35)
          if ('emissiveIntensity' in material) material.emissiveIntensity = Math.max(material.emissiveIntensity || 0, 0.35)
        })
      })
      scene.add(model)

      const clipsByName = gltf.animations.reduce((clips, clip) => {
        clips[clip.name.toLowerCase()] = clip
        return clips
      }, {})

      model.animationsByName = clipsByName
      mixer = new THREE.AnimationMixer(model)

      const idleClip = IDLE_CLIP_NAMES.map((clipName) => clipsByName[clipName]).find(Boolean)
      if (idleClip) {
        idleAction = mixer.clipAction(idleClip)
        idleAction.enabled = true
        playIdle()
      }

      reactionActions = actionNames
        .map((clipName) => clipsByName[clipName])
        .filter(Boolean)
        .map((clip) => mixer.clipAction(clip))

      if (playOnLoad || loopActions) {
        window.setTimeout(() => playReaction(), 350)
      }

      resizeRenderer()
      resizeObserver = new ResizeObserver(resizeRenderer)
      resizeObserver.observe(containerRef.current)

      const animate = () => {
        if (disposed) return

        const delta = clockState.clock.getDelta()
        if (mixer) mixer.update(delta)
        if (model && !isReacting) {
          const baseRotation = listenForClicks ? Math.PI - 0.25 : Math.PI - 0.08
          model.rotation.y = baseRotation + Math.sin(clockState.clock.elapsedTime * 1.4) * 0.08
        }

        renderer.render(scene, camera)
        animationFrame = window.requestAnimationFrame(animate)
      }

      animate()
    }

    if (listenForClicks) document.addEventListener('click', handleClick, true)
    initRobot().catch((error) => {
      console.error('Unable to load navbar robot:', error)
    })

    return () => {
      disposed = true
      if (listenForClicks) document.removeEventListener('click', handleClick, true)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      if (finishTimer) window.clearTimeout(finishTimer)
      if (resizeObserver) resizeObserver.disconnect()
      if (mixer) mixer.stopAllAction()
      if (model) disposeModel(model)
      if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss()
        renderer.domElement.remove()
      }
    }
  }, [actionNames, listenForClicks, loopActions, playOnLoad, sequentialActions])

  return (
    <div
      id={listenForClicks ? 'robot-nav-container' : undefined}
      className={className}
      ref={containerRef}
      aria-label="Animated navbar robot"
      title="Kevin's tiny robot buddy"
    />
  )
}

export default NavRobot
