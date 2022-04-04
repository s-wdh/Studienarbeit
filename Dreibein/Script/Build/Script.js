"use strict";
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Project.registerScriptNamespace(Script); // Register the namespace to FUDGE for serialization
    class CustomComponentScript extends ƒ.ComponentScript {
        // Register the script as component for use in the editor via drag&drop
        static iSubclass = ƒ.Component.registerSubclass(CustomComponentScript);
        // Properties may be mutated by users in the editor via the automatically created user interface
        message = "CustomComponentScript added to ";
        constructor() {
            super();
            // Don't start when running in editor
            if (ƒ.Project.mode == ƒ.MODE.EDITOR)
                return;
            // Listen to this component being added to or removed from a node
            this.addEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
            this.addEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
            this.addEventListener("nodeDeserialized" /* NODE_DESERIALIZED */, this.hndEvent);
        }
        // Activate the functions of this component as response to events
        hndEvent = (_event) => {
            switch (_event.type) {
                case "componentAdd" /* COMPONENT_ADD */:
                    ƒ.Debug.log(this.message, this.node);
                    break;
                case "componentRemove" /* COMPONENT_REMOVE */:
                    this.removeEventListener("componentAdd" /* COMPONENT_ADD */, this.hndEvent);
                    this.removeEventListener("componentRemove" /* COMPONENT_REMOVE */, this.hndEvent);
                    break;
                case "nodeDeserialized" /* NODE_DESERIALIZED */:
                    // if deserialized the node is now fully reconstructed and access to all its components and children is possible
                    break;
            }
        };
    }
    Script.CustomComponentScript = CustomComponentScript;
})(Script || (Script = {}));
var Script;
(function (Script) {
    var ƒ = FudgeCore;
    ƒ.Debug.info("Main Program Template running!");
    //let dialog: HTMLDialogElement;
    let viewport;
    document.addEventListener("interactiveViewportStarted", start);
    //window.addEventListener("load", init);
    /* function init(_event: Event): void {
      dialog = document.querySelector("dialog");
      dialog.querySelector("h1").textContent = document.title;
      dialog.addEventListener("click", function (_event) {
        // @ts-ignore until HTMLDialog is implemented by all browsers and available in dom.d.ts
        dialog.close();
        startInteractiveViewport();
      });
      //@ts-ignore
      dialog.showModal();
    }
    // setup and start interactive viewport
    async function startInteractiveViewport(): Promise<void> {
      // load resources referenced in the link-tag
      await ƒ.Project.loadResourcesFromHTML();
      ƒ.Debug.log("Project:", FudgeCore.Project.resources);
      // pick the graph to show
      let graph: ƒ.Graph = FudgeCore.Project.resources["Graph|2022-04-04T09:13:48.708Z|79720"] as ƒ.Graph;
      ƒ.Debug.log("Graph:", graph);
      if (!graph) {
        alert("Nothing to render. Create a graph with at least a mesh, material and probably some light");
        return;
      }
      // setup the viewport
      let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
      let canvas: HTMLCanvasElement = document.querySelector("canvas");
      let viewport: ƒ.Viewport = new ƒ.Viewport();
      viewport.initialize("InteractiveViewport", graph, cmpCamera, canvas);
      ƒ.Debug.log("Viewport:", viewport);
  
      // hide the cursor when interacting, also suppressing right-click menu
      //canvas.addEventListener("mousedown", canvas.requestPointerLock);
      //canvas.addEventListener("mouseup", function () { document.exitPointerLock(); });
  
      // make the camera interactive (complex method in FudgeAid)
      //FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);
  
      // setup audio
      //let cmpListener = new ƒ.ComponentAudioListener();
      //cmpCamera.node.addComponent(cmpListener);
      //ƒ.AudioManager.default.listenWith(cmpListener);
      ƒ.AudioManager.default.listenTo(graph);
      //ƒ.Debug.log("Audio:", ƒ.AudioManager.default);
  
      // draw viewport once for immediate feedback
      viewport.draw();
      canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
    } */
    function start(_event) {
        viewport = _event.detail;
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        // ƒ.Loop.start();  // start the game loop to continously draw the viewport, update the audiosystem and drive the physics i/a
    }
    function update(_event) {
        // ƒ.Physics.simulate();  // if physics is included and used
        viewport.draw();
        ƒ.AudioManager.default.update();
    }
})(Script || (Script = {}));
//# sourceMappingURL=Script.js.map