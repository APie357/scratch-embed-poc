<script>
    import { onMount } from "svelte";

    /** @type {HTMLIFrameElement} */
    let frame;
    /** @type {any} */
    let vm;
    let status = $state("loading");

    function waitForVM() {
      return new Promise(resolve => {
        const check = () => {
          // @ts-ignore
          const v = frame?.contentWindow?.vm;
          if (v && v.editingTarget) resolve(v);
          else setTimeout(check, 100);
        };

        check();
      });
    }

    async function load() {
      const res = await frame.contentWindow?.fetch("/api/project");
      if (res?.ok) await vm.loadProject(await res.arrayBuffer());
    }

    async function save() {
      const blob = await vm.saveProjectSb3();
      await fetch("/api/project", { method: "PUT", body: blob });
      status = "saved " + new Date().toLocaleDateString();
    }

    onMount(async () => {
      vm = await waitForVM();
      // todo load
      try {
      await load();
      } catch (e) {
        console.error(e);
      }
      status = "ready";

      /** @type {number | undefined} */
      let timer;
      vm.on("PROJECT_CHANGED", () => {
        status = "unsaved changes";
        clearTimeout(timer);
        // todo save
        timer = setTimeout(save, 1000);
      })
    });
</script>

<div style:background="#c33" style:padding="8px" style:display="flex" style:justify-content="space-between">
    <span>amognus</span>
    <span>{status}</span>
</div>
<iframe bind:this={frame} src="/tw/editor.html" title="Editor" allowtransparency={true} allowfullscreen></iframe>

<style>
    iframe {
        width: 100%;
        height: 90vh;
        border: none;
    }
</style>
